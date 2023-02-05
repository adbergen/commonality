import { Post } from '@/models/Post';

export default interface User {
  id: number;
  email?: string;
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  role?: { name: string };
  posts?: Post[];
}
