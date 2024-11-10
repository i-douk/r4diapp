import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db';

class Subscription extends Model {
  paid!: boolean;
  id!: number;
  userId!: number;
  comments?: string[];
  frozen!: boolean;
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
  },
  stipend : {
    type: DataTypes.INTEGER,
    defaultValue : 0,
    allowNull : false
  },
  frozen : {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  comments : {
    type: DataTypes.ARRAY(DataTypes.STRING)
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'subscription'
});

export default Subscription;