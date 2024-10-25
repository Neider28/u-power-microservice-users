import { Types } from 'mongoose';

export interface UserI {
  _id: Types.ObjectId;
  googleId: string;
  email: string;
  personalId: string;
  status: string;
  role: string;
}
