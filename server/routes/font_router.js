const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { FontsController } = require('../controllers/fonts_controller');
const validatorHandler = require('../middlewares/validator_handler');
const { updateFontSchema, createFontSchema, getFontSchema } = require('../schemas/font_schema');
const passport = require('passport');

const router = express.Router();
const controller = new FontsController();

// --- Configuración de Multer para local ---
const localStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/fonts/';
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const localUpload = multer({
  storage: localStorage,
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'font/ttf',
      'font/otf',
      'font/woff',
      'font/woff2',
      'application/x-font-ttf',
      'application/x-font-otf',
      'application/font-woff',
      'application/font-woff2'
    ];
    const allowedExtensions = ['.ttf', '.otf', '.woff', '.woff2'];

    const isValidMime = allowedMimes.includes(file.mimetype);
    const isValidExtension = allowedExtensions.some(ext => file.originalname.toLowerCase().endsWith(ext));

    if (isValidMime || isValidExtension) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de archivo no válido. Solo se permiten archivos .ttf, .otf, .woff, .woff2'), false);
    }
  }
});

// --- Configuración de Multer para Google Drive (memory storage) ---
const driveUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'font/ttf',
      'font/otf',
      'font/woff',
      'font/woff2',
      'application/x-font-ttf',
      'application/x-font-otf',
      'application/font-woff',
      'application/font-woff2'
    ];
    const allowedExtensions = ['.ttf', '.otf', '.woff', '.woff2'];

    const isValidMime = allowedMimes.includes(file.mimetype);
    const isValidExtension = allowedExtensions.some(ext => file.originalname.toLowerCase().endsWith(ext));

    if (isValidMime || isValidExtension) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de archivo no válido. Solo se permiten archivos .ttf, .otf, .woff, .woff2'), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  }
});

router.get('/', controller.getFonts.bind(controller));

router.get('/:id', validatorHandler(getFontSchema, 'params'), controller.getFont.bind(controller));

router.get('/user/:userId', controller.getFontsByUser.bind(controller));

router.get('/user/:userId/last-used', controller.getLastUsedFonts.bind(controller));

router.post('/',
  localUpload.single('fontFile'),
  validatorHandler(createFontSchema, 'body'),
  passport.authenticate('jwt', { session: false }),
  controller.createFont.bind(controller)
);

router.patch('/:id',
  validatorHandler(getFontSchema, 'params'),
  validatorHandler(updateFontSchema, 'body'),
  passport.authenticate('jwt', { session: false }),
  controller.updateFont.bind(controller)
);

router.delete('/:id',
  validatorHandler(getFontSchema, 'params'),
  passport.authenticate('jwt', { session: false }),
  controller.deleteFont.bind(controller)
);

// New upload endpoint for Google Drive
router.post('/upload',
  driveUpload.single('fontFile'),
  passport.authenticate('jwt', { session: false }),
  controller.uploadFont.bind(controller)
);

module.exports = router;
