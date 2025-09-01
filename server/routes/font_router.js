const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Asegúrate de importar fs para la función delete

const FontsService = require('../services/font_service');
const validatorHandler = require('../middlewares/validator_handler');
const { updateFontSchema, createFontSchema, getFontSchema } = require('../schemas/font_schema');
const passport = require('passport');

const router = express.Router();
const service = new FontsService();

// --- Configuración de Multer ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/fonts/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage: storage,
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
  limits: { fileSize: 10 * 1024 * 1024 } // Increased to 10MB
});
// --- Fin de Configuración de Multer ---

router.get('/', async (req, res, next) => {
  try {
    const fonts = await service.find();
    res.json(fonts);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getFontSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const font = await service.findOne(id);
      res.json(font);
    } catch (error) {
      next(error);
    }
  }
);

// --- Modificación de la ruta POST para manejar subida de fuente mejorada ---
router.post(
  '/',
  upload.single('fontFile'),
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createFontSchema, 'body'),
  async (req, res, next) => {
    try {
      const bodyWithUserId = {
        ...req.body,
        userId: req.user.sub
      };

      // Handle file upload
      if (req.file) {
        bodyWithUserId.fontFilePath = path.join('uploads/fonts/', req.file.filename);

        // Determine font format from file extension
        const extension = path.extname(req.file.originalname).toLowerCase();
        switch (extension) {
          case '.ttf':
            bodyWithUserId.fontFormat = 'ttf';
            break;
          case '.otf':
            bodyWithUserId.fontFormat = 'otf';
            break;
          case '.woff':
            bodyWithUserId.fontFormat = 'woff';
            break;
          case '.woff2':
            bodyWithUserId.fontFormat = 'woff2';
            break;
          default:
            bodyWithUserId.fontFormat = 'ttf'; // fallback
        }
      } else {
        throw new Error('Es necesario subir un archivo de fuente.');
      }

      const newFont = await service.create(bodyWithUserId);
      res.status(201).json(newFont);
    } catch (error) {
      next(error);
    }
  }
);
// --- Fin de Modificación de la ruta POST ---

router.patch('/:id',
  validatorHandler(getFontSchema, 'params'),
  validatorHandler(updateFontSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const font = await service.update(id, body);
      res.json(font);
    } catch (error) {
      next(error);
    }
  }
);

// --- Nueva ruta para asignar tipo de fuente ---
router.patch('/:id/assign-type',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getFontSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { fontType } = req.body;
      const userId = req.user.sub;

      if (!fontType) {
        throw new Error('fontType es requerido');
      }

      const font = await service.assignFontType(id, fontType, userId);
      res.json(font);
    } catch (error) {
      next(error);
    }
  }
);

// --- Nueva ruta para obtener fuentes asignadas por usuario ---
router.get('/user/assigned',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const userId = req.user.sub;
      const assignedFonts = await service.getAssignedFonts(userId);
      res.json(assignedFonts);
    } catch (error) {
      next(error);
    }
  }
);

// --- Nueva ruta para obtener fuentes por tipo ---
router.get('/user/type/:fontType',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { fontType } = req.params;
      const userId = req.user.sub;
      const fonts = await service.findByType(userId, fontType);
      res.json(fonts);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getFontSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(200).json({id});
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
