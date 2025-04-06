const mongoose = require('mongoose');
const Quiz = require('../models/quizModel');

describe('Quiz Model', () => {
  it('should require title field', async () => {
    const quiz = new Quiz({questions: []});
    let error;
    try {
      await quiz.validate();
    } catch (err) {
      error = err;
    }
    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
  });
});