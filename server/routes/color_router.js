const express = require('express');
const { ColorsController } = require('../controllers/colors_controller');
const validatorHandler = require('../middlewares/validator_handler');
const { updateColorSchema, createColorSchema, getColorSchema } = require('../schemas/color_schema');
const passport = require('passport');

const router = express.Router();
const controller = new ColorsController();

router.get('/', controller.getColors.bind(controller));

router.get('/:id', validatorHandler(getColorSchema, 'params'), controller.getColor.bind(controller));

router.get('/user/:userId', controller.getColorsByUser.bind(controller));

router.get('/user/:userId/active', controller.getActiveColors.bind(controller));

router.get('/user/:userId/last-used', controller.getLastUsedColors.bind(controller));

router.post('/',
  validatorHandler(createColorSchema, 'body'),
  passport.authenticate('jwt', { session: false }),
  controller.createColor.bind(controller)
);

router.patch('/:id',
  validatorHandler(getColorSchema, 'params'),
  validatorHandler(updateColorSchema, 'body'),
  passport.authenticate('jwt', { session: false }),
  controller.updateColor.bind(controller)
);

router.patch('/:id/toggle-active',
  validatorHandler(getColorSchema, 'params'),
  passport.authenticate('jwt', { session: false }),
  controller.toggleColorActive.bind(controller)
);

router.patch('/:id/set-default',
  validatorHandler(getColorSchema, 'params'),
  passport.authenticate('jwt', { session: false }),
  controller.setColorAsDefault.bind(controller)
);

router.patch('/:id/activate',
  validatorHandler(getColorSchema, 'params'),
  passport.authenticate('jwt', { session: false }),
  controller.activatePalette.bind(controller)
);

router.patch('/:id/deactivate',
  validatorHandler(getColorSchema, 'params'),
  passport.authenticate('jwt', { session: false }),
  controller.deactivatePalette.bind(controller)
);

router.delete('/:id',
  validatorHandler(getColorSchema, 'params'),
  passport.authenticate('jwt', { session: false }),
  controller.deleteColor.bind(controller)
);

module.exports = router;
