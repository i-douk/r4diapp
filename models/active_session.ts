import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../util/db'

class ActiveSession extends Model {}
ActiveSession.init(
  {
    id: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true },
    token: {
        type: DataTypes.STRING,
        allowNull: false },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'users', key: 'id'},
    }
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'active_session',
  }
)

export default ActiveSession;