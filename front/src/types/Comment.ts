import { Post } from './Post';

export default interface Comment {
  text: string;
  post: Post;
}
