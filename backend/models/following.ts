import { Model, DataTypes } from "sequelize";
import { sequelize } from "../utils/db";

class Following extends Model {
  public starred!: boolean;
  public userId!: number;
  public id!: number;
}

Following.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    podcastId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "podcasts", key: "id" },
    },
    starred: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "following",
  },
);

export default Following;
