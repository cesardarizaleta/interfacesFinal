module.exports = {
  Font: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'ID único de la fuente',
        example: 1
      },
      name: {
        type: 'string',
        description: 'Nombre de la fuente',
        example: 'Roboto Bold'
      },
      fileName: {
        type: 'string',
        description: 'Nombre del archivo de la fuente',
        example: 'roboto-bold.ttf'
      },
      filePath: {
        type: 'string',
        description: 'Ruta del archivo en el servidor',
        example: '/uploads/fonts/roboto-bold.ttf'
      },
      format: {
        type: 'string',
        enum: ['ttf', 'otf', 'woff', 'woff2'],
        description: 'Formato del archivo de fuente',
        example: 'ttf'
      },
      weight: {
        type: 'string',
        enum: ['100', '200', '300', '400', '500', '600', '700', '800', '900', 'normal', 'bold', 'lighter', 'bolder', 'regular'],
        description: 'Peso de la fuente',
        example: 'regular'
      },
      style: {
        type: 'string',
        description: 'Estilo de la fuente',
        example: 'normal'
      },
      userId: {
        type: 'integer',
        description: 'ID del usuario propietario',
        example: 1
      },
      isActive: {
        type: 'boolean',
        description: 'Estado activo de la fuente',
        example: true
      },
      usageCount: {
        type: 'integer',
        description: 'Número de veces usada',
        example: 8
      },
      fileSize: {
        type: 'integer',
        description: 'Tamaño del archivo en bytes',
        example: 245760
      },
      createdAt: {
        type: 'string',
        format: 'date-time',
        description: 'Fecha de creación',
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
  CreateFontRequest: {
    type: 'object',
    required: ['name', 'fontFile'],
    properties: {
      name: {
        type: 'string',
        minLength: 2,
        maxLength: 100,
        description: 'Nombre de la fuente',
        example: 'Montserrat Regular'
      },
      fontFile: {
        type: 'string',
        format: 'binary',
        description: 'Archivo de fuente (TTF, OTF, WOFF, WOFF2)',
        example: 'montserrat-regular.ttf'
      },
      weight: {
        type: 'string',
        description: 'Peso de la fuente',
        example: 'regular'
      },
      style: {
        type: 'string',
        description: 'Estilo de la fuente',
        example: 'normal'
      }
    }
  },
  UpdateFontRequest: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        minLength: 2,
        maxLength: 100,
        description: 'Nuevo nombre de la fuente',
        example: 'Montserrat Regular Updated'
      },
      weight: {
        type: 'string',
        enum: ['100', '200', '300', '400', '500', '600', '700', '800', '900', 'normal', 'bold', 'lighter', 'bolder', 'regular'],
        description: 'Nuevo peso de la fuente',
        example: 'regular'
      },
      style: {
        type: 'string',
        description: 'Nuevo estilo de la fuente',
        example: 'normal'
      },
      isActive: {
        type: 'boolean',
        description: 'Nuevo estado de la fuente',
        example: true
      }
    }
  }
};