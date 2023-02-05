import { Post } from './Post';
import User from './User';

export interface Comment {
  id?: number;
  text: string;
  post?: PostId;
  author: User;
  createdAt: string;
}

interface PostId {
  id: number;
}
