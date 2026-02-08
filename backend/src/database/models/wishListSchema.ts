import mongoose from "mongoose";

const wishListSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    status: { type: String, enum: ["pending", "replied"], default: "pending" },
  },
  { timestamps: true, versionKey: false },
);

// const Users = mongoose.model("users", userSchema); wht thias commented i am not taking default db
export { wishListSchema };
