const express = require('express');
const { authenticateJwt } = require('../middlewares/auth_middleware');
const { AdminController } = require('../controllers/admin_controller');
const { checkRole } = require('../middlewares/role_middleware');

const router = express.Router();
const controller = new AdminController();

// Dashboard admin
router.get('/dashboard',
  authenticateJwt,
  checkRole(['admin']),
  controller.getDashboard.bind(controller)
);

router.get('/users',
  authenticateJwt,
  checkRole(['admin']),
  controller.getAllUsers.bind(controller)
);

router.get('/users/export',
  authenticateJwt,
  checkRole(['admin']),
  controller.exportUsers.bind(controller)
);

router.get('/colors',
  authenticateJwt,
  checkRole(['admin']),
  controller.getAllColors.bind(controller)
);

router.get('/fonts',
  authenticateJwt,
  checkRole(['admin']),
  controller.getAllFonts.bind(controller)
);

module.exports = router;
