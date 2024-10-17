import { Model, DataTypes } from 'sequelize';
const sequelize = require('../util/db') ;

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
    podcasterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'podcasters', key: 'id' },
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

module.exports = Podcast;
