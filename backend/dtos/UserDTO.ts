import { PodcasterDTO } from "./PodcasterDTO";
import { PodcastDTO } from "./PodcastDTO";
import { FollowingDTO } from "./FollowingDTO";
import { SubscriptionDTO } from "./SubscriptionDTO";

export enum Role {
  ADMIN = "admin",
  USER = "user",
  SUPERUSER = "superuser",
}
// dtos/PodcasterDTO.ts
export class UserDTO {
  public id: number;
  public name: string;
  public disabled?: boolean;
  public avatar_url: string | null;
  public created_at: string;
  public updated_at: string;
  public verified: boolean;
  public role: Role;
  public subscriptions?: PodcasterDTO[];
  public subscription?: SubscriptionDTO;
  public followings?: PodcastDTO[];
  public following?: FollowingDTO;

  constructor(user: any) {
    this.id = user.id;
    this.name = user.name;
    this.role = user.role;
    this.disabled = user.disabled;
    this.avatar_url = user.avatar_url;
    this.updated_at = user.updated_at;
    this.created_at = user.created_at;
    this.verified = user.verified;
    this.following = user.following;
    this.subscription = user.subscription;
    this.subscriptions = user.subscriptions?.map(
      (s: any) => new PodcasterDTO(s),
    );
    this.followings = user.followings?.map((s: any) => new PodcastDTO(s));
  }
}
