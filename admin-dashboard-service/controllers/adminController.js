exports.listUsers = async (req, res, next) => {
  try {
    const { role, subscription_status } = req.query;

    const filters = {};
    if (role) filters.role = role;
    if (subscription_status) filters.subscription_status = subscription_status;

    const users = await User.find(filters);

    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

exports.logAdminAction = async (req, res, next) => {
  try {
    const { action, details } = req.body;
    const adminId = req.user.id;

    await AdminAuditLog.create({
      adminId,
      action,
      details,
      timestamp: new Date(),
    });

    res.status(201).json({ message: 'Admin action logged successfully' });
  } catch (error) {
    next(error);
  }
};