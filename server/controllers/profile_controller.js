const { ColorsService } = require('../services/color_service');
const { FontsService } = require('../services/font_service');
const { UsersService } = require('../services/user_service');
const logger = require('../utils/logger');

class ProfileController {
  constructor() {
    this.colorsService = new ColorsService();
    this.fontsService = new FontsService();
    this.usersService = new UsersService();
  }

  async getMyColors(req, res, next) {
    try {
      const user = req.user;
      const colors = await this.colorsService.findByUser(user.id);
      logger.debug('User colors:', colors);
      res.json(colors);
    } catch (error) {
      next(error);
    }
  }

  async getMyFonts(req, res, next) {
    try {
      const user = req.user;
      const fonts = await this.fontsService.findByUser(user.id);
      logger.debug('User fonts:', fonts);
      res.json(fonts);
    } catch (error) {
      next(error);
    }
  }

  async getLastColorUsed(req, res, next) {
    try {
      const user = req.user;
      const colors = await this.colorsService.findLastUsedByUserId(user.id);
      const lastColor = colors[0] || null;
      res.json(lastColor);
    } catch (error) {
      next(error);
    }
  }

  async getLastFontUsed(req, res, next) {
    try {
      const user = req.user;
      const fonts = await this.fontsService.findLastUsedByUserId(user.id);
      const lastFont = fonts[0] || null;
      res.json(lastFont);
    } catch (error) {
      next(error);
    }
  }

  async getMyProfile(req, res, next) {
    try {
      const user = req.user;
      const profile = await this.usersService.findOne(user.id);
      res.json(profile);
    } catch (error) {
      next(error);
    }
  }

  async updateMyProfile(req, res, next) {
    try {
      const user = req.user;
      const profileData = req.body;
      const updatedProfile = await this.usersService.update(user.id, profileData);
      res.json(updatedProfile);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { ProfileController };
