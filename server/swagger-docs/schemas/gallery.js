module.exports = {
  GalleryItem: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'ID único del elemento de galería',
        example: 1
      },
      title: {
        type: 'string',
        description: 'Título del elemento',
        example: 'Boda en la Playa'
      },
      description: {
        type: 'string',
        description: 'Descripción detallada del elemento',
        example: 'Sesión de fotos de boda celebrada en la playa al atardecer'
      },
      category: {
        type: 'string',
        description: 'Categoría del elemento',
        example: 'wedding'
      },
      fileName: {
        type: 'string',
        description: 'Nombre del archivo original',
        example: 'boda-playa-001.jpg'
      },
      filePath: {
        type: 'string',
        description: 'Ruta del archivo en el servidor',
        example: '/uploads/gallery/boda-playa-001.jpg'
      },
      fileType: {
        type: 'string',
        enum: ['image', 'video'],
        description: 'Tipo de archivo',
        example: 'image'
      },
      fileSize: {
        type: 'integer',
        description: 'Tamaño del archivo en bytes',
        example: 2048576
      },
      dimensions: {
        type: 'object',
        properties: {
          width: {
            type: 'integer',
            example: 1920
          },
          height: {
            type: 'integer',
            example: 1080
          }
        }
      },
      isActive: {
        type: 'boolean',
        description: 'Estado activo del elemento',
        example: true
      },
      tags: {
        type: 'array',
        items: {
          type: 'string'
        },
        description: 'Etiquetas del elemento',
        example: ['boda', 'playa', 'atardecer']
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
  GalleryCategory: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'Identificador de la categoría',
        example: 'wedding'
      },
      name: {
        type: 'string',
        description: 'Nombre de la categoría',
        example: 'Bodas'
      },
      description: {
        type: 'string',
        description: 'Descripción de la categoría',
        example: 'Fotografía de bodas y eventos matrimoniales'
      },
      itemCount: {
        type: 'integer',
        description: 'Número de elementos en la categoría',
        example: 25
      }
    }
  },
  UploadGalleryRequest: {
    type: 'object',
    required: ['title', 'category', 'file'],
    properties: {
      title: {
        type: 'string',
        minLength: 2,
        maxLength: 200,
        description: 'Título del elemento',
        example: 'Retrato Familiar'
      },
      description: {
        type: 'string',
        maxLength: 1000,
        description: 'Descripción del elemento',
        example: 'Sesión fotográfica familiar en el parque'
      },
      category: {
        type: 'string',
        description: 'Categoría del elemento',
        example: 'family'
      },
      file: {
        type: 'string',
        format: 'binary',
        description: 'Archivo multimedia (imagen o video)',
        example: 'familia-parque.jpg'
      },
      tags: {
        type: 'string',
        description: 'Etiquetas separadas por comas',
        example: 'familia, parque, retrato'
      }
    }
  }
};