import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, AlertCircle, CheckCircle } from "lucide-react";
import api from "../services/api";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("form"); // form, success, error
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const token = searchParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!newPassword || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/auth/reset-password", {
        token,
        newPassword
      });
      setStatus("success");
      setMessage(res.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setStatus("error");
      setError(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md p-8 rounded-2xl border border-red-400/30 bg-black/40 backdrop-blur-md text-center"
        >
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-red-400 mb-2">Invalid Link</h1>
          <p className="text-zinc-300">The password reset link is missing or invalid.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/forgot-password")}
            className="mt-6 w-full py-2 rounded-lg bg-gradient-neon text-white font-semibold"
          >
            Request New Link
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-block text-2xl font-bold text-cyan-400 mb-4"
          >
            TASK VAULT
          </motion.div>
        </div>

        {status === "form" && (
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
            className="p-8 rounded-2xl border border-cyan-400/30 bg-black/40 backdrop-blur-md space-y-6"
          >
            <div>
              <h1 className="text-3xl font-bold mb-2">Reset Password</h1>
              <p className="text-zinc-400">
                Enter your new password below.
              </p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg bg-red-500/20 border border-red-500/30 text-red-200"
              >
                {error}
              </motion.div>
            )}

            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-cyan-400" />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  placeholder="Enter new password"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-black/40 border border-white/20 text-white placeholder-zinc-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-cyan-400" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Confirm password"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-black/40 border border-white/20 text-white placeholder-zinc-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-neon text-white font-bold hover:shadow-glow transition disabled:opacity-50"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </motion.button>
          </motion.form>
        )}

        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-2xl border border-green-400/30 bg-black/40 backdrop-blur-md text-center space-y-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto" />
            </motion.div>
            <h2 className="text-2xl font-bold text-green-400">Password Reset</h2>
            <p className="text-zinc-300">{message}</p>
            <p className="text-sm text-zinc-500">Redirecting to login...</p>
          </motion.div>
        )}

        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-2xl border border-red-400/30 bg-black/40 backdrop-blur-md text-center space-y-4"
          >
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto" />
            <h2 className="text-2xl font-bold text-red-400">Reset Failed</h2>
            <p className="text-zinc-300">{error}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/forgot-password")}
              className="w-full py-2 rounded-lg bg-gradient-neon text-white font-semibold"
            >
              Request New Link
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ResetPassword;
