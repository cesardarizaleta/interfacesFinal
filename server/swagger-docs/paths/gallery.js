module.exports = {
  '/api/gallery/categories': {
    get: {
      summary: 'Obtener categorías de galería',
      description: 'Retorna una lista de todas las categorías disponibles en la galería',
      tags: ['Gallery'],
      security: [],
      responses: {
        200: {
          description: 'Categorías obtenidas exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/GalleryCategory'
                }
              }
            }
          }
        }
      }
    }
  },
  '/api/gallery': {
    get: {
      summary: 'Obtener elementos de galería',
      description: 'Retorna una lista de todos los elementos de la galería (solo administradores)',
      tags: ['Gallery', 'Admin'],
      security: [
        { bearerAuth: [] }
      ],
      responses: {
        200: {
          description: 'Elementos de galería obtenidos exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/GalleryItem'
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
  '/api/gallery/{id}': {
    get: {
      summary: 'Obtener elemento de galería por ID',
      description: 'Retorna la información completa de un elemento específico de la galería',
      tags: ['Gallery', 'Admin'],
      security: [
        { bearerAuth: [] }
      ],
      parameters: [
        {
          $ref: '#/components/parameters/galleryId'
        }
      ],
      responses: {
        200: {
          description: 'Elemento encontrado',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/GalleryItem'
              }
            }
          }
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
    },
    patch: {
      summary: 'Actualizar elemento de galería',
      description: 'Actualiza la información de un elemento específico de la galería',
      tags: ['Gallery', 'Admin'],
      security: [
        { bearerAuth: [] }
      ],
      parameters: [
        {
          $ref: '#/components/parameters/galleryId'
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                title: {
                  type: 'string',
                  description: 'Nuevo título del elemento'
                },
                description: {
                  type: 'string',
                  description: 'Nueva descripción del elemento'
                },
                category: {
                  type: 'string',
                  description: 'Nueva categoría del elemento'
                },
                isActive: {
                  type: 'boolean',
                  description: 'Nuevo estado del elemento'
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Elemento actualizado exitosamente',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/GalleryItem'
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
    },
    delete: {
      summary: 'Eliminar elemento de galería',
      description: 'Elimina un elemento de la galería del sistema',
      tags: ['Gallery', 'Admin'],
      security: [
        { bearerAuth: [] }
      ],
      parameters: [
        {
          $ref: '#/components/parameters/galleryId'
        }
      ],
      responses: {
        204: {
          description: 'Elemento eliminado exitosamente'
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
  '/api/gallery/category/{category}': {
    get: {
      summary: 'Obtener elementos por categoría',
      description: 'Retorna todos los elementos de la galería de una categoría específica',
      tags: ['Gallery', 'Admin'],
      security: [
        { bearerAuth: [] }
      ],
      parameters: [
        {
          $ref: '#/components/parameters/category'
        }
      ],
      responses: {
        200: {
          description: 'Elementos de la categoría obtenidos exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/GalleryItem'
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
  '/api/gallery/upload': {
    post: {
      summary: 'Subir elemento a la galería',
      description: 'Sube un nuevo elemento multimedia a la galería del sistema',
      tags: ['Gallery', 'Admin'],
      security: [
        { bearerAuth: [] }
      ],
      requestBody: {
        required: true,
        content: {
          'multipart/form-data': {
            schema: {
              $ref: '#/components/schemas/UploadGalleryRequest'
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Elemento subido exitosamente',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/GalleryItem'
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
        },
        403: {
          $ref: '#/components/responses/ForbiddenError'
        }
      }
    }
  },
  '/api/gallery/{id}/toggle': {
    patch: {
      summary: 'Alternar visibilidad del elemento',
      description: 'Cambia el estado activo/inactivo de un elemento de la galería',
      tags: ['Gallery', 'Admin'],
      security: [
        { bearerAuth: [] }
      ],
      parameters: [
        {
          $ref: '#/components/parameters/galleryId'
        }
      ],
      responses: {
        200: {
          description: 'Visibilidad del elemento alternada exitosamente',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/GalleryItem'
              }
            }
          }
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
  }
};