import { sequelize } from '../config/db.js';
import { DataTypes } from 'sequelize';
import { Course } from './course.js';

export const Instructor = sequelize.define(
  'Instructor',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    website: {
      type: DataTypes.STRING(60),
      allowNull: true,
    },
  },
  {
    tableName: 'instructors',
    timestamps: true,
    underscored: true,
  },
);
