import { PodcastDTO } from "./PodcastDTO";
import { SubscriptionDTO } from "./SubscriptionDTO";
import { UserDTO } from "./UserDTO";

export class PodcasterDTO {
    public id: number;
    public username: string;
    public name: string;
    public premium?: boolean;
    public disabled?: boolean;
    public avatar_url: string | null;
    public created_at: string;
    public updated_at: string;
    public subscriptioncount: number;
    public verified: boolean;

    public podcasts?: PodcastDTO[];
    public subscribers?: UserDTO[];
    public subscription?: SubscriptionDTO
  
    constructor(podcaster: any) {
      this.id = podcaster.id;
      this.username = podcaster.username;
      this.name = podcaster.name;
      this.premium = podcaster.premium;
      this.disabled = podcaster.disabled;
      this.avatar_url = podcaster.avatar_url;
      this.updated_at = podcaster.updated_at;
      this.created_at = podcaster.created_at;
      this.verified = podcaster.verified;
      this.subscription = podcaster.subscription
      this.subscriptioncount = podcaster.subscriptioncount;
      
      this.podcasts = podcaster.podcasts?.map((p: any) => new PodcastDTO(p));
      this.subscribers = podcaster.subscribers?.map((subscriber: any) => new UserDTO(subscriber));
    }
  }
  