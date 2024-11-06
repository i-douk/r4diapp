export class SubscriptionDTO {
    public id: number;
    public userId: string;
    public podcasterId: string;
    public paid: boolean;
  
    constructor(subscription: any) {
      this.id = subscription.id;
      this.userId = subscription.userId;
      this.podcasterId = subscription.podcasterId;
      this.paid = subscription.paid;

    }
  }
  