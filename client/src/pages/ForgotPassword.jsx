import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import api from "../services/api";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/auth/forgot-password", { email });
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

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

        {!submitted ? (
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
            className="p-8 rounded-2xl border border-cyan-400/30 bg-black/40 backdrop-blur-md space-y-6"
          >
            <div>
              <h1 className="text-3xl font-bold mb-2">Forgot Password?</h1>
              <p className="text-zinc-400">
                Enter your email address and we'll send you a link to reset your password.
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
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-cyan-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
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
              {loading ? "Sending..." : "Send Reset Link"}
            </motion.button>

            <Link
              to="/login"
              className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition text-center justify-center w-full"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>
          </motion.form>
        ) : (
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
            <h2 className="text-2xl font-bold text-green-400">Check Your Email</h2>
            <p className="text-zinc-300">
              We've sent a password reset link to <span className="text-cyan-400 font-semibold">{email}</span>
            </p>
            <p className="text-sm text-zinc-500">
              The link expires in 1 hour. If you don't see it, check your spam folder.
            </p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/login")}
              className="w-full py-3 rounded-xl bg-gradient-neon text-white font-bold hover:shadow-glow transition mt-6"
            >
              Back to Login
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
