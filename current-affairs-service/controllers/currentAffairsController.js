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