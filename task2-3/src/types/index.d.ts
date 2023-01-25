import { User } from './User';
import { Group } from './Group';

declare global {
    namespace Express {
        export interface Request {
            user: User
            group: Group
        }
    }
}
