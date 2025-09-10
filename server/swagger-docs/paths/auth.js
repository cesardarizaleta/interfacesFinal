module.exports = {
  '/api/auth/login': {
    post: {
      summary: 'Iniciar sesión de usuario',
      description: `
        Autentica a un usuario con email y contraseña, devolviendo un token JWT válido por 24 horas.

        **Nota:** El token debe incluirse en el header de las solicitudes posteriores:
        \`Authorization: Bearer {token}\`
      `,
      tags: ['Authentication'],
      security: [],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/LoginRequest'
            },
            example: {
              email: 'usuario@example.com',
              password: 'password123'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Inicio de sesión exitoso',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/AuthResponse'
              },
              example: {
                user: {
                  id: 1,
                  firstName: 'Juan',
                  lastName: 'Pérez',
                  email: 'usuario@example.com',
                  role: 'user',
                  age: 28,
                  isActive: true,
                  createdAt: '2024-01-15T10:30:00.000Z',
                  updatedAt: '2024-01-20T14:45:00.000Z'
                },
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
              }
            }
          }
        },
        401: {
          description: 'Credenciales inválidas',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/responses/UnauthorizedError'
              }
            }
          }
        },
        400: {
          description: 'Datos de entrada inválidos',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/responses/ValidationError'
              }
            }
          }
        },
        500: {
          description: 'Error interno del servidor',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/responses/ServerError'
              }
            }
          }
        }
      }
    }
  }
};