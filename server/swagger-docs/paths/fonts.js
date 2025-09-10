module.exports = {
  '/api/fonts': {
    get: {
      summary: 'Obtener todas las fuentes',
      description: 'Retorna una lista de todas las fuentes disponibles en el sistema',
      tags: ['Fonts'],
      security: [],
      responses: {
        200: {
          description: 'Lista de fuentes obtenida exitosamente',
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
        }
      }
    },
    post: {
      summary: 'Subir nueva fuente a Google Drive',
      description: 'Sube y registra una nueva fuente tipográfica al sistema, guardándola en Google Drive',
      tags: ['Fonts'],
      security: [
        { bearerAuth: [] }
      ],
      requestBody: {
        required: true,
        content: {
          'multipart/form-data': {
            schema: {
              $ref: '#/components/schemas/CreateFontRequest'
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Fuente subida exitosamente',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Font'
              }
            }
          }
        },
        400: {
          description: 'Archivo inválido o datos incorrectos',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/responses/ValidationError'
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
  '/api/fonts/{id}': {
    get: {
      summary: 'Obtener fuente por ID',
      description: 'Retorna la información completa de una fuente específica',
      tags: ['Fonts'],
      security: [],
      parameters: [
        {
          $ref: '#/components/parameters/fontId'
        }
      ],
      responses: {
        200: {
          description: 'Fuente encontrada',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Font'
              }
            }
          }
        },
        404: {
          $ref: '#/components/responses/NotFoundError'
        }
      }
    },
    patch: {
      summary: 'Actualizar fuente',
      description: 'Actualiza la información de una fuente específica',
      tags: ['Fonts'],
      security: [
        { bearerAuth: [] }
      ],
      parameters: [
        {
          $ref: '#/components/parameters/fontId'
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/UpdateFontRequest'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Fuente actualizada exitosamente',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Font'
              }
            }
          }
        },
        400: {
          $ref: '#/components/responses/ValidationError'
        },
        404: {
          $ref: '#/components/responses/NotFoundError'
        },
        401: {
          $ref: '#/components/responses/UnauthorizedError'
        }
      }
    },
    delete: {
      summary: 'Eliminar fuente',
      description: 'Elimina una fuente del sistema y su archivo correspondiente',
      tags: ['Fonts'],
      security: [
        { bearerAuth: [] }
      ],
      parameters: [
        {
          $ref: '#/components/parameters/fontId'
        }
      ],
      responses: {
        204: {
          description: 'Fuente eliminada exitosamente'
        },
        404: {
          $ref: '#/components/responses/NotFoundError'
        },
        401: {
          $ref: '#/components/responses/UnauthorizedError'
        }
      }
    }
  },
  '/api/fonts/user/{userId}': {
    get: {
      summary: 'Obtener fuentes por usuario',
      description: 'Retorna todas las fuentes asociadas a un usuario específico',
      tags: ['Fonts'],
      security: [],
      parameters: [
        {
          $ref: '#/components/parameters/userId'
        }
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
        }
      }
    }
  },
  '/api/fonts/user/{userId}/last-used': {
    get: {
      summary: 'Obtener última fuente usada por usuario',
      description: 'Retorna la última fuente utilizada por un usuario específico',
      tags: ['Fonts'],
      security: [],
      parameters: [
        {
          $ref: '#/components/parameters/userId'
        }
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
        }
      }
    }
  }
};