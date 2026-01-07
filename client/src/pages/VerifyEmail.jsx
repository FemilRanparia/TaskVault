import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, AlertCircle, Loader } from "lucide-react";
import api from "../services/api";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading"); // loading, success, error
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");

      if (!token) {
        setStatus("error");
        setMessage("Invalid verification link");
        return;
      }

      try {
        const res = await api.post("/auth/verify-email", { token });
        setStatus("success");
        setMessage(res.data.message);
        
        // Store token and redirect to dashboard
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify({
          id: res.data.id,
          name: res.data.name,
          email: res.data.email,
          isEmailVerified: true
        }));

        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } catch (err) {
        setStatus("error");
        setMessage(err.response?.data?.message || "Email verification failed");
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md p-8 rounded-2xl border border-cyan-400/30 bg-black/40 backdrop-blur-md"
      >
        <div className="text-center">
          {status === "loading" && (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block mb-4"
              >
                <Loader className="w-12 h-12 text-cyan-400" />
              </motion.div>
              <h1 className="text-2xl font-bold mb-2">Verifying Email</h1>
              <p className="text-zinc-400">Please wait while we verify your email...</p>
            </>
          )}

          {status === "success" && (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="inline-block mb-4"
              >
                <CheckCircle className="w-12 h-12 text-green-400" />
              </motion.div>
              <h1 className="text-2xl font-bold mb-2 text-green-400">Email Verified!</h1>
              <p className="text-zinc-300 mb-4">{message}</p>
              <p className="text-sm text-zinc-500">Redirecting to dashboard...</p>
            </>
          )}

          {status === "error" && (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="inline-block mb-4"
              >
                <AlertCircle className="w-12 h-12 text-red-400" />
              </motion.div>
              <h1 className="text-2xl font-bold mb-2 text-red-400">Verification Failed</h1>
              <p className="text-zinc-300 mb-6">{message}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/login")}
                className="px-6 py-2 rounded-lg bg-gradient-neon text-white font-semibold hover:shadow-glow transition"
              >
                Back to Login
              </motion.button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyEmail;
