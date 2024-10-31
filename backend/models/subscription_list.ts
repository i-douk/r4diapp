import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db';

class SubscriptionList extends Model {}

SubscriptionList.init({
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
  podcasterId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'podcasters', key: 'id'},
  },

}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'subscription_list'
})

export default SubscriptionList;