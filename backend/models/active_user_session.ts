import { Model, DataTypes } from "sequelize";
import { sequelize } from "../utils/db";

class ActiveUserSession extends Model {
  role!: string;
}
ActiveUserSession.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "users", key: "id" },
    },
    role: {
      type: DataTypes.ENUM({ values: ["user", "superuser", "admin"] }),
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "active_user_session",
  },
);

export default ActiveUserSession;
