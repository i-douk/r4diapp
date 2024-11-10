import Podcaster from "./podcaster";
import User from "./user";
import ActivePodcasterSession from "./active_podcaster_session";
import ActiveUserSession from "./active_user_session";
import Podcast from "./podcast";
import Following from "./following";
import Subscription from "./subscription";

Podcaster.hasMany(Podcast, { foreignKey: "podcaster_id", as: "podcasts" });
Podcast.belongsTo(Podcaster, { foreignKey: "podcaster_id" });

User.belongsToMany(Podcast, { through: Following, as: "followings" });
Podcast.belongsToMany(User, { through: Following, as: "followers" });

User.belongsToMany(Podcaster, { through: Subscription, as: "subscriptions" });
Podcaster.belongsToMany(User, { through: Subscription, as: "subscribers" });

Podcaster.hasMany(ActivePodcasterSession);
ActivePodcasterSession.belongsTo(Podcaster);

User.hasMany(ActiveUserSession);
ActiveUserSession.belongsTo(User);

export default {
  User,
  Podcaster,
  Podcast,
  ActivePodcasterSession,
  ActiveUserSession,
  Following,
  Subscription,
};
