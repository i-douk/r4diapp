import { DataTypes } from 'sequelize'

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('podcasters', 'verified', {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    })
    await queryInterface.addColumn('podcasters', 'disabled', {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    })
    await queryInterface.addColumn('podcasters', 'premium', {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('podcasters', 'verified')
    await queryInterface.removeColumn('podcasters', 'disabled')
    await queryInterface.removeColumn('podcasters', 'premium')
  },
}