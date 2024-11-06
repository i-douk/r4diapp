import { PodcasterDTO } from "./PodcasterDTO";
import { PodcastDTO } from "./PodcastDTO";

export enum Role {
    ADMIN = 'admin',
    USER = 'user',
    SUPERUSER = 'superuser',
}
// dtos/PodcasterDTO.ts
export class UserDTO {
    public id: number;
    public username: string;
    public name: string;
    public disabled?: boolean;
    public avatar_url: string | null;
    public created_at: string;
    public updated_at: string;
    public verified: boolean;
    public role: Role;

  
    // Optionally, include related data if needed
 
    public subscriptions?: PodcasterDTO[];
    public followings?: PodcastDTO[];
  
    constructor(user: any) {
      this.id = user.id;
      this.username = user.username;
      this.name = user.name;
      this.role = user.role;
      this.disabled = user.disabled;
      this.avatar_url = user.avatar_url;
      this.updated_at = user.updated_at;
      this.created_at = user.created_at;
      this.verified = user.verified;
      
      // Initialize nested DTOs if needed

      this.subscriptions = user.subscriptions?.map((s: any) => new PodcasterDTO(s));
      this.followings = user.subscriptions?.map((s: any) => new PodcastDTO(s));
    }
  }
  