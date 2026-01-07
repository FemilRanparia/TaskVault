import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, Bell, Download, Trash2, LogOut } from "lucide-react";

const UserSettings = ({ user, onLogout }) => {
  const [settings, setSettings] = useState({
    notifications: true,
    emailReminders: true,
    theme: "dark",
  });

  const handleExportData = () => {
    // Export user data as JSON
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "taskvault-settings.json";
    link.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto space-y-6"
    >
      {/* User Profile */}
      <motion.div
        className="rounded-2xl border border-white/10 bg-gradient-cyber p-6 backdrop-blur-xl"
      >
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5 text-cyan-400" />
          Profile
        </h2>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-cyan-400 block mb-1">
              NAME
            </label>
            <p className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white">
              {user?.name || "User"}
            </p>
          </div>
          <div>
            <label className="text-xs font-semibold text-cyan-400 block mb-1">
              EMAIL
            </label>
            <p className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white">
              {user?.email || "user@example.com"}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Preferences */}
      <motion.div
        className="rounded-2xl border border-white/10 bg-gradient-cyber p-6 backdrop-blur-xl"
      >
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-cyan-400" />
          Preferences
        </h2>
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={(e) =>
                setSettings({ ...settings, notifications: e.target.checked })
              }
              className="w-4 h-4 rounded"
            />
            <span className="text-white">Enable In-App Notifications</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.emailReminders}
              onChange={(e) =>
                setSettings({ ...settings, emailReminders: e.target.checked })
              }
              className="w-4 h-4 rounded"
            />
            <span className="text-white">Email Reminders</span>
          </label>
        </div>
      </motion.div>

      {/* Data Management */}
      <motion.div
        className="rounded-2xl border border-white/10 bg-gradient-cyber p-6 backdrop-blur-xl"
      >
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Download className="w-5 h-5 text-cyan-400" />
          Data Management
        </h2>
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={handleExportData}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 transition font-medium"
          >
            <Download className="w-4 h-4" />
            Export Settings
          </motion.button>
        </div>
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6"
      >
        <h2 className="text-xl font-bold text-red-400 mb-4">Danger Zone</h2>
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 transition font-medium"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UserSettings;
