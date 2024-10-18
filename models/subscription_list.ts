import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../util/db';

class SubscriptionList extends Model {}

SubscriptionList.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  subscribed : {
    type: DataTypes.BOOLEAN,
    allowNull : false,
    defaultValue: false
  },
  podcasterId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'podcasters', key: 'id'},
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
  modelName: 'SubscriptionList'
})

export default SubscriptionList;