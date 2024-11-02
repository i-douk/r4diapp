import { DataTypes } from 'sequelize';

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('users', {
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
      },
      verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }, 
      disabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
    
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
        
    });
    
    await queryInterface.addColumn('users', 'podcaster_id', {
      type: DataTypes.INTEGER,
      references: { model: 'podcasters', key: 'id' },
    });
    await queryInterface.addColumn('users', 'podcast_id', {
      type: DataTypes.INTEGER,
      references: { model: 'podcasts', key: 'id' },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('users');
    await queryInterface.removeColumn('users', 'podcast_id');
    await queryInterface.removeColumn('users', 'podcaster_id');
  },
};