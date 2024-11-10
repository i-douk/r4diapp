import { DataTypes } from "sequelize";
("use strict");

module.exports = {
  up: async ({ context: queryInterface }) => {
    // Create 'podcasters' table
    await queryInterface.createTable("podcasters", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      premium: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      disabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    });

    // Create 'podcasts' table
    await queryInterface.createTable("podcasts", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      urls: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      transcribed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      disabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    });

    // Check if 'podcaster_id' column exists before adding it
    const [results] = await queryInterface.sequelize.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name='podcasts' 
      AND column_name='podcaster_id';
    `);

    if (results.length === 0) {
      await queryInterface.addColumn("podcasts", "podcaster_id", {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "podcasters", key: "id" },
      });
    }
  },

  down: async ({ context: queryInterface }) => {
    // Drop tables in reverse order to avoid constraint issues
    await queryInterface.dropTable("podcasts");
    await queryInterface.dropTable("podcasters");

    // Remove the 'podcaster_id' column if it exists
    const [results] = await queryInterface.sequelize.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name='podcasts' 
      AND column_name='podcaster_id';
    `);

    if (results.length > 0) {
      await queryInterface.removeColumn("podcasts", "podcaster_id");
    }
  },
};
