// import { DataTypes } from 'sequelize'

// module.exports = {
//   up: async ({ context: queryInterface }) => {
//     await queryInterface.addColumn('podcasts', 'user_id', {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//         references: { model: 'users', key: 'id' },
//       });
//       await queryInterface.addColumn('podcasters', 'user_id', {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//         references: { model: 'users', key: 'id' },
//       });
//   },
//   down: async ({ context: queryInterface }) => {
//     await queryInterface.removeColumn('podcasters', 'user_id')
//   },
// }