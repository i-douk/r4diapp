import { DataTypes } from 'sequelize';

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('users', 'role', {
      type: DataTypes.ENUM('admin', 'user','superuser'),
      defaultValue: 'user',
      allowNull : false
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('users', 'role');
  },
};