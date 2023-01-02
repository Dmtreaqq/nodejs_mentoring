import { User } from './User';

export {};

declare global {
    namespace Express {
        export interface Request {
            user: User
        }
    }
}
