const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users';

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  firstName: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'first_name'
  },
  lastName: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'last_name'
  },
  maidenName: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'maiden_name'
  },
  age: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  gender: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  phone: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  username: {
    allowNull: true,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  birthDate: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'birth_date'
  },
  image: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  bloodGroup: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'blood_group'
  },
  height: {
    allowNull: true,
    type: DataTypes.FLOAT,
  },
  weight: {
    allowNull: true,
    type: DataTypes.FLOAT,
  },
  eyeColor: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'eye_color'
  },
  hair: {
    allowNull: true,
    type: DataTypes.JSON,
  },
  ip: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  address: {
    allowNull: true,
    type: DataTypes.JSON,
  },
  macAddress: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'mac_address'
  },
  university: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  bank: {
    allowNull: true,
    type: DataTypes.JSON,
  },
  company: {
    allowNull: true,
    type: DataTypes.JSON,
  },
  ein: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ssn: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  userAgent: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'user_agent'
  },
  crypto: {
    allowNull: true,
    type: DataTypes.JSON,
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'user',
  },
  recoveryToken: {
    field: 'recovery_token',
    allowNull: true,
    type: DataTypes.STRING
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

class User extends Model {
  static associate(models) {
    // Define associations here if needed
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: true,
      underscored: true,
    }
  }
}

module.exports = { USER_TABLE, UserSchema, User };
