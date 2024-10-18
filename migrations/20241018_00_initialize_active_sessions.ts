import { DataTypes } from 'sequelize';

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('active_sessions', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      podcaster_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'podcasters', key: 'id' },
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: { type: DataTypes.DATE, allowNull: false },
      updated_at: { type: DataTypes.DATE, allowNull: false },
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('active_sessions')
  },
}