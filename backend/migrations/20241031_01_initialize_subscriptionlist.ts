import { DataTypes } from 'sequelize';

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('subscriptions', {
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
      paid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      }
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('subscriptions');
  },
};