import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../util/db'

class ActivePodcasterSession extends Model {}
ActivePodcasterSession.init(
  {
    id: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true },
    token: {
        type: DataTypes.STRING,
        allowNull: false },
    podcasterId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'podcasters', key: 'id'},
    }
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'active_podcaster_session',
  }
)

export default ActivePodcasterSession;