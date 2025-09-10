const { Model, DataTypes, Sequelize } = require('sequelize');

const FONT_TABLE = 'fonts';

const FontSchema = {
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
  fontFamily: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'font_family',
  },
  fontType: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'font_type',
    defaultValue: 'general',
  },
  fontFilePath: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'font_file_path',
  },
  fontWeight: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'font_weight',
    defaultValue: 'normal',
  },
  fontStyle: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'font_style',
    defaultValue: 'normal',
  },
  fontFormat: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'font_format',
    defaultValue: 'ttf',
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
  uploadedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'uploaded_at',
    defaultValue: Sequelize.NOW,
  },
  lastUsedAt: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'last_used_at',
  },
  driveFileId: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'drive_file_id',
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

class Font extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId'
    });
  }

  // Getter for weight
  get weight() {
    return this.getDataValue('fontWeight');
  }

  // Setter for weight
  set weight(value) {
    this.setDataValue('fontWeight', value);
  }

  // Getter for style
  get style() {
    return this.getDataValue('fontStyle');
  }

  // Setter for style
  set style(value) {
    this.setDataValue('fontStyle', value);
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: FONT_TABLE,
      modelName: 'Font',
      timestamps: true,
      underscored: true,
    }
  }
}

module.exports = { FONT_TABLE, FontSchema, Font };
