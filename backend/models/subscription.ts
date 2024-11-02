import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db';

class Subscription extends Model {
  paid!: boolean;
}

Subscription.init({
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
  paid: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'subscription'
});

export default Subscription;