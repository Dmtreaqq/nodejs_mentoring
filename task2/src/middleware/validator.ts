import { ContainerTypes, createValidator, ValidatedRequestSchema } from 'express-joi-validation';
import { User } from '../types/User';

export const validator = createValidator();

export interface UserRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: User
}
