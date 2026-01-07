import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Zap } from "lucide-react";

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  if (!auth) return null;

  const { login } = auth;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-cyber relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            y: [0, 100, 0],
            x: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-neon opacity-10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, -100, 0],
            x: [0, -50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 opacity-10 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Card */}
        <div className="rounded-3xl border border-white/20 bg-gradient-cyber backdrop-blur-xl p-8 shadow-2xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-8"
          >
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-neon flex items-center justify-center shadow-glow">
                <Zap className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              TaskVault
            </h1>
            <p className="text-zinc-400 text-sm">
              Organize, track, and achieve your goals
            </p>
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-300 text-sm text-center"
            >
              {error}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="text-xs font-semibold text-cyan-400 mb-2 block">
                EMAIL ADDRESS
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-cyan-400/50" />
                <input
                  type="email"
                  required
                  className="w-full rounded-xl bg-black/40 border border-white/20 pl-12 pr-4 py-3 text-white placeholder-zinc-600 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </motion.div>

            {/* Password Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="text-xs font-semibold text-cyan-400 mb-2 block">
                PASSWORD
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-cyan-400/50" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full rounded-xl bg-black/40 border border-white/20 pl-12 pr-12 py-3 text-white placeholder-zinc-600 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-zinc-400 hover:text-white transition"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              type="submit"
              className="w-full mt-6 py-3 rounded-xl bg-gradient-neon hover:opacity-90 transition font-semibold text-white shadow-glow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/10" />
            <span className="text-xs text-zinc-500">OR</span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/10" />
          </div>

          {/* Sign Up Link */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center text-sm text-zinc-400"
          >
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-cyan-400 hover:text-cyan-300 font-semibold transition"
            >
              Create one now
            </Link>
          </motion.p>

          {/* Forgot Password Link */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="text-center text-sm text-zinc-500 mt-2"
          >
            <Link
              to="/forgot-password"
              className="text-pink-400 hover:text-pink-300 font-semibold transition"
            >
              Forgot your password?
            </Link>
          </motion.p>
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-xs text-zinc-600 mt-6"
        >
          Secure. Personal. Yours.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Login;
