import User from './User';
import Comment from './Comment';

export interface Post {
  id?: number;
  text: string;
  user: User;
  comments?: Comment;
  createdAt: string;
}

export type Posts = Array<Post>;
