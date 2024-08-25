const Podcast = require('./podcast')
const Podcaster = require('./podcaster')


Podcaster.hasMany(Podcast)
Podcast.belongsTo(Podcaster)


module.exports = {
  Podcast, Podcaster
}