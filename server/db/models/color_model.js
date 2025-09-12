const { Model, DataTypes, Sequelize } = require('sequelize');

const COLOR_TABLE = 'colors';

const ColorSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  colorPrimary: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'color_primary',
  },
  colorSecondary: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'color_secondary',
  },
  colorAccent: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'color_accent',
  },
  colorText: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'color_text',
  },
  backgroundNeutral: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'background_neutral',
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'user_id',
    references: {
      model: 'users',
      key: 'id'
    }
  },
  isDefault: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    field: 'is_default',
    defaultValue: false,
  },
  isActive: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    field: 'is_active',
    defaultValue: false,
  },
  lastUsedAt: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'last_used_at',
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

class Color extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: COLOR_TABLE,
      modelName: 'Color',
      timestamps: true,
      underscored: true,
    }
  }
}

module.exports = { COLOR_TABLE, ColorSchema, Color };
