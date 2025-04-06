const axios = require('axios');
const StudyMaterial = require('../models/studyMaterialModel');
const CurrentAffair = require('../models/currentAffairModel');
const Quiz = require('../../exam-management/models/quizModel');
const ContentModel = require('../models/studyMaterialModel'); // Generic content model
const redisClient = require('../../../shared/redisClient');

const formatError = (message, status = 500) => {
  return {
    error: {
      status,
      message
    }
  };
};

// Fetch study materials from external API
exports.getStudyMaterials = async (req, res, next) => {
    try {
        const response = await axios.get('https://api.example.com/study-materials');
        let materials = response.data;

        // Restrict access for Visitors
        if (req.user.role === 'visitor') {
            materials = materials.slice(0, 5); // Limit to 5 items for Visitors
        }

        res.status(200).json({
          success: true,
          materials: response.data.materials
        });
    } catch (error) {
        next(error);
    }
};

// Fetch current affairs from external API
exports.getCurrentAffairs = async (req, res, next) => {
    try {
        const isSignedIn = req.user; // Assuming authMiddleware adds 'user' to req if signed in
        const filter = isSignedIn ? {} : { publish_date: { $gte: new Date(new Date().setDate(new Date().getDate() - 30)) } };

        const currentAffairs = await CurrentAffair.find(filter);
        res.status(200).json({ success: true, data: currentAffairs });
    } catch (error) {
        next(error);
    }
};

// Fetch suggested topics
exports.getSuggestedTopics = async (req, res, next) => {
    try {
        // Fetch trending topics based on most accessed study materials
        const trendingMaterials = await StudyMaterial.find().sort({ accessCount: -1 }).limit(5);

        // Fetch topics based on user's recent activity (e.g., saved materials, completed quizzes)
        const userSavedMaterials = await StudyMaterial.find({ savedBy: req.user.id }).limit(5);
        const userCompletedQuizzes = await Quiz.find({ completedBy: req.user.id }).limit(5);

        const suggestedTopics = [
            ...new Set([
                ...trendingMaterials.map((material) => material.topic),
                ...userSavedMaterials.map((material) => material.topic),
                ...userCompletedQuizzes.map((quiz) => quiz.topic),
            ]),
        ];

        res.status(200).json(suggestedTopics);
    } catch (err) {
        next(err);
    }
};

// Fetch dummy data from the database
exports.getDummyData = async (req, res, next) => {
    try {
        const studyMaterials = await StudyMaterial.find();
        const quizzes = await Quiz.find();
        res.status(200).json({ studyMaterials, quizzes });
    } catch (error) {
        res.status(500).json(formatError('Failed to fetch study materials'));
    }
};

exports.getContentHierarchy = async (req, res, next) => {
  try {
    const hierarchy = await Subject.find().populate({
      path: 'topics',
      populate: { path: 'subtopics' },
    });

    res.status(200).json(hierarchy);
  } catch (error) {
    next(error);
  }
};

exports.bulkUploadContent = async (req, res, next) => {
  try {
    const { file } = req;
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Parse CSV and validate structure
    const rows = parseCSV(file.buffer);
    const validRows = rows.filter(row => row.subject && row.topic && row.subtopic && row.content);

    if (validRows.length === 0) {
      return res.status(400).json({ message: 'Invalid CSV structure' });
    }

    // Insert content in bulk
    await Content.insertMany(validRows);

    res.status(201).json({ message: 'Content uploaded successfully' });
  } catch (error) {
    next(error);
  }
};

exports.getCachedContent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cacheKey = `content:${id}`;

    const cachedContent = await redisClient.get(cacheKey);
    if (cachedContent) {
      return res.status(200).json(JSON.parse(cachedContent));
    }

    const content = await Content.findById(id);
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    await redisClient.set(cacheKey, JSON.stringify(content), 'EX', 3600); // Cache for 1 hour

    res.status(200).json(content);
  } catch (error) {
    next(error);
  }
};

// Create new content
exports.createContent = async (req, res, next) => {
  try {
    const { validationResult } = require('express-validator');
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { type, ...contentData } = req.body;
    let newContent;

    if (type === 'study_material') {
      newContent = new StudyMaterial(contentData);
    } else if (type === 'current_affair') {
      newContent = new CurrentAffair(contentData);
    } else {
      return res.status(400).json({
        errors: [{ msg: 'Invalid content type' }]
      });
    }

    const savedContent = await newContent.save();

    res.status(201).json({
      message: 'Content created successfully',
      content: savedContent
    });
  } catch (error) {
    next(error);
  }
};

// Get content by ID
exports.getContent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const content = await ContentModel.findById(id);

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    res.status(200).json(content);
  } catch (error) {
    next(error);
  }
};

// Update content
exports.updateContent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedContent = await ContentModel.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedContent) {
      return res.status(404).json({ message: 'Content not found' });
    }

    res.status(200).json({
      message: 'Content updated successfully',
      content: updatedContent
    });
  } catch (error) {
    next(error);
  }
};

// Delete content
exports.deleteContent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedContent = await ContentModel.findByIdAndDelete(id);

    if (!deletedContent) {
      return res.status(404).json({ message: 'Content not found' });
    }

    res.status(200).json({
      message: 'Content deleted successfully',
      content: deletedContent
    });
  } catch (error) {
    next(error);
  }
};

// Search content
exports.searchContent = async (req, res, next) => {
  try {
    const searchQuery = req.query;
    const searchResults = await ContentModel.find(searchQuery);

    res.status(200).json(searchResults);
  } catch (error) {
    next(error);
  }
};