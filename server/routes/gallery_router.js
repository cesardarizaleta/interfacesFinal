const express = require('express');
const { authenticateJwt } = require('../middlewares/auth_middleware');
const GalleryController = require('../controllers/gallery_controller');
const { checkRole } = require('../middlewares/role_middleware');

const router = express.Router();
const controller = new GalleryController();

// Public routes
router.get('/categories', controller.getCategories.bind(controller));

// Admin only routes
router.use(authenticateJwt);
router.use(checkRole(['admin']));

router.get('/', controller.getGalleryItems.bind(controller));
router.get('/:id', controller.getGalleryItem.bind(controller));
router.get('/category/:category', controller.getGalleryByCategory.bind(controller));

// File upload routes
router.post('/upload',
  controller.uploadMiddleware,
  controller.uploadGalleryItem.bind(controller)
);

// Dedicated image upload route
router.post('/images/upload',
  controller.uploadImageMiddleware,
  controller.uploadImage.bind(controller)
);

// Dedicated video upload route
router.post('/videos/upload',
  controller.uploadVideoMiddleware,
  controller.uploadVideo.bind(controller)
);

router.patch('/:id', controller.updateGalleryItem.bind(controller));
router.patch('/:id/toggle', controller.toggleGalleryItem.bind(controller));
router.delete('/:id', controller.deleteGalleryItem.bind(controller));

module.exports = router;
