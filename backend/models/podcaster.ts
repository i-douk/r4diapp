import { Model, DataTypes } from 'sequelize';
import {sequelize} from '../util/db';
import hashPassword from '../util/hashHook';

class Podcaster extends Model {
  public premium?: boolean;
  public disabled?: boolean;
  public username?: string;
  public id?: number;
  public name?: string;
  public password?: string;
}


Podcaster.init({
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
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8, 100],  // Minimum length requirement
          isStrongPassword(value) {
            if (!/[A-Z]/.test(value) || !/[a-z]/.test(value) || !/[0-9]/.test(value) || !/[@$!%*?&#]/.test(value)) {
              throw new Error('Password must contain uppercase, lowercase, number, and special character');
            }
          }
        }
      },
    premium : {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
    verified : {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
    disabled : {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
}, {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'podcaster'
  });

  // Password hashing hook
Podcaster.beforeCreate(async (podcaster) => {
  if (podcaster.password) {
    podcaster.password = await hashPassword(podcaster.password);
  }
});

Podcaster.beforeUpdate(async (podcaster : any ) => {
  if (podcaster.changed('password')) {
    podcaster.password = await hashPassword(podcaster.password);
  }
});


export default Podcaster;