const express = require('express')
const app = express()
require('express-async-errors')
const { PORT } = require('./util/config')
const { connectToDatabase, sequelize } = require('./util/db')
app.use(express.json())


// Sync Sequelize models with the database
sequelize.sync({ force: true }) 
  .then(() => {
    console.log('Database synchronized');
    app.listen(PORT, async () => {
      await connectToDatabase()
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Unable to sync database:', error);
  });
// const start = async () => {
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`)
//   })
// }

// start()