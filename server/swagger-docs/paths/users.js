module.exports = {
  '/api/users/check-admins': {
    get: {
      summary: 'Verificar usuarios administradores',
      description: 'Obtiene una lista de usuarios con rol de administrador (solo para desarrollo)',
      tags: ['Users'],
      security: [],
      responses: {
        200: {
          description: 'Lista de administradores obtenida exitosamente',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/AdminUsersList'
              }
            }
          }
        }
      }
    }
  },
  '/api/users': {
    get: {
      summary: 'Obtener todos los usuarios',
      description: 'Retorna una lista completa de todos los usuarios del sistema',
      tags: ['Users'],
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
    },
    post: {
      summary: 'Crear nuevo usuario',
      description: 'Crea un nuevo usuario en el sistema con rol de usuario por defecto',
      tags: ['Users', 'Admin'],
      security: [
        { bearerAuth: [] }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/CreateUserRequest'
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Usuario creado exitosamente',
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
        },
        403: {
          $ref: '#/components/responses/ForbiddenError'
        }
      }
    }
  },
  '/api/users/{id}': {
    get: {
      summary: 'Obtener usuario por ID',
      description: 'Retorna la información completa de un usuario específico',
      tags: ['Users'],
      security: [
        { bearerAuth: [] }
      ],
      parameters: [
        {
          $ref: '#/components/parameters/userId'
        }
      ],
      responses: {
        200: {
          description: 'Usuario encontrado',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User'
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
    },
    patch: {
      summary: 'Actualizar usuario',
      description: 'Actualiza la información de un usuario específico',
      tags: ['Users'],
      security: [
        { bearerAuth: [] }
      ],
      parameters: [
        {
          $ref: '#/components/parameters/userId'
        }
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
          description: 'Usuario actualizado exitosamente',
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
        404: {
          $ref: '#/components/responses/NotFoundError'
        },
        401: {
          $ref: '#/components/responses/UnauthorizedError'
        }
      }
    },
    delete: {
      summary: 'Eliminar usuario',
      description: 'Elimina permanentemente un usuario del sistema',
      tags: ['Users', 'Admin'],
      security: [
        { bearerAuth: [] }
      ],
      parameters: [
        {
          $ref: '#/components/parameters/userId'
        }
      ],
      responses: {
        204: {
          description: 'Usuario eliminado exitosamente'
        },
        404: {
          $ref: '#/components/responses/NotFoundError'
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
  '/api/users/admin/stats': {
    get: {
      summary: 'Obtener estadísticas de usuarios',
      description: 'Retorna estadísticas generales del sistema de usuarios',
      tags: ['Users', 'Admin'],
      security: [
        { bearerAuth: [] }
      ],
      responses: {
        200: {
          description: 'Estadísticas obtenidas exitosamente',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UserStats'
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
  '/api/users/admin/export': {
    get: {
      summary: 'Exportar usuarios a Excel',
      description: 'Genera y descarga un archivo Excel con todos los usuarios del sistema',
      tags: ['Users', 'Admin'],
      security: [
        { bearerAuth: [] }
      ],
      responses: {
        200: {
          description: 'Archivo Excel generado exitosamente',
          content: {
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
              schema: {
                type: 'string',
                format: 'binary'
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
  '/api/users/{id}/role': {
    patch: {
      summary: 'Actualizar rol de usuario',
      description: 'Cambia el rol de un usuario específico (solo administradores)',
      tags: ['Users', 'Admin'],
      security: [
        { bearerAuth: [] }
      ],
      parameters: [
        {
          $ref: '#/components/parameters/userId'
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['role'],
              properties: {
                role: {
                  type: 'string',
                  enum: ['user', 'admin'],
                  description: 'Nuevo rol del usuario'
                }
              }
            },
            example: {
              role: 'admin'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Rol actualizado exitosamente',
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
        404: {
          $ref: '#/components/responses/NotFoundError'
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
  '/api/users/role/{role}': {
    get: {
      summary: 'Obtener usuarios por rol',
      description: 'Retorna una lista de usuarios filtrados por rol específico',
      tags: ['Users', 'Admin'],
      security: [
        { bearerAuth: [] }
      ],
      parameters: [
        {
          $ref: '#/components/parameters/role'
        }
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
  }
};