import { DataTypes } from 'sequelize';

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('podcasters', 'subscriptioncount', {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull : false
    });
    await queryInterface.addColumn('podcasts', 'followcount', {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull : false
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('podcasters', 'subscriptioncount');
    await queryInterface.removeColumn('podcasts', 'followcount');
  },
};