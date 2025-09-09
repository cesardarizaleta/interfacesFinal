const express = require('express');
const passport = require('passport');
const validatorHandler = require('../middlewares/validator_handler');
const { loginUserSchema, recoveryAuthSchema, changePasswordAuthSchema } = require('../schemas/user_schema');

const AuthService = require('../services/auth_service');
const service = new AuthService();

const router = express.Router();

router.post('/login',
  validatorHandler(loginUserSchema, 'body'),
  passport.authenticate('local', {session:false}),
  async (req, res, next) => {
    try {
      const user = req.user;
      res.json(service.signToken(user));
    } catch (error) {
      next(error);
    }
  }
);


module.exports = router;
