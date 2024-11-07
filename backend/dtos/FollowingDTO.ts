export class FollowingDTO {
    public id: number;
    public userId: number;
    public podcastId: number;
    public starred: boolean;
  
    constructor(following: any) {
      this.id = following.id;
      this.userId = following.userId;
      this.podcastId = following.podcastId;
      this.starred = following.starred;

    }
  }
  