import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

@Schema({timestamps: true})
export class User {
  @Prop({type: mongoose.Schema.Types.String})
  username: string;

  @Prop({type: mongoose.Schema.Types.String})
  email: string;

  @Prop({type: mongoose.Schema.Types.String})
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = HydratedDocument<User>;



