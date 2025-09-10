module.exports = {
  LoginRequest: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: {
        type: 'string',
        format: 'email',
        description: 'Correo electrónico del usuario',
        example: 'usuario@example.com'
      },
      password: {
        type: 'string',
        minLength: 6,
        description: 'Contraseña del usuario',
        example: 'password123'
      }
    }
  },
  AuthResponse: {
    type: 'object',
    properties: {
      user: {
        $ref: '#/components/schemas/User'
      },
      token: {
        type: 'string',
        description: 'Token JWT de autenticación',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
      }
    }
  },
  TokenRefreshRequest: {
    type: 'object',
    required: ['refreshToken'],
    properties: {
      refreshToken: {
        type: 'string',
        description: 'Token de refresco',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
      }
    }
  }
};