import { FollowingDTO } from "./FollowingDTO";
import { PodcasterDTO } from "./PodcasterDTO";

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
  
    // Optionally, include related data if needed
    public podcaster?: PodcasterDTO;
    public followers?: FollowingDTO[];
  
    constructor(podcast: any) {
      this.id = podcast.id;
      this.transcribed = podcast.transcribed;
      this.name = podcast.name;
      this.urls = podcast.urls;
      this.avatar_url = podcast.avatar_url;
      this.updated_at = podcast.updated_at;
      this.created_at = podcast.created_at;
      
      // Initialize nested DTOs if needed
      this.podcaster = podcast.podcaster?.map((p: any) => new PodcasterDTO(p));
      this.followers = podcast.followers?.map((s: any) => new FollowingDTO(s));
    }
  }
  