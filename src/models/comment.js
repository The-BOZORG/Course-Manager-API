import { sequelize } from '../config/db.js';
import { DataTypes } from 'sequelize';

export const Comment = sequelize.define(
  'Comment',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    courseId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    userName: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected'),
      defaultValue: 'pending',
    },
  },
  {
    tableName: 'comments',
    timestamps: true,
    underscored: true,
  },
);
