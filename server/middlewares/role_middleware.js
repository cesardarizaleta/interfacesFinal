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
const isModerator = checkRole(['admin', 'moderator']);
const isUser = checkRole(['admin', 'moderator', 'user']);

module.exports = {
  checkRole,
  isAdmin,
  isModerator,
  isUser
};
