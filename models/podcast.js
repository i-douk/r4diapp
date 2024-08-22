import { Model, DataTypes, Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL);

class Podcast extends Model {}

Podcast.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  link: {
    type: DataTypes.TEXT,
  },
  shows: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'podcast',
});

export default Podcast;
