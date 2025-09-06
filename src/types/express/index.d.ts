import { User } from 'better-auth';

declare global {
  namespace Express {
    interface Request {
      user: User; // or a custom User type
    }
  }
}
