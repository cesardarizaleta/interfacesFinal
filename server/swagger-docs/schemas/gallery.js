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
      metadata: {
        type: 'object',
        description: 'Metadatos específicos del archivo multimedia',
        oneOf: [
          { $ref: '#/components/schemas/ImageMetadata' },
          { $ref: '#/components/schemas/VideoMetadata' }
        ]
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
  },
  UploadImageRequest: {
    type: 'object',
    required: ['title', 'category', 'file'],
    properties: {
      title: {
        type: 'string',
        minLength: 2,
        maxLength: 200,
        description: 'Título de la imagen',
        example: 'Retrato Familiar'
      },
      description: {
        type: 'string',
        maxLength: 1000,
        description: 'Descripción de la imagen',
        example: 'Sesión fotográfica familiar en el parque'
      },
      category: {
        type: 'string',
        description: 'Categoría de la imagen',
        example: 'family'
      },
      file: {
        type: 'string',
        format: 'binary',
        description: 'Archivo de imagen (JPEG, PNG, GIF, WebP)',
        example: 'familia-parque.jpg'
      },
      tags: {
        type: 'string',
        description: 'Etiquetas separadas por comas',
        example: 'familia, parque, retrato'
      }
    }
  },
  UploadVideoRequest: {
    type: 'object',
    required: ['title', 'category', 'file'],
    properties: {
      title: {
        type: 'string',
        minLength: 2,
        maxLength: 200,
        description: 'Título del video',
        example: 'Boda en la Playa'
      },
      description: {
        type: 'string',
        maxLength: 1000,
        description: 'Descripción del video',
        example: 'Ceremonia de boda celebrada en la playa al atardecer'
      },
      category: {
        type: 'string',
        description: 'Categoría del video',
        example: 'wedding'
      },
      file: {
        type: 'string',
        format: 'binary',
        description: 'Archivo de video (MP4, AVI, MOV, WMV)',
        example: 'boda-playa.mp4'
      },
      tags: {
        type: 'string',
        description: 'Etiquetas separadas por comas',
        example: 'boda, playa, atardecer'
      }
    }
  },
  ImageMetadata: {
    type: 'object',
    properties: {
      width: {
        type: 'integer',
        description: 'Ancho de la imagen en píxeles',
        example: 1920
      },
      height: {
        type: 'integer',
        description: 'Alto de la imagen en píxeles',
        example: 1080
      },
      format: {
        type: 'string',
        description: 'Formato de la imagen',
        example: 'jpeg'
      },
      size: {
        type: 'integer',
        description: 'Tamaño del archivo en bytes',
        example: 2048576
      },
      imgbb: {
        type: 'object',
        description: 'Información de ImgBB',
        properties: {
          id: {
            type: 'string',
            description: 'ID único en ImgBB',
            example: '2ndCYJK'
          },
          url: {
            type: 'string',
            description: 'URL directa de la imagen',
            example: 'https://i.ibb.co/w04Prt6/c1f64245afb2.gif'
          },
          displayUrl: {
            type: 'string',
            description: 'URL de visualización',
            example: 'https://i.ibb.co/98W13PY/c1f64245afb2.gif'
          },
          thumbUrl: {
            type: 'string',
            description: 'URL del thumbnail',
            example: 'https://i.ibb.co/2ndCYJK/c1f64245afb2.gif'
          },
          mediumUrl: {
            type: 'string',
            description: 'URL de la versión mediana',
            example: 'https://i.ibb.co/98W13PY/c1f64245afb2.gif'
          },
          deleteUrl: {
            type: 'string',
            description: 'URL para eliminar la imagen',
            example: 'https://ibb.co/2ndCYJK/670a7e48ddcb85ac340c717a41047e5c'
          }
        }
      }
    }
  },
  VideoMetadata: {
    type: 'object',
    properties: {
      duration: {
        type: 'number',
        description: 'Duración del video en segundos',
        example: 120.5
      },
      width: {
        type: 'integer',
        description: 'Ancho del video en píxeles',
        example: 1920
      },
      height: {
        type: 'integer',
        description: 'Alto del video en píxeles',
        example: 1080
      },
      bitrate: {
        type: 'integer',
        description: 'Bitrate del video',
        example: 5000000
      }
    }
  }
};