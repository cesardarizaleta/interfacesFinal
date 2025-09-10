module.exports = {
  '/api/colors': {
    get: {
      summary: 'Obtener todos los colores',
      description: 'Retorna una lista de todos los colores disponibles en el sistema',
      tags: ['Colors'],
      security: [],
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
        }
      }
    },
    post: {
      summary: 'Crear nuevo color',
      description: 'Crea un nuevo color en la paleta del usuario autenticado',
      tags: ['Colors'],
      security: [
        { bearerAuth: [] }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/CreateColorRequest'
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Color creado exitosamente',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Color'
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
  },
  '/api/colors/{id}': {
    get: {
      summary: 'Obtener color por ID',
      description: 'Retorna la información completa de un color específico',
      tags: ['Colors'],
      security: [],
      parameters: [
        {
          $ref: '#/components/parameters/colorId'
        }
      ],
      responses: {
        200: {
          description: 'Color encontrado',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Color'
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
      summary: 'Actualizar color',
      description: 'Actualiza la información de un color específico',
      tags: ['Colors'],
      security: [
        { bearerAuth: [] }
      ],
      parameters: [
        {
          $ref: '#/components/parameters/colorId'
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/UpdateColorRequest'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Color actualizado exitosamente',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Color'
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
      summary: 'Eliminar color',
      description: 'Elimina un color del sistema',
      tags: ['Colors'],
      security: [
        { bearerAuth: [] }
      ],
      parameters: [
        {
          $ref: '#/components/parameters/colorId'
        }
      ],
      responses: {
        204: {
          description: 'Color eliminado exitosamente'
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
  '/api/colors/user/{userId}': {
    get: {
      summary: 'Obtener colores por usuario',
      description: 'Retorna todos los colores asociados a un usuario específico',
      tags: ['Colors'],
      security: [],
      parameters: [
        {
          $ref: '#/components/parameters/userId'
        }
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
        }
      }
    }
  },
  '/api/colors/user/{userId}/active': {
    get: {
      summary: 'Obtener colores activos por usuario',
      description: 'Retorna los colores activos de un usuario específico',
      tags: ['Colors'],
      security: [],
      parameters: [
        {
          $ref: '#/components/parameters/userId'
        }
      ],
      responses: {
        200: {
          description: 'Colores activos obtenidos exitosamente',
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
        }
      }
    }
  },
  '/api/colors/user/{userId}/last-used': {
    get: {
      summary: 'Obtener último color usado por usuario',
      description: 'Retorna el último color utilizado por un usuario específico',
      tags: ['Colors'],
      security: [],
      parameters: [
        {
          $ref: '#/components/parameters/userId'
        }
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
        }
      }
    }
  },
  '/api/colors/{id}/toggle-active': {
    patch: {
      summary: 'Alternar estado activo del color',
      description: 'Cambia el estado activo/inactivo de un color',
      tags: ['Colors'],
      security: [
        { bearerAuth: [] }
      ],
      parameters: [
        {
          $ref: '#/components/parameters/colorId'
        }
      ],
      responses: {
        200: {
          description: 'Estado del color alternado exitosamente',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Color'
              }
            }
          }
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
  '/api/colors/{id}/set-default': {
    patch: {
      summary: 'Establecer color como predeterminado',
      description: 'Marca un color como el color predeterminado del usuario',
      tags: ['Colors'],
      security: [
        { bearerAuth: [] }
      ],
      parameters: [
        {
          $ref: '#/components/parameters/colorId'
        }
      ],
      responses: {
        200: {
          description: 'Color establecido como predeterminado exitosamente',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Color'
              }
            }
          }
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
  '/api/colors/{id}/activate': {
    patch: {
      summary: 'Activar paleta de colores',
      description: 'Activa una paleta de colores específica',
      tags: ['Colors'],
      security: [
        { bearerAuth: [] }
      ],
      parameters: [
        {
          $ref: '#/components/parameters/colorId'
        }
      ],
      responses: {
        200: {
          description: 'Paleta activada exitosamente',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Color'
              }
            }
          }
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
  '/api/colors/{id}/deactivate': {
    patch: {
      summary: 'Desactivar paleta de colores',
      description: 'Desactiva una paleta de colores específica',
      tags: ['Colors'],
      security: [
        { bearerAuth: [] }
      ],
      parameters: [
        {
          $ref: '#/components/parameters/colorId'
        }
      ],
      responses: {
        200: {
          description: 'Paleta desactivada exitosamente',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Color'
              }
            }
          }
        },
        404: {
          $ref: '#/components/responses/NotFoundError'
        },
        401: {
          $ref: '#/components/responses/UnauthorizedError'
        }
      }
    }
  }
};