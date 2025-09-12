const { FontsService } = require('../services/font_service');

class FontsController {
  constructor() {
    this.service = new FontsService();
  }

  async getFonts(req, res, next) {
    try {
      const fonts = await this.service.find();
      res.json(fonts);
    } catch (error) {
      next(error);
    }
  }

  async getFont(req, res, next) {
    try {
      const { id } = req.params;
      const font = await this.service.findOne(id);
      res.json(font);
    } catch (error) {
      next(error);
    }
  }

  async getFontsByUser(req, res, next) {
    try {
      const { userId } = req.params;
      const fonts = await this.service.findByUser(userId);
      res.json(fonts);
    } catch (error) {
      next(error);
    }
  }

  async createFont(req, res, next) {
    try {
      const userId = req.user.id;
      const fontData = req.body;
      const file = req.file;

      if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      const uploadedFont = await this.service.uploadFontToDrive(userId, file, fontData);
      res.status(201).json(uploadedFont);
    } catch (error) {
      next(error);
    }
  }

  async updateFont(req, res, next) {
    try {
      const { id } = req.params;
      const fontData = req.body;
      const updatedFont = await this.service.update(id, fontData);
      res.json(updatedFont);
    } catch (error) {
      next(error);
    }
  }

  async deleteFont(req, res, next) {
    try {
      const { id } = req.params;
      await this.service.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async getLastUsedFonts(req, res, next) {
    try {
      const { userId } = req.params;
      const fonts = await this.service.findLastUsedByUserId(userId);
      res.json(fonts);
    } catch (error) {
      next(error);
    }
  }

  async uploadFont(req, res, next) {
    try {
      const userId = req.user.id; // From JWT middleware
      const fontData = req.body;
      const file = req.file;

      if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      const uploadedFont = await this.service.uploadFontToDrive(userId, file, fontData);
      res.status(201).json({
        message: 'Font uploaded successfully',
        font: uploadedFont
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { FontsController };
