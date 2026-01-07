import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, X, Plus } from "lucide-react";

const TaskNotes = ({ taskId, onNotesUpdate }) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleAddNote = () => {
    if (!newNote.trim()) return;

    const note = {
      id: Date.now(),
      text: newNote,
      timestamp: new Date().toLocaleString(),
    };

    const updatedNotes = [...notes, note];
    setNotes(updatedNotes);
    setNewNote("");
    onNotesUpdate?.(updatedNotes);
  };

  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter((n) => n.id !== id);
    setNotes(updatedNotes);
    onNotesUpdate?.(updatedNotes);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-cyan-400">
          <FileText className="w-4 h-4" />
          Notes ({notes.length})
        </h3>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-xs text-zinc-400 hover:text-white transition"
        >
          {isOpen ? "Hide" : "Add Note"}
        </button>
      </div>

      {isOpen && (
        <div className="space-y-3 mb-3">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add a note..."
            className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/20 text-white text-sm placeholder-zinc-500 focus:ring-2 focus:ring-cyan-500 resize-none"
            rows="3"
          />
          <button
            onClick={handleAddNote}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 transition text-sm font-medium"
          >
            <Plus className="w-3 h-3" />
            Add Note
          </button>
        </div>
      )}

      <div className="space-y-2 max-h-40 overflow-y-auto">
        {notes.map((note) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="p-2 rounded-lg bg-white/5 border border-white/10 group"
          >
            <div className="flex justify-between items-start gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-zinc-300 break-words">{note.text}</p>
                <p className="text-xs text-zinc-500 mt-1">{note.timestamp}</p>
              </div>
              <button
                onClick={() => handleDeleteNote(note.id)}
                className="opacity-0 group-hover:opacity-100 transition text-red-400 hover:text-red-300"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TaskNotes;
