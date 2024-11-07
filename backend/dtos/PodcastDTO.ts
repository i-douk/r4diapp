import { FollowingDTO } from "./FollowingDTO";
import { PodcasterDTO } from "./PodcasterDTO";
import { UserDTO } from "./UserDTO";

// dtos/podcastDTO.ts
export class PodcastDTO {
    public id: number;
    public name: string;
    public description?: string;
    public followcount?: number;
    public avatar_url: string | null;
    public created_at: string;
    public updated_at: string;
    public transcribed: boolean;
    public urls: string[];
    public slug?: string;
    public podcaster : PodcasterDTO;
    public followers?: UserDTO[];
    public following?: FollowingDTO;
    
    constructor(podcast: any) {
      this.id = podcast.id;
      this.transcribed = podcast.transcribed;
      this.name = podcast.name;
      this.urls = podcast.urls;
      this.avatar_url = podcast.avatar_url;
      this.updated_at = podcast.updated_at;
      this.created_at = podcast.created_at;
      this.following = podcast.following;
      this.podcaster = podcast.podcaster;
      this.followers = podcast.followers?.map((s: any) => new UserDTO(s));
    }
  }
  