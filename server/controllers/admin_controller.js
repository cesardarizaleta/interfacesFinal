const container = require('../container');

class AdminController {
  constructor() {
    this.usersService = container.getService('users');
    this.colorsService = container.getService('colors');
    this.fontsService = container.getService('fonts');
  }

  async getDashboard(req, res, next) {
    try {
      const stats = await this.usersService.getUserStats();
      const recentUsers = await this.usersService.find(); // En un sistema real, limitar a los más recientes

      res.json({
        stats,
        recentUsers: recentUsers.slice(0, 10) // Últimos 10 usuarios
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const users = await this.usersService.find();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }

  async getAllColors(req, res, next) {
    try {
      const colors = await this.colorsService.find();
      res.json(colors);
    } catch (error) {
      next(error);
    }
  }

  async getAllFonts(req, res, next) {
    try {
      const fonts = await this.fontsService.find();
      res.json(fonts);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { AdminController };
