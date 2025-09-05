const container = require('../container');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/temp'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  // Accept images and videos
  if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image and video files are allowed'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  }
});

class GalleryController {
  constructor() {
    this.service = container.getService('gallery');
    this.userService = container.getService('users');
  }

  async getGalleryItems(req, res, next) {
    try {
      const filters = {
        category: req.query.category,
        type: req.query.type,
        isActive: req.query.isActive ? req.query.isActive === 'true' : undefined
      };

      // Get all admin users
      const allUsers = await this.userService.find();
      const adminUsers = allUsers.filter(user => user.role === 'admin');
      const adminIds = adminUsers.map(admin => admin.id);

      // Get all gallery items
      const allItems = await this.service.findAll(filters);

      // Filter items uploaded by admins
      const items = allItems.filter(item => adminIds.includes(item.uploadedBy));

      res.json(items);
    } catch (error) {
      next(error);
    }
  }

  async getGalleryItem(req, res, next) {
    try {
      const { id } = req.params;
      const item = await this.service.findById(id);
      res.json(item);
    } catch (error) {
      next(error);
    }
  }

  async getGalleryByCategory(req, res, next) {
    try {
      const { category } = req.params;
      const items = await this.service.findByCategory(category);
      res.json(items);
    } catch (error) {
      next(error);
    }
  }

  async uploadGalleryItem(req, res, next) {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      const itemData = {
        ...req.body,
        uploadedBy: req.user.id,
        type: req.file.mimetype.startsWith('image/') ? 'image' : 'video'
      };

      const newItem = await this.service.create(itemData, req.file);
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  }

  async updateGalleryItem(req, res, next) {
    try {
      const { id } = req.params;
      const itemData = req.body;
      const updatedItem = await this.service.update(id, itemData);
      res.json(updatedItem);
    } catch (error) {
      next(error);
    }
  }

  async deleteGalleryItem(req, res, next) {
    try {
      const { id } = req.params;
      await this.service.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async toggleGalleryItem(req, res, next) {
    try {
      const { id } = req.params;
      const updatedItem = await this.service.toggleActive(id);
      res.json(updatedItem);
    } catch (error) {
      next(error);
    }
  }

  async getCategories(req, res, next) {
    try {
      const categories = await this.service.getCategories();
      res.json(categories);
    } catch (error) {
      next(error);
    }
  }

  // Middleware for file upload
  get uploadMiddleware() {
    return upload.single('file');
  }
}

module.exports = GalleryController;
