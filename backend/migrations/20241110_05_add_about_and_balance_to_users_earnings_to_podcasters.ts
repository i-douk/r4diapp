import { DataTypes } from "sequelize";

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("users", "about", {
      type: DataTypes.TEXT,
    });
    await queryInterface.addColumn("users", "balance", {
      type: DataTypes.INTEGER,
    });
    await queryInterface.addColumn("podcasters", "earnings", {
      type: DataTypes.INTEGER,
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("users", "about");
    await queryInterface.removeColumn("podcasters", "balance");
    await queryInterface.removeColumn("podcasters", "earnings");
  },
};
