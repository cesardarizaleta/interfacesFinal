const express = require('express');
const { authenticateJwt } = require('../middlewares/auth_middleware');
const { UsersController } = require('../controllers/users_controller');
const validatorHandler = require('../middlewares/validator_handler');
const { checkRole } = require('../middlewares/role_middleware');
const { updateUserSchema, createUserSchema, getUserSchema, updateProfileSchema } = require('../schemas/user_schema');

const router = express.Router();
const controller = new UsersController();

// Temporary endpoint to check admin users (remove in production)
router.get('/check-admins', controller.checkAdmins.bind(controller));

router.get('/', controller.getUsers.bind(controller));

router.get('/:id', validatorHandler(getUserSchema, 'params'), controller.getUser.bind(controller));

// Admin routes
router.get('/admin/stats',
  authenticateJwt,
  checkRole(['admin']),
  controller.getUserStats.bind(controller)
);

router.get('/admin/export',
  authenticateJwt,
  checkRole(['admin']),
  controller.exportUsers.bind(controller)
);

router.post('/',
  authenticateJwt,
  checkRole(['admin']),
  validatorHandler(createUserSchema, 'body'),
  controller.createUser.bind(controller)
);

router.patch('/:id',
  authenticateJwt,
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  controller.updateUser.bind(controller)
);

router.patch('/:id/role',
  authenticateJwt,
  checkRole(['admin']),
  validatorHandler(getUserSchema, 'params'),
  controller.updateUserRole.bind(controller)
);

router.delete('/:id',
  authenticateJwt,
  checkRole(['admin']),
  validatorHandler(getUserSchema, 'params'),
  controller.deleteUser.bind(controller)
);

router.get('/role/:role',
  authenticateJwt,
  checkRole(['admin']),
  controller.getUsersByRole.bind(controller)
);

module.exports = router;
