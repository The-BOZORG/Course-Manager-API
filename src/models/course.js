import { sequelize } from '../config/db.js';
import { DataTypes } from 'sequelize';
import { Comment } from './comment.js';
import { Instructor } from './instructor.js';

export const Course = sequelize.define(
  'Course',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'title is required',
        },
        notNull: {
          msg: 'title is required',
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'description is required',
        },
        notNull: {
          msg: 'description is required',
        },
      },
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'price is required',
        },
        notNull: {
          msg: 'price is required',
        },
        isDecimal: {
          msg: 'price must be valid number',
        },
        min: {
          args: [0],
          msg: 'price cannot be negative',
        },
      },
    },
    currency: {
      type: DataTypes.STRING(3),
      defaultValue: 'USD',
      allowNull: false,
      validate: {
        isIn: {
          args: [['USD', 'BRL', 'GBP']],
          msg: 'currency must be USD - BRL - GBP',
        },
        notNull: {
          msg: 'currency cannot be null',
        },
      },
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'active cannot be null',
        },
      },
    },
    instructorId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    tableName: 'courses',
    timestamps: true,
    underscored: true,
  },
);
