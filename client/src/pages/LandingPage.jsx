import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Zap,
  BarChart3,
  Shield,
  Users,
  Rocket,
  ArrowRight,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: CheckCircle,
      title: "Smart Task Management",
      description:
        "Organize tasks by priority, category, and due dates with powerful filtering",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description:
        "Track productivity with beautiful charts and real-time statistics",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Instant search, filter, and sort across all your tasks",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description:
        "Your data is encrypted and stored securely with user isolation",
    },
    {
      icon: Users,
      title: "Intuitive Design",
      description:
        "Modern UI with smooth animations and cyberpunk aesthetic",
    },
    {
      icon: Rocket,
      title: "Multiple Views",
      description:
        "Dashboard, Calendar, Kanban, and Timeline views for flexibility",
    },
  ];

  const stats = [
    { number: "6+", label: "View Modes" },
    { number: "100%", label: "Productivity Boost" },
    { number: "Real-time", label: "Sync" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white overflow-hidden">
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed w-full top-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold text-cyan-400"
          >
            TASK VAULT
          </motion.div>
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/login")}
              className="px-6 py-2 rounded-lg border border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 transition"
            >
              Login
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/register")}
              className="px-6 py-2 rounded-lg bg-gradient-neon text-white font-semibold hover:shadow-glow transition"
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Background blur effects */}
        <div className="absolute top-20 left-0 w-72 h-72 bg-cyan-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-40 right-0 w-72 h-72 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              Master Your{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Productivity
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto"
            >
              TaskVault is your ultimate task management solution with a
              futuristic cyberpunk design. Organize, track, and achieve your
              goals with powerful analytics and intuitive workflows.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 217, 255, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/register")}
                className="px-8 py-4 rounded-xl bg-gradient-neon text-white font-bold text-lg flex items-center justify-center gap-2 hover:shadow-glow transition"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, borderColor: "rgb(0, 217, 255)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/login")}
                className="px-8 py-4 rounded-xl border-2 border-white/20 text-white font-bold text-lg hover:border-cyan-400 transition"
              >
                Login to Account
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="grid grid-cols-3 gap-8 mt-20 pt-12 border-t border-white/10"
          >
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-cyan-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-zinc-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-slate-900/50 to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-zinc-400">
              Everything you need to stay productive and organized
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, borderColor: "rgb(0, 217, 255)" }}
                  className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition group"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-400 to-pink-400 flex items-center justify-center mb-4 group-hover:shadow-glow transition">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-zinc-400">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">Why Choose TaskVault?</h2>
              <div className="space-y-4">
                {[
                  "⚡ Lightning-fast performance with real-time updates",
                  "🔐 Enterprise-grade security for your data",
                  "📊 Advanced analytics to track your progress",
                  "🎨 Beautiful cyberpunk UI with smooth animations",
                  "📱 Works on desktop, tablet, and mobile devices",
                  "🚀 Deploy anywhere with our cloud-ready architecture",
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="text-lg text-zinc-300 flex items-start gap-3"
                  >
                    <span className="text-cyan-400 mt-1">✓</span>
                    {item}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="w-full rounded-2xl border-2 border-cyan-400/30 bg-gradient-to-br from-cyan-500/10 to-pink-500/10 backdrop-blur-md overflow-hidden group hover:border-cyan-400/60 transition p-6">
                <div className="space-y-4">
                  {/* Dashboard Header Simulation */}
                  <div className="flex justify-between items-center">
                    <div className="h-4 w-32 bg-gradient-neon rounded-lg" />
                    <div className="flex gap-2">
                      <div className="h-3 w-3 rounded-full bg-cyan-400/50" />
                      <div className="h-3 w-3 rounded-full bg-pink-400/50" />
                      <div className="h-3 w-3 rounded-full bg-purple-400/50" />
                    </div>
                  </div>

                  {/* Stats Cards Simulation */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="h-20 bg-white/5 rounded-lg border border-cyan-400/20 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-xs text-cyan-400 font-bold">12</div>
                        <div className="text-xs text-zinc-400">Tasks</div>
                      </div>
                    </div>
                    <div className="h-20 bg-white/5 rounded-lg border border-pink-400/20 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-xs text-pink-400 font-bold">8</div>
                        <div className="text-xs text-zinc-400">Complete</div>
                      </div>
                    </div>
                    <div className="h-20 bg-white/5 rounded-lg border border-purple-400/20 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-xs text-purple-400 font-bold">4</div>
                        <div className="text-xs text-zinc-400">Pending</div>
                      </div>
                    </div>
                  </div>

                  {/* Task Items Simulation */}
                  <div className="space-y-2">
                    <div className="h-2 bg-gradient-to-r from-cyan-400/30 to-transparent rounded-full" />
                    <div className="h-2 bg-gradient-to-r from-pink-400/20 to-transparent rounded-full" />
                    <div className="h-2 bg-gradient-to-r from-purple-400/20 to-transparent rounded-full" />
                  </div>

                  {/* Chart Visualization */}
                  <div className="flex items-end gap-1 h-16 justify-center">
                    <div className="flex-1 h-8 bg-gradient-to-t from-cyan-400/40 to-cyan-400/20 rounded-t" />
                    <div className="flex-1 h-12 bg-gradient-to-t from-pink-400/40 to-pink-400/20 rounded-t" />
                    <div className="flex-1 h-10 bg-gradient-to-t from-purple-400/40 to-purple-400/20 rounded-t" />
                  </div>
                </div>
                {/* Animated border */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/20 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition duration-500 animate-pulse rounded-2xl pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-cyan-500/5 via-transparent to-pink-500/5 pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="p-12 rounded-2xl border border-cyan-400/30 bg-black/40 backdrop-blur-md"
          >
            <h2 className="text-4xl font-bold mb-4">
              Ready to Boost Your Productivity?
            </h2>
            <p className="text-xl text-zinc-400 mb-8">
              Join thousands of users who are already managing their tasks
              efficiently with TaskVault.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 217, 255, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/register")}
              className="px-10 py-4 rounded-xl bg-gradient-neon text-white font-bold text-lg hover:shadow-glow transition"
            >
              Get Started Now
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="text-xl font-bold text-cyan-400 mb-2">
                TASK VAULT
              </div>
              <p className="text-zinc-400">
                Modern task management for the modern era.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-zinc-400">
                <li>
                  <button
                    onClick={() => navigate("/login")}
                    className="hover:text-cyan-400 transition"
                  >
                    Login
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/register")}
                    className="hover:text-cyan-400 transition"
                  >
                    Sign Up
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                {[Github, Twitter, Linkedin].map((Icon, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.2 }}
                    className="p-2 rounded-lg bg-white/10 hover:bg-cyan-400/20 transition"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-zinc-500">
            <p>&copy; 2026 TaskVault. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
