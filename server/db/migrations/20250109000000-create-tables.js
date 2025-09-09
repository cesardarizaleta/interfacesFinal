'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Create users table
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      first_name: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      last_name: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      maiden_name: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      age: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      gender: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      phone: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      username: {
        allowNull: true,
        type: Sequelize.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      birth_date: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      image: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      blood_group: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      height: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      weight: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      eye_color: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      hair: {
        allowNull: true,
        type: Sequelize.JSON,
      },
      ip: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      address: {
        allowNull: true,
        type: Sequelize.JSON,
      },
      mac_address: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      university: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      bank: {
        allowNull: true,
        type: Sequelize.JSON,
      },
      company: {
        allowNull: true,
        type: Sequelize.JSON,
      },
      ein: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      ssn: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      user_agent: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      crypto: {
        allowNull: true,
        type: Sequelize.JSON,
      },
      role: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'user',
      },
      recovery_token: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      }
    });

    // Create colors table
    await queryInterface.createTable('colors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      hex: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      rgb: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      hsl: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      is_default: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      is_active: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      last_used_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      }
    });

    // Create fonts table
    await queryInterface.createTable('fonts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      font_family: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      font_type: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'general',
      },
      font_file_path: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      font_weight: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'normal',
      },
      font_style: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'normal',
      },
      font_format: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'ttf',
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      uploaded_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      last_used_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      }
    });

    // Create gallery table
    await queryInterface.createTable('gallery', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      description: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      category: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'image',
      },
      filename: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      original_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      mime_type: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      size: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      path: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      thumbnail: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      uploaded_by: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      uploaded_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      is_active: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      tags: {
        allowNull: true,
        type: Sequelize.JSON,
      },
      metadata: {
        allowNull: true,
        type: Sequelize.JSON,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('gallery');
    await queryInterface.dropTable('fonts');
    await queryInterface.dropTable('colors');
    await queryInterface.dropTable('users');
  }
};