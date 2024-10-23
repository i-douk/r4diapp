import { DataTypes } from 'sequelize';

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('podcasters', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
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
    
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
        
      });
    await queryInterface.createTable('podcasts', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    urls: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    },
    transcribed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull : false
    },
    disabled : {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    description : {
      type : DataTypes.TEXT
    },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    })
    await queryInterface.addColumn('podcasts', 'podcaster_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'podcasters', key: 'id' },
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('podcasts')
    await queryInterface.dropTable('podcasters')
  },
}