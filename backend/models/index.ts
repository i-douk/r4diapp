import Podcaster from './podcaster';
import User from './user';
import ActivePodcasterSession from './active_podcaster_session';
import ActiveUserSession from './active_user_session';
import Podcast from './podcast';
import FollowList from './follow_list';
import SubscriptionList from './subscription_list';

Podcaster.hasMany(Podcast);
Podcast.belongsTo(Podcaster);

User.belongsToMany( Podcast , { through : FollowList, as : 'followings'});
Podcast.belongsToMany( User , { through : FollowList , as : 'followers'});

User.belongsToMany( Podcaster , { through : SubscriptionList, as : 'subscriptions'});
Podcaster.belongsToMany( User , { through : SubscriptionList , as : 'subscribers'});

Podcaster.hasMany(ActivePodcasterSession);
ActivePodcasterSession.belongsTo(Podcaster);

User.hasMany(ActiveUserSession);
ActiveUserSession.belongsTo(User);


export default { User ,  Podcaster, Podcast, ActivePodcasterSession , ActiveUserSession };
