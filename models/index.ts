import Podcast from './podcast';

import Podcaster from './podcaster';
import User from './user';

import ActivePodcasterSession from './active_podcaster_session';
import ActiveUserSession from './active_user_session';

import FollowList from './follow_list';
import SubscriptionList from './subscription_list';

Podcaster.hasMany(Podcast);
Podcast.belongsTo(Podcaster);

User.belongsToMany( Podcast , { through : FollowList, as : 'follows'});
Podcast.belongsToMany( User , { through : FollowList});

Podcaster.belongsToMany( Podcast , { through : SubscriptionList, as : 'subscriptions'});
Podcast.belongsToMany( Podcaster , { through : SubscriptionList});

Podcaster.hasMany(ActivePodcasterSession);
ActivePodcasterSession.belongsTo(Podcaster);

User.hasMany(ActiveUserSession);
ActiveUserSession.belongsTo(User);

module.exports = {
  Podcaster, Podcast, ActivePodcasterSession , ActiveUserSession
}