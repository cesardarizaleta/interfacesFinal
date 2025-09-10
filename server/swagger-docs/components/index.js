module.exports = {
  securitySchemes: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: 'Token JWT de autenticación. Inclúyalo en el header: Authorization: Bearer {token}'
    },
  },
  responses: {
    UnauthorizedError: {
      description: 'Acceso no autorizado - Token inválido o expirado',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              statusCode: {
                type: 'integer',
                example: 401
              },
              message: {
                type: 'string',
                example: 'Unauthorized'
              },
              error: {
                type: 'string',
                example: 'Unauthorized'
              }
            }
          }
        }
      }
    },
    ForbiddenError: {
      description: 'Acceso prohibido - No tienes permisos suficientes',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              statusCode: {
                type: 'integer',
                example: 403
              },
              message: {
                type: 'string',
                example: 'Forbidden'
              },
              error: {
                type: 'string',
                example: 'Forbidden'
              }
            }
          }
        }
      }
    },
    NotFoundError: {
      description: 'Recurso no encontrado',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              statusCode: {
                type: 'integer',
                example: 404
              },
              message: {
                type: 'string',
                example: 'Resource not found'
              },
              error: {
                type: 'string',
                example: 'Not Found'
              }
            }
          }
        }
      }
    },
    ValidationError: {
      description: 'Error de validación de datos',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              statusCode: {
                type: 'integer',
                example: 400
              },
              message: {
                type: 'string',
                example: 'Validation error'
              },
              error: {
                type: 'string',
                example: 'Bad Request'
              },
              details: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    field: {
                      type: 'string',
                      example: 'email'
                    },
                    message: {
                      type: 'string',
                      example: 'Email is required'
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    ServerError: {
      description: 'Error interno del servidor',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              statusCode: {
                type: 'integer',
                example: 500
              },
              message: {
                type: 'string',
                example: 'Internal server error'
              },
              error: {
                type: 'string',
                example: 'Internal Server Error'
              }
            }
          }
        }
      }
    }
  },
  parameters: {
    userId: {
      name: 'userId',
      in: 'path',
      required: true,
      schema: {
        type: 'integer',
        minimum: 1
      },
      description: 'ID único del usuario',
      example: 1
    },
    colorId: {
      name: 'id',
      in: 'path',
      required: true,
      schema: {
        type: 'integer',
        minimum: 1
      },
      description: 'ID único del color',
      example: 1
    },
    fontId: {
      name: 'id',
      in: 'path',
      required: true,
      schema: {
        type: 'integer',
        minimum: 1
      },
      description: 'ID único de la fuente',
      example: 1
    },
    galleryId: {
      name: 'id',
      in: 'path',
      required: true,
      schema: {
        type: 'integer',
        minimum: 1
      },
      description: 'ID único del elemento de galería',
      example: 1
    },
    role: {
      name: 'role',
      in: 'path',
      required: true,
      schema: {
        type: 'string',
        enum: ['user', 'admin']
      },
      description: 'Rol del usuario',
      example: 'admin'
    },
    category: {
      name: 'category',
      in: 'path',
      required: true,
      schema: {
        type: 'string'
      },
      description: 'Categoría de la galería',
      example: 'wedding'
    }
  }
};