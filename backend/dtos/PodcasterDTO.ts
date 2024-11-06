import { SubscriptionDTO } from "./SubscriptionDTO";
import { PodcastDTO } from "./PodcastDTO";
import { UserDTO } from "./UserDTO";

// dtos/PodcasterDTO.ts
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
    public users?: UserDTO[];
    public subscribers?: SubscriptionDTO[]
  
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
      this.subscriptioncount = podcaster.subscriptioncount
      
      // Initialize nested DTOs if needed
      this.podcasts = podcaster.podcasts?.map((p: any) => new PodcastDTO(p));
      this.users = podcaster.users?.map((s: any) => new UserDTO(s));
      this.subscribers = podcaster.subscribers?.map((s: any) => new UserDTO(s));
    }
  }
  