import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

@Schema({timestamps: true})
export class User {
	
  _id: ObjectId;

  @Prop({type: mongoose.Schema.Types.String})
  username: string;

  @Prop({type: mongoose.Schema.Types.String})
  email: string;

  @Prop({type: mongoose.Schema.Types.String})
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = HydratedDocument<User>;



