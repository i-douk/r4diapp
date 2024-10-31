import { DataTypes } from 'sequelize';

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('subscription_lists', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id'},
      },
      podcaster_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'podcasters', key: 'id'},
      },
      });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('subscription_lists')
  },
}