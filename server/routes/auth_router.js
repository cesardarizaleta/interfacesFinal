const express = require('express');
const passport = require('passport');
const validatorHandler = require('../middlewares/validator_handler');
const { loginUserSchema, recoveryAuthSchema, changePasswordAuthSchema } = require('../schemas/user_schema');

const AuthService = require('../services/auth_service');
const service = new AuthService();

const router = express.Router();
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     description: Autentica a un usuario con email y contraseña, devolviendo un token JWT
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *           example:
 *             email: "usuario@example.com"
 *             password: "password123"
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *             example:
 *               user:
 *                 id: 1
 *                 firstName: "Juan"
 *                 lastName: "Pérez"
 *                 email: "usuario@example.com"
 *                 role: "user"
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Credenciales inválidas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               statusCode: 401
 *               message: "Invalid credentials"
 *               error: "Unauthorized"
 *       400:
 *         description: Datos de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */


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
