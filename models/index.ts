import Podcast from './podcast';
import Podcaster from './podcaster';
import User from './user';
import ActiveSession from './active_session';
import FollowList from './follow_list';
import SubscriptionList from './subscription_list';

Podcaster.hasMany(Podcast);
Podcast.belongsTo(Podcaster);

User.belongsToMany( Podcast , { through : FollowList, as : 'follows'});
Podcast.belongsToMany( User , { through : FollowList});

Podcaster.belongsToMany( Podcast , { through : SubscriptionList, as : 'subscriptions'});
Podcast.belongsToMany( Podcaster , { through : SubscriptionList});

Podcaster.hasMany(ActiveSession);
ActiveSession.belongsTo(Podcaster);

module.exports = {
  Podcaster, Podcast, ActiveSession
}