import { Model, DataTypes } from 'sequelize'

import { sequelize } from '../util/db'

class User extends Model {
    disabled: any;
    username: any;
    id: any;
    name: any;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: {
        msg : "Validation isEmail on username failed"
      },   
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }, 
  disabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },

}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'user'
})

export default User;