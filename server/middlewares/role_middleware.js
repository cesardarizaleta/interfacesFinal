const boom = require('@hapi/boom');

const checkRole = (roles) => {
  return (req, res, next) => {
    const user = req.user;

    if (!user) {
      throw boom.unauthorized('User not authenticated');
    }

    if (!roles.includes(user.role)) {
      throw boom.forbidden('Insufficient permissions');
    }

    next();
  };
};

const isAdmin = checkRole(['admin']);
const isUser = checkRole(['admin', 'user']);

module.exports = {
  checkRole,
  isAdmin,
  isUser
};
