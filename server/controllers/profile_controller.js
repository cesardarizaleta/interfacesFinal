const container = require('../container');
const logger = require('../utils/logger');

class ProfileController {
  constructor() {
    this.colorsService = container.getService('colors');
    this.fontsService = container.getService('fonts');
    this.usersService = container.getService('users');
  }

  async getMyColors(req, res, next) {
    try {
      const user = req.user;
      const colors = await this.colorsService.findByUser(user.sub);
      logger.debug('User colors:', colors);
      res.json(colors);
    } catch (error) {
      next(error);
    }
  }

  async getMyFonts(req, res, next) {
    try {
      const user = req.user;
      const fonts = await this.fontsService.findByUser(user.sub);
      logger.debug('User fonts:', fonts);
      res.json(fonts);
    } catch (error) {
      next(error);
    }
  }

  async getLastColorUsed(req, res, next) {
    try {
      const user = req.user;
      const colors = await this.colorsService.findLastUsedByUserId(user.sub);
      const lastColor = colors[0] || null;
      res.json(lastColor);
    } catch (error) {
      next(error);
    }
  }

  async getLastFontUsed(req, res, next) {
    try {
      const user = req.user;
      const fonts = await this.fontsService.findLastUsedByUserId(user.sub);
      const lastFont = fonts[0] || null;
      res.json(lastFont);
    } catch (error) {
      next(error);
    }
  }

  async getMyProfile(req, res, next) {
    try {
      const user = req.user;
      const profile = await this.usersService.findOne(user.sub);
      res.json(profile);
    } catch (error) {
      next(error);
    }
  }

  async updateMyProfile(req, res, next) {
    try {
      const user = req.user;
      const profileData = req.body;
      const updatedProfile = await this.usersService.update(user.sub, profileData);
      res.json(updatedProfile);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { ProfileController };
