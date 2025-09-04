const express = require('express');
const { authenticateJwt } = require('../middlewares/auth_middleware');
const UsersService = require('../services/user_service');
const { checkRole } = require('../middlewares/role_middleware');

const router = express.Router();
const userService = new UsersService();

// Dashboard admin
router.get('/dashboard',
  authenticateJwt,
  checkRole(['admin']),
  async (req, res, next) => {
    try {
      const stats = await userService.getUserStats();
      const recentUsers = await userService.find(); // En un sistema real, limitar a los más recientes

      res.json({
        stats,
        recentUsers: recentUsers.slice(0, 10) // Últimos 10 usuarios
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
