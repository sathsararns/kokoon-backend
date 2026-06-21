import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function createUser(req, res) {
  try {
    const existing = await User.findOne({ email: req.body.email });

    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const passwordHash = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: passwordHash,
      role: req.body.role, // 👈 IMPORTANT

      // provider fields
      businessName: req.body.businessName,
      description: req.body.description,
      category: req.body.category,
      serviceRadius: req.body.serviceRadius,
      address: req.body.address
    });

    await newUser.save();

    res.status(201).json({
      message: "User created successfully"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
        isAdmin: user.isAdmin
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      role: user.role,
      isAdmin: user.isAdmin
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getProfile(req, res) {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json(user);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}