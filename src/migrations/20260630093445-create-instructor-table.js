import { DataTypes } from 'sequelize';

export async function up({ context: queryInterface }) {
  await queryInterface.createTable('instructors', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
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

    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });
}

export async function down({ context: queryInterface }) {
  await queryInterface.dropTable('instructors');
}
