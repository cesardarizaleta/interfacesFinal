const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {config} = require('../config/config');
const validatorHandler = require('../middlewares/validator_handler');
const { loginUserSchema } = require('../schemas/user_schema');

const router = express.Router();

router.post('/login',
  validatorHandler(loginUserSchema, 'body'),
  passport.authenticate('local', {session:false}),
  async (req, res, next) => {
    try {
      const user = req.user;
      const payload = {
        sub: user.id,
        role: user.role || 'user', // Incluir el rol del usuario en el payload
        email: user.email
      }
      const token = jwt.sign(payload, config.jwtSecret); 
      res.json({
        user,
        token
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
