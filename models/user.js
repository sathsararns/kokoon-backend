import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },

  role: {
    type: String,
    enum: ["customer", "provider", "admin"],
    default: "customer"
  },

  // provider extra fields
  businessName: String,
  description: String,
  category: String,
  serviceRadius: Number,
  address: String,

  isAdmin: { type: Boolean, default: false },
  isBlocked: { type: Boolean, default: false },
  isEmailVerified: { type: Boolean, default: false },

  image: { type: String, default: "/default-profile.png" }
});

export default mongoose.model("User", userSchema);