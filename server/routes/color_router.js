const express = require('express');

const ColorsService = require('../services/color_service');
const validatorHandler = require('../middlewares/validator_handler');
const { updateColorSchema, createColorSchema, getColorSchema } = require('../schemas/color_schema');
const passport = require('passport');

const router = express.Router();
const service = new ColorsService();

router.get('/', async (req, res, next) => {
  try {
    const colors = await service.find();
    res.json(colors);
  } catch (error) {
    next(error);
  }
});

router.get('/user/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const colors = await service.findByUser(userId);
    res.json(colors);
  } catch (error) {
    next(error);
  }
});

router.get('/user/:userId/active', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const color = await service.findActiveByUserId(userId);
    if (!color) {
      res.status(404).json({ message: 'No active palette found' });
    } else {
      res.json(color);
    }
  } catch (error) {
    next(error);
  }
});

router.patch('/:id/activate',
  validatorHandler(getColorSchema, 'params'),
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const userId = req.user.sub;
      const color = await service.activatePalette(id, userId);
      res.json(color);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id/deactivate',
  validatorHandler(getColorSchema, 'params'),
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const userId = req.user.sub;
      const color = await service.deactivatePalette(id, userId);
      res.json(color);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createColorSchema, 'body'),
  async (req, res, next) => {
    try {
      const bodyWithUserId = {
        ...req.body, // Todos los campos del color (name, colorPrimary, etc.)
        userId: req.user.sub // Sobreescribe o añade el userId del token
      };
      const newColor = await service.create(bodyWithUserId); // Pasa todos los datos al servicio
      res.status(201).json(newColor);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getColorSchema, 'params'),
  validatorHandler(updateColorSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const color = await service.update(id, body);
      res.json(color);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getColorSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
