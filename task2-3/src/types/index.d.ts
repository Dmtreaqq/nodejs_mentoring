import { User } from './User';

declare global {
    namespace Express {
        export interface Request {
            user: User
        }
    }
}
