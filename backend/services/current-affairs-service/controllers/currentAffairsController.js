const CurrentAffair = require('../models/currentAffairModel');
const { AppError } = require('../../../shared/errorUtils');

// Get current affairs with optional filtering
exports.getCurrentAffairs = async (req, res, next) => {
  try {
    const { category, tags, featured, limit = 10, page = 1 } = req.query;

    const query = {};
    if (category) query.category = category;
    if (tags) query.tags = { $in: tags.split(',') };
    if (featured) query.is_featured = true;

    const options = {
      limit: parseInt(limit),
      skip: (page - 1) * limit,
      sort: { publish_date: -1 }
    };

    const currentAffairs = await CurrentAffair.find(query, null, options);
    const total = await CurrentAffair.countDocuments(query);

    res.status(200).json({
      currentAffairs,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    next(error);
  }
};

// Get a specific current affair by ID
exports.getCurrentAffairById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const currentAffair = await CurrentAffair.findById(id);
    if (!currentAffair) {
      return next(new AppError('Current affair not found', 404));
    }

    res.status(200).json(currentAffair);
  } catch (error) {
    next(error);
  }
};

// Get quiz for a specific current affair
exports.getQuizForCurrentAffair = async (req, res, next) => {
  try {
    const { id } = req.params;

    const currentAffair = await CurrentAffair.findById(id).populate('quiz_id');
    if (!currentAffair) {
      return res.status(404).json({ message: 'Current affair not found' });
    }

    res.status(200).json({ quiz: currentAffair.quiz_id });
  } catch (error) {
    next(error);
  }
};

// Create a new current affair
exports.createCurrentAffair = async (req, res, next) => {
  try {
    const { title, description, category, source_url, tags, is_featured } = req.body;

    const newCurrentAffair = new CurrentAffair({
      title,
      description,
      category,
      source_url,
      tags,
      is_featured
    });

    const savedCurrentAffair = await newCurrentAffair.save();

    res.status(201).json({
      message: 'Current affair created successfully',
      currentAffair: savedCurrentAffair
    });
  } catch (error) {
    next(error);
  }
};

// Update an existing current affair
exports.updateCurrentAffair = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedCurrentAffair = await CurrentAffair.findByIdAndUpdate(
      id, 
      updateData, 
      { new: true, runValidators: true }
    );

    if (!updatedCurrentAffair) {
      return next(new AppError('Current affair not found', 404));
    }

    res.status(200).json({
      message: 'Current affair updated successfully',
      currentAffair: updatedCurrentAffair
    });
  } catch (error) {
    next(error);
  }
};

// Delete a current affair
exports.deleteCurrentAffair = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedCurrentAffair = await CurrentAffair.findByIdAndDelete(id);

    if (!deletedCurrentAffair) {
      return next(new AppError('Current affair not found', 404));
    }

    res.status(200).json({
      message: 'Current affair deleted successfully',
      currentAffair: deletedCurrentAffair
    });
  } catch (error) {
    next(error);
  }
};