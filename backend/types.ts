// import { z } from 'zod';

export interface FullPodcaster {
    id: number;
    username: string;
    name: string;
    password: string;
    premium: boolean;
    verified: boolean;
    disabled: boolean;
    created_at: Date;
    updated_at: Date;
    subscriptioncount: number;
  }

export interface PublicPodcaster extends Omit<FullPodcaster, 'password'> {}

export interface FullUser {
    id: number;
    username: string;
    name: string;
    password: string;
    role: 'admin' | 'user' | 'superuser'; 
    verified?: boolean;
    disabled?: boolean;
    created_at?: Date;
    updated_at?: Date;
    podcaster_id?: number;
    podcast_id?: number;
  }

export interface PublicUser extends Omit<FullUser, 'password' | 'role'> {}

export interface Podcast {
    id: number;
    name: string;
    urls: string[];
    transcribed: boolean;
    disabled?: boolean;
    description?: string;
    podcaster_id: number;
    created_at: Date;
    updated_at: Date;
    followcount: number;
  }

  
export interface Following {
    id: number;
    user_id: number;   
    podcast_id: number;
    starred: boolean;  
}

export interface Subscription {
    id: number;
    user_id: number;
    podcaster_id: number;
    paid: boolean;
  }
  