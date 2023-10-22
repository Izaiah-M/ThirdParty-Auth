import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  firstName: string;
  lastName: string;
  profilePicture?: string;
  phoneNumber: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model<IUser>("User", userSchema);

export { User };
