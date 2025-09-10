module.exports = {
  '/api/profile/my-colors': {
    get: {
      summary: 'Obtener mis colores',
      description: 'Retorna todos los colores asociados al usuario autenticado',
      tags: ['Profile'],
      security: [
        { bearerAuth: [] }
      ],
      responses: {
        200: {
          description: 'Colores del usuario obtenidos exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Color'
                }
              }
            }
          }
        },
        401: {
          $ref: '#/components/responses/UnauthorizedError'
        }
      }
    }
  },
  '/api/profile/my-fonts': {
    get: {
      summary: 'Obtener mis fuentes',
      description: 'Retorna todas las fuentes asociadas al usuario autenticado',
      tags: ['Profile'],
      security: [
        { bearerAuth: [] }
      ],
      responses: {
        200: {
          description: 'Fuentes del usuario obtenidas exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Font'
                }
              }
            }
          }
        },
        401: {
          $ref: '#/components/responses/UnauthorizedError'
        }
      }
    }
  },
  '/api/profile/lastColorUsed': {
    get: {
      summary: 'Obtener último color usado',
      description: 'Retorna el último color utilizado por el usuario autenticado',
      tags: ['Profile'],
      security: [
        { bearerAuth: [] }
      ],
      responses: {
        200: {
          description: 'Último color usado obtenido exitosamente',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Color'
              }
            }
          }
        },
        401: {
          $ref: '#/components/responses/UnauthorizedError'
        }
      }
    }
  },
  '/api/profile/lastFontUsed': {
    get: {
      summary: 'Obtener última fuente usada',
      description: 'Retorna la última fuente utilizada por el usuario autenticado',
      tags: ['Profile'],
      security: [
        { bearerAuth: [] }
      ],
      responses: {
        200: {
          description: 'Última fuente usada obtenida exitosamente',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Font'
              }
            }
          }
        },
        401: {
          $ref: '#/components/responses/UnauthorizedError'
        }
      }
    }
  },
  '/api/profile': {
    get: {
      summary: 'Obtener mi perfil',
      description: 'Retorna la información completa del perfil del usuario autenticado',
      tags: ['Profile'],
      security: [
        { bearerAuth: [] }
      ],
      responses: {
        200: {
          description: 'Perfil obtenido exitosamente',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User'
              }
            }
          }
        },
        401: {
          $ref: '#/components/responses/UnauthorizedError'
        }
      }
    },
    patch: {
      summary: 'Actualizar mi perfil',
      description: 'Actualiza la información del perfil del usuario autenticado',
      tags: ['Profile'],
      security: [
        { bearerAuth: [] }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/UpdateUserRequest'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Perfil actualizado exitosamente',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User'
              }
            }
          }
        },
        400: {
          $ref: '#/components/responses/ValidationError'
        },
        401: {
          $ref: '#/components/responses/UnauthorizedError'
        }
      }
    }
  }
};