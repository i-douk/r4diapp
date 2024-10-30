import { DataTypes } from 'sequelize';

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('follow_lists', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      followed : {
        type: DataTypes.BOOLEAN,
        allowNull : false,
        defaultValue: false
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id'},
      },
      podcast_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'podcasts', key: 'id'},
      },
      });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('follow_lists')
  },
}