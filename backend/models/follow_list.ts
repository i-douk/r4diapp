import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db';

class FollowList extends Model {}

FollowList.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
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
  modelName: 'follow_list'
})

export default FollowList;