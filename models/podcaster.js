import { Model, DataTypes, Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL);

class Podcaster extends Model {}

Podcaster.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  username: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  }
 
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'podcast',
});

export default Podcaster;
