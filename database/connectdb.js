import mongoose from "mongoose";

try {
  await mongoose.connect(process.env.URI);
  console.log("OK BD");
} catch (error) {
  console.log(error);
}
