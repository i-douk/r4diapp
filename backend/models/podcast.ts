import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db';

class Podcast extends Model {}

Podcast.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    description : {
        type : DataTypes.TEXT,
    },
    urls: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    },
    transcribed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull : false
    }
}, {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'podcast'
  });

export default Podcast;
