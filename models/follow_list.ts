import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../util/db';

class FollowList extends Model {}

FollowList.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  followed : {
    type: DataTypes.BOOLEAN,
    allowNull : false,
    defaultValue: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id'},
  },
  podcastId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'podcasts', key: 'id'},
  },

}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'FollowList'
})

export default FollowList;