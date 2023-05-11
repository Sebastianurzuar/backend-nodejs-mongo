import mongoose from "mongoose";
const { Schema, model } = mongoose;
import bcryptjs from 'bcryptjs';

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.methods.encryptPassword = (password) => {
  return bcryptjs.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.comparePassword = async function (canditatePassword) {
  return await bcryptjs.compare(canditatePassword, this.password);
};

export const User = model("Usuario", userSchema);
