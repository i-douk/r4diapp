import { Model, DataTypes } from 'sequelize';
import {sequelize} from '../util/db';

class Podcaster extends Model {}

Podcaster.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userName: {
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

export default Podcaster;