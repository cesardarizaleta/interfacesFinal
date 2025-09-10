module.exports = {
  '/api/admin/dashboard': {
    get: {
      summary: 'Obtener datos del dashboard',
      description: 'Retorna estadísticas generales del sistema para el panel de administración',
      tags: ['Admin'],
      security: [
        { bearerAuth: [] }
      ],
      responses: {
        200: {
          description: 'Datos del dashboard obtenidos exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  totalUsers: {
                    type: 'integer',
                    description: 'Total de usuarios registrados',
                    example: 150
                  },
                  totalColors: {
                    type: 'integer',
                    description: 'Total de colores en el sistema',
                    example: 245
                  },
                  totalFonts: {
                    type: 'integer',
                    description: 'Total de fuentes en el sistema',
                    example: 89
                  },
                  totalGalleryItems: {
                    type: 'integer',
                    description: 'Total de elementos en la galería',
                    example: 67
                  },
                  recentActivity: {
                    type: 'array',
                    description: 'Actividad reciente del sistema',
                    items: {
                      type: 'object',
                      properties: {
                        action: {
                          type: 'string',
                          example: 'user_created'
                        },
                        timestamp: {
                          type: 'string',
                          format: 'date-time',
                          example: '2024-01-15T10:30:00.000Z'
                        },
                        details: {
                          type: 'string',
                          example: 'Nuevo usuario registrado: juan@example.com'
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        401: {
          $ref: '#/components/responses/UnauthorizedError'
        },
        403: {
          $ref: '#/components/responses/ForbiddenError'
        }
      }
    }
  },
  '/api/admin/users': {
    get: {
      summary: 'Obtener todos los usuarios (Admin)',
      description: 'Retorna una lista completa de todos los usuarios para administración',
      tags: ['Admin', 'Users'],
      security: [
        { bearerAuth: [] }
      ],
      responses: {
        200: {
          description: 'Lista de usuarios obtenida exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/User'
                }
              }
            }
          }
        },
        401: {
          $ref: '#/components/responses/UnauthorizedError'
        },
        403: {
          $ref: '#/components/responses/ForbiddenError'
        }
      }
    }
  },
  '/api/admin/colors': {
    get: {
      summary: 'Obtener todos los colores (Admin)',
      description: 'Retorna una lista completa de todos los colores para administración',
      tags: ['Admin', 'Colors'],
      security: [
        { bearerAuth: [] }
      ],
      responses: {
        200: {
          description: 'Lista de colores obtenida exitosamente',
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
        },
        403: {
          $ref: '#/components/responses/ForbiddenError'
        }
      }
    }
  },
  '/api/admin/fonts': {
    get: {
      summary: 'Obtener todas las fuentes (Admin)',
      description: 'Retorna una lista completa de todas las fuentes para administración',
      tags: ['Admin', 'Fonts'],
      security: [
        { bearerAuth: [] }
      ],
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
        },
        401: {
          $ref: '#/components/responses/UnauthorizedError'
        },
        403: {
          $ref: '#/components/responses/ForbiddenError'
        }
      }
    }
  }
};