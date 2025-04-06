const mongoose = require('mongoose');
const { Quiz } = require('../exam-management/models/quizModel');
const StudyMaterial = require('../content-management/models/studyMaterialModel');
const CurrentAffair = require('../content-management/models/currentAffairModel');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/upscmonk';

const seedDummyData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // Insert dummy quizzes
    const quizzes = [
      { title: 'General Knowledge Quiz', questions: [], duration: 10 },
      { title: 'Science Quiz', questions: [], duration: 15 },
    ];
    await Quiz.insertMany(quizzes);
    console.log('Dummy quizzes inserted');

    // Insert dummy study materials
    const studyMaterials = [
      { title: 'Introduction to Economics', description: 'Basic concepts of economics.', url: '#' },
      { title: 'World History Overview', description: 'Key events in world history.', url: '#' },
    ];
    await StudyMaterial.insertMany(studyMaterials);
    console.log('Dummy study materials inserted');

    // Insert dummy current affairs
    const currentAffairs = [
      { title: 'Global Warming Updates', date: new Date('2023-10-01'), summary: 'New findings on climate change.' },
      { title: 'Tech Innovations 2023', date: new Date('2023-10-02'), summary: 'Breakthroughs in AI and robotics.' },
    ];
    await CurrentAffair.insertMany(currentAffairs);
    console.log('Dummy current affairs inserted');

    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding dummy data:', error);
    mongoose.connection.close();
  }
};

const seedQuizData = async () => {
  const dummyQuestions = [
    {
      questionText: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      correctOption: 2,
      marks: 1
    },
    {
      questionText: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
      correctOption: 1,
      marks: 1
    },
    {
      questionText: "Who wrote 'Hamlet'?",
      options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
      correctOption: 1,
      marks: 1
    },
    {
      questionText: "What is the chemical symbol for water?",
      options: ["H2O", "O2", "CO2", "NaCl"],
      correctOption: 0,
      marks: 1
    },
    {
      questionText: "What is the largest mammal in the world?",
      options: ["Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
      correctOption: 1,
      marks: 1
    },
    {
      questionText: "What is the square root of 64?",
      options: ["6", "7", "8", "9"],
      correctOption: 2,
      marks: 1
    },
    {
      questionText: "Which gas do plants absorb from the atmosphere?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
      correctOption: 1,
      marks: 1
    },
  ];
};