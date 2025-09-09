const { Model, DataTypes, Sequelize } = require('sequelize');

const GALLERY_TABLE = 'gallery';

const GallerySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  description: {
    allowNull: true,
    type: DataTypes.TEXT,
  },
  category: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  type: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'image',
  },
  filename: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  originalName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'original_name',
  },
  mimeType: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'mime_type',
  },
  size: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  path: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  thumbnail: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  uploadedBy: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'uploaded_by',
    references: {
      model: 'users',
      key: 'id'
    }
  },
  uploadedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'uploaded_at',
    defaultValue: Sequelize.NOW,
  },
  isActive: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    field: 'is_active',
    defaultValue: true,
  },
  tags: {
    allowNull: true,
    type: DataTypes.JSON,
  },
  metadata: {
    allowNull: true,
    type: DataTypes.JSON,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'updated_at',
    defaultValue: Sequelize.NOW,
  }
}

class Gallery extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      as: 'uploader',
      foreignKey: 'uploadedBy'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: GALLERY_TABLE,
      modelName: 'Gallery',
      timestamps: true,
      underscored: true,
    }
  }
}

module.exports = { GALLERY_TABLE, GallerySchema, Gallery };