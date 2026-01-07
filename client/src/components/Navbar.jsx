import { motion } from "framer-motion";
import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/10 bg-gradient-cyber">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-neon flex items-center justify-center shadow-glow group-hover:shadow-lg transition-shadow">
              <span className="text-white font-bold text-lg">⚡</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">TaskVault</h1>
              <p className="text-xs text-cyan-400">Productivity Hub</p>
            </div>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {user && (
              <>
                <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                  <div className="w-8 h-8 rounded-full bg-gradient-neon flex items-center justify-center text-white font-semibold text-sm">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{user.name}</p>
                    <p className="text-xs text-zinc-400">{user.email}</p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 border border-red-500/30 transition"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </motion.button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? "auto" : 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden mt-4 border-t border-white/10 pt-4"
        >
          {user && (
            <div className="space-y-3">
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                <div className="w-8 h-8 rounded-full bg-gradient-neon flex items-center justify-center text-white font-semibold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{user.name}</p>
                  <p className="text-xs text-zinc-400">{user.email}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsOpen(false);
                  onLogout();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30 transition hover:bg-red-500/30"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;
