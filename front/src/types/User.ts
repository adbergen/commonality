import { Post } from '@/types/Post';

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
