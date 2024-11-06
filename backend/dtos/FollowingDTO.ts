export class FollowingDTO {
    public id: number;
    public userId: string;
    public podcastId: string;
    public starred: boolean;
  
    constructor(following: any) {
      this.id = following.id;
      this.userId = following.userId;
      this.podcastId = following.podcastId;
      this.starred = following.starred;

    }
  }
  