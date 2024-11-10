import { DataTypes } from "sequelize";

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("subscriptions", "frozen", {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    });
    await queryInterface.addColumn("subscriptions", "comments", {
      type: DataTypes.ARRAY(DataTypes.TEXT),
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("subscriptions", "fronzen");
    await queryInterface.removeColumn("subscriptions", "comments");
  },
};
