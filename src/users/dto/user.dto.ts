import { Types } from 'mongoose';
import {z} from 'zod';

export const UserSchema = z.object({
    id: z.string().optional(),
    username: z.string(),
    email: z.string(),
    password: z.string(),

});


export type UserDto = z.infer<typeof UserSchema>;