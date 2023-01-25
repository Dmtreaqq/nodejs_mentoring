import { Permission } from './Permission';

export type Group = {
    id: string;
    name: string;
    permissions: Array<Permission>
}
