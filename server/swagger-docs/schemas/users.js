module.exports = {
  User: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'ID único del usuario',
        example: 1
      },
      firstName: {
        type: 'string',
        description: 'Nombre del usuario',
        example: 'Juan'
      },
      lastName: {
        type: 'string',
        description: 'Apellido del usuario',
        example: 'Pérez'
      },
      email: {
        type: 'string',
        format: 'email',
        description: 'Correo electrónico del usuario',
        example: 'juan.perez@example.com'
      },
      role: {
        type: 'string',
        enum: ['user', 'admin'],
        description: 'Rol del usuario en el sistema',
        example: 'user'
      },
      age: {
        type: 'integer',
        description: 'Edad del usuario',
        example: 28
      },
      isActive: {
        type: 'boolean',
        description: 'Estado activo del usuario',
        example: true
      },
      createdAt: {
        type: 'string',
        format: 'date-time',
        description: 'Fecha de creación del usuario',
        example: '2024-01-15T10:30:00.000Z'
      },
      updatedAt: {
        type: 'string',
        format: 'date-time',
        description: 'Fecha de última actualización',
        example: '2024-01-20T14:45:00.000Z'
      }
    }
  },
  CreateUserRequest: {
    type: 'object',
    required: ['firstName', 'lastName', 'email', 'password'],
    properties: {
      firstName: {
        type: 'string',
        minLength: 2,
        maxLength: 50,
        description: 'Nombre del usuario',
        example: 'María'
      },
      lastName: {
        type: 'string',
        minLength: 2,
        maxLength: 50,
        description: 'Apellido del usuario',
        example: 'González'
      },
      email: {
        type: 'string',
        format: 'email',
        description: 'Correo electrónico único',
        example: 'maria.gonzalez@example.com'
      },
      password: {
        type: 'string',
        minLength: 6,
        description: 'Contraseña segura',
        example: 'securePass123'
      },
      age: {
        type: 'integer',
        minimum: 18,
        maximum: 120,
        description: 'Edad del usuario',
        example: 28
      },
      role: {
        type: 'string',
        enum: ['user', 'admin'],
        description: 'Rol del usuario (por defecto: user)',
        example: 'user'
      }
    }
  },
  UpdateUserRequest: {
    type: 'object',
    properties: {
      firstName: {
        type: 'string',
        minLength: 2,
        maxLength: 50,
        description: 'Nombre del usuario',
        example: 'María José'
      },
      lastName: {
        type: 'string',
        minLength: 2,
        maxLength: 50,
        description: 'Apellido del usuario',
        example: 'González'
      },
      email: {
        type: 'string',
        format: 'email',
        description: 'Correo electrónico único',
        example: 'maria.jose@example.com'
      },
      age: {
        type: 'integer',
        minimum: 18,
        maximum: 120,
        description: 'Edad del usuario',
        example: 29
      }
    }
  },
  UserStats: {
    type: 'object',
    properties: {
      totalUsers: {
        type: 'integer',
        description: 'Total de usuarios registrados',
        example: 150
      },
      activeUsers: {
        type: 'integer',
        description: 'Usuarios activos',
        example: 142
      },
      adminUsers: {
        type: 'integer',
        description: 'Usuarios con rol administrador',
        example: 3
      },
      newUsersThisMonth: {
        type: 'integer',
        description: 'Nuevos usuarios este mes',
        example: 12
      }
    }
  },
  AdminUsersList: {
    type: 'object',
    properties: {
      totalUsers: {
        type: 'integer',
        description: 'Total de usuarios en el sistema',
        example: 150
      },
      adminUsers: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'admin@example.com'
            },
            role: {
              type: 'string',
              example: 'admin'
            }
          }
        }
      }
    }
  }
};