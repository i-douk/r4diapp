import { DataTypes } from "sequelize";

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("followings", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
      },
      podcast_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "podcasts", key: "id" },
      },
      starred: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("followings");
  },
};
