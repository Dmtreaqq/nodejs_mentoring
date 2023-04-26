import { Group } from '../../types/Group';

export const group: Group = {
    id: '1',
    name: 'ADMIN',
    permissions: ['READ', 'DELETE', 'WRITE', 'SHARE', 'UPLOAD_FILES']
};

export const groups: Group[] = [
    {
        id: '1',
        name: 'ADMIN',
        permissions: ['READ', 'DELETE', 'WRITE', 'SHARE', 'UPLOAD_FILES']
    },
    {
        id: '2',
        name: 'SEMI-ADMIN',
        permissions: ['READ', 'DELETE', 'SHARE', 'UPLOAD_FILES']
    },
    {
        id: '3',
        name: 'MOD',
        permissions: ['READ', 'DELETE', 'WRITE']
    },
    {
        id: '4',
        name: 'USER',
        permissions: ['READ', 'UPLOAD_FILES']
    }
];
