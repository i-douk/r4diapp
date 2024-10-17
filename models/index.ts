const Podcast = require('./podcast')
const Podcaster = require('./podcaster')
// const User = require('./user')
// const ActiveSession = require('./active_session')

Podcaster.hasMany(Podcast)
Podcast.belongsTo(Podcaster)

// User.belongsToMany( Blog , { through : Readinglist, as : 'readings'})
// Blog.belongsToMany( User , { through : Readinglist})

// User.hasMany(ActiveSession)
// ActiveSession.belongsTo(User)

module.exports = {
  Podcaster, Podcast
}