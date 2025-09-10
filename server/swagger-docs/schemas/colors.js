module.exports = {
  Color: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'ID único del color',
        example: 1
      },
      name: {
        type: 'string',
        description: 'Nombre descriptivo del color',
        example: 'Azul Principal'
      },
      hex: {
        type: 'string',
        pattern: '^#[0-9A-Fa-f]{6}$',
        description: 'Código hexadecimal del color',
        example: '#007BFF'
      },
      rgb: {
        type: 'string',
        description: 'Valor RGB del color',
        example: 'rgb(0, 123, 255)'
      },
      hsl: {
        type: 'string',
        description: 'Valor HSL del color',
        example: 'hsl(204, 100%, 50%)'
      },
      userId: {
        type: 'integer',
        description: 'ID del usuario propietario del color',
        example: 1
      },
      isActive: {
        type: 'boolean',
        description: 'Estado activo del color',
        example: true
      },
      isDefault: {
        type: 'boolean',
        description: 'Indica si es el color predeterminado del usuario',
        example: false
      },
      usageCount: {
        type: 'integer',
        description: 'Número de veces que se ha usado este color',
        example: 15
      },
      createdAt: {
        type: 'string',
        format: 'date-time',
        description: 'Fecha de creación del color',
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
  CreateColorRequest: {
    type: 'object',
    required: ['name', 'hex'],
    properties: {
      name: {
        type: 'string',
        minLength: 2,
        maxLength: 100,
        description: 'Nombre descriptivo del color',
        example: 'Azul Corporativo'
      },
      hex: {
        type: 'string',
        pattern: '^#[0-9A-Fa-f]{6}$',
        description: 'Código hexadecimal del color',
        example: '#007BFF'
      },
      rgb: {
        type: 'string',
        description: 'Valor RGB opcional del color',
        example: 'rgb(0, 123, 255)'
      },
      hsl: {
        type: 'string',
        description: 'Valor HSL opcional del color',
        example: 'hsl(204, 100%, 50%)'
      },
      userId: {
        type: 'integer',
        description: 'ID del usuario propietario (opcional, se toma del token)',
        example: 1
      },
      isActive: {
        type: 'boolean',
        description: 'Estado inicial del color',
        example: true
      }
    }
  },
  UpdateColorRequest: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        minLength: 2,
        maxLength: 100,
        description: 'Nuevo nombre del color',
        example: 'Azul Principal Actualizado'
      },
      hex: {
        type: 'string',
        pattern: '^#[0-9A-Fa-f]{6}$',
        description: 'Nuevo código hexadecimal',
        example: '#0066CC'
      },
      rgb: {
        type: 'string',
        description: 'Nuevo valor RGB',
        example: 'rgb(0, 102, 204)'
      },
      hsl: {
        type: 'string',
        description: 'Nuevo valor HSL',
        example: 'hsl(204, 100%, 40%)'
      },
      isActive: {
        type: 'boolean',
        description: 'Nuevo estado del color',
        example: true
      }
    }
  },
  ColorPalette: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'ID de la paleta',
        example: 1
      },
      name: {
        type: 'string',
        description: 'Nombre de la paleta',
        example: 'Paleta Corporativa'
      },
      colors: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/Color'
        },
        description: 'Lista de colores en la paleta'
      },
      userId: {
        type: 'integer',
        description: 'ID del usuario propietario',
        example: 1
      },
      isActive: {
        type: 'boolean',
        description: 'Estado de la paleta',
        example: true
      }
    }
  },
  ColorStats: {
    type: 'object',
    properties: {
      totalColors: {
        type: 'integer',
        description: 'Total de colores en el sistema',
        example: 245
      },
      activeColors: {
        type: 'integer',
        description: 'Colores activos',
        example: 198
      },
      colorsByUser: {
        type: 'integer',
        description: 'Promedio de colores por usuario',
        example: 12
      },
      mostUsedColor: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            example: 'Azul Principal'
          },
          usageCount: {
            type: 'integer',
            example: 45
          }
        }
      }
    }
  }
};