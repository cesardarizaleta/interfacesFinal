const express = require('express');
const passport = require('passport');
const { ProfileController } = require('../controllers/profile_controller');
const validatorHandler = require('../middlewares/validator_handler');
const { updateProfileSchema, getUserSchema } = require('../schemas/user_schema');

const router = express.Router();
const controller = new ProfileController();

router.get('/my-colors',
  passport.authenticate('jwt', { session: false }),
  controller.getMyColors.bind(controller)
);

router.get('/my-fonts',
  passport.authenticate('jwt', { session: false }),
  controller.getMyFonts.bind(controller)
);

router.get('/lastColorUsed',
  passport.authenticate('jwt', { session: false }),
  controller.getLastColorUsed.bind(controller)
);

router.get('/lastFontUsed',
  passport.authenticate('jwt', { session: false }),
  controller.getLastFontUsed.bind(controller)
);

router.get('/',
  passport.authenticate('jwt', { session: false }),
  controller.getMyProfile.bind(controller)
);

router.patch('/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(updateProfileSchema, 'body'),
  controller.updateMyProfile.bind(controller)
);

module.exports = router;
