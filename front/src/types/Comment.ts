import { Post } from './Post';
import User from './User';

export interface Comment {
  id?: number;
  text: string;
  post?: Post;
  author: User;
}

export type Comments = Array<Comment>;
