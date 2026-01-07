const nodemailer = require("nodemailer");

// Create email transporter - handle missing credentials gracefully
let transporter = null;

if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
  try {
    transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    console.log("✅ Email service initialized");
    
    // Verify connection asynchronously
    transporter.verify((error, success) => {
      if (error) {
        console.log("⚠️  Email service connection error:", error.message);
        console.log("💡 Tip: Check your Gmail App Password in .env file");
        console.log("💡 Make sure to use a 16-character App Password from Google Account");
      } else if (success) {
        console.log("✅ Email service verified and ready");
      }
    });
  } catch (error) {
    console.log("⚠️  Email service error:", error.message);
  }
} else {
  console.log("⚠️  Email credentials not found in .env - Email features disabled");
  console.log("📧 To enable email: Add EMAIL_USER and EMAIL_PASSWORD to .env");
}

const sendVerificationEmail = async (email, name, verificationToken) => {
  // If email service not configured, skip silently
  if (!transporter) {
    console.log("ℹ️  Email service disabled - verification email not sent");
    return { success: true, message: "Account created (email verification disabled)" };
  }

  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify Your Email - TaskVault",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #00d9ff 0%, #b366ff 100%); padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">TASK VAULT</h1>
        </div>
        <div style="background: #0a0e27; color: white; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2>Welcome, ${name}!</h2>
          <p>Thank you for signing up to TaskVault. Please verify your email address to complete your registration.</p>
          <div style="margin: 30px 0; text-align: center;">
            <a href="${verificationUrl}" style="background: linear-gradient(135deg, #00d9ff 0%, #b366ff 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
              Verify Email Address
            </a>
          </div>
          <p>Or copy this link in your browser:</p>
          <p style="word-break: break-all; background: rgba(0, 217, 255, 0.1); padding: 10px; border-radius: 5px; color: #00d9ff;">
            ${verificationUrl}
          </p>
          <p style="margin-top: 30px; color: #b366ff; font-size: 12px;">
            This link expires in 24 hours.
          </p>
        </div>
      </div>
    `
  };

  try {
    console.log("📧 Attempting to send verification email to:", email);
    console.log("📧 Verification URL:", verificationUrl);
    console.log("📤 Using transporter:", transporter ? "YES" : "NO");
    
    const info = await transporter.sendMail(mailOptions);
    
    console.log("✅ Email sent successfully!");
    console.log("📨 Message ID:", info.messageId);
    console.log("📨 Response:", info.response);
    
    return { success: true, message: "Verification email sent successfully", messageId: info.messageId };
  } catch (error) {
    console.error("❌ Error sending verification email:", error.message);
    console.error("❌ Full error:", error);
    return { success: false, message: "Failed to send verification email", error: error.message };
  }
};

const sendPasswordResetEmail = async (email, name, resetToken) => {  // If email service not configured, skip silently
  if (!transporter) {
    console.log("ℹ️  Email service disabled - password reset email not sent");
    return { success: true, message: "Reset link generated (email disabled)" };
  }
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Reset Your Password - TaskVault",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #00d9ff 0%, #b366ff 100%); padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">TASK VAULT</h1>
        </div>
        <div style="background: #0a0e27; color: white; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2>Password Reset Request</h2>
          <p>Hi ${name},</p>
          <p>We received a request to reset your password. Click the button below to create a new password.</p>
          <div style="margin: 30px 0; text-align: center;">
            <a href="${resetUrl}" style="background: linear-gradient(135deg, #ff006e 0%, #b366ff 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
              Reset Password
            </a>
          </div>
          <p>Or copy this link in your browser:</p>
          <p style="word-break: break-all; background: rgba(0, 217, 255, 0.1); padding: 10px; border-radius: 5px; color: #00d9ff;">
            ${resetUrl}
          </p>
          <p style="margin-top: 30px; color: #ff006e; font-size: 12px;">
            This link expires in 1 hour. If you didn't request this, please ignore this email.
          </p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: "Password reset email sent successfully" };
  } catch (error) {
    console.error("Error sending password reset email:", error);
    return { success: false, message: "Failed to send password reset email" };
  }
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail
};
