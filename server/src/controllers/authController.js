const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { sendVerificationEmail, sendPasswordResetEmail } = require("../services/emailService");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d"
  });
};

const generateRandomToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

exports.registerUser = async (req, res) => {
  try {
    console.log("📝 Register attempt - Body:", req.body);
    
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      console.log("❌ Missing fields");
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    console.log("🔍 Checking if user exists:", email);
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log("❌ User already exists:", email);
      return res.status(400).json({ message: "User already exists" });
    }

    console.log("🔐 Hashing password...");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log("💾 Creating user in database...");
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      isEmailVerified: true  // Always verified for simple flow
    });

    console.log("✅ User created:", user._id);

    // Generate JWT token
    const token = generateToken(user._id);
    console.log("✅ Token generated, sending response...");

    res.status(201).json({
      message: "Registration successful!",
      token,
      id: user._id,
      name: user.name,
      email: user.email
    });
  } catch (error) {
    console.error("❌ Registration error:", error.message);
    res.status(500).json({ message: "Registration failed: " + error.message });
  }
};

exports.verifyEmail = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: "Verification token is required" });
  }

  const user = await User.findOne({
    emailVerificationToken: token,
    emailVerificationExpires: { $gt: Date.now() }
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid or expired verification token" });
  }

  user.isEmailVerified = true;
  user.emailVerificationToken = null;
  user.emailVerificationExpires = null;
  await user.save();

  res.json({
    message: "Email verified successfully! You can now login.",
    id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id)
  });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please provide email and password" });
  }

  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Check if email is verified
  if (!user.isEmailVerified) {
    return res.status(403).json({ 
      message: "Please verify your email before logging in",
      email: user.email
    });
  }

  res.json({
    id: user._id,
    name: user.name,
    email: user.email,
    isEmailVerified: user.isEmailVerified,
    token: generateToken(user._id)
  });
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Please provide your email" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    // For security, don't reveal if user exists
    return res.status(200).json({ 
      message: "If an account exists with this email, a password reset link has been sent" 
    });
  }

  // Generate password reset token
  const passwordResetToken = generateRandomToken();
  const passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  user.passwordResetToken = passwordResetToken;
  user.passwordResetExpires = passwordResetExpires;
  await user.save();

  // Send password reset email
  const emailResult = await sendPasswordResetEmail(email, user.name, passwordResetToken);

  if (emailResult.success) {
    res.json({ 
      message: "Password reset link has been sent to your email" 
    });
  } else {
    res.status(500).json({ 
      message: "Failed to send password reset email. Please try again." 
    });
  }
};

exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ message: "Token and new password are required" });
  }

  const user = await User.findOne({
    passwordResetToken: token,
    passwordResetExpires: { $gt: Date.now() }
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid or expired reset token" });
  }

  // Hash new password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  user.password = hashedPassword;
  user.passwordResetToken = null;
  user.passwordResetExpires = null;
  await user.save();

  res.json({
    message: "Password has been reset successfully. You can now login with your new password.",
    id: user._id,
    name: user.name,
    email: user.email
  });
};

exports.getMe = async (req, res) => {
  res.json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    isEmailVerified: req.user.isEmailVerified
  });
};
