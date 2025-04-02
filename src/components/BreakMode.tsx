import { useState, useEffect } from 'react';
import { useStore } from '../store';
import { Timer, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function BreakMode() {
  const { isBreakMode, breakTask, setBreakMode } = useStore();
  const [breakStartTime, setBreakStartTime] = useState<Date | null>(null);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (isBreakMode) {
      setBreakStartTime(new Date());
      setElapsed(0);
      const timer = setInterval(() => {
        setElapsed(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setBreakStartTime(null);
      setElapsed(0);
    }
  }, [isBreakMode]);

  if (!isBreakMode) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl"
        >
          <div className="text-center">
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                Break Time
              </h2>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-600 mb-8 text-lg"
            >
              Take a moment to recharge!
              {breakTask && (
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="block mt-2 font-medium text-amber-500"
                >
                  Remember to: {breakTask}
                </motion.span>
              )}
            </motion.p>
            
            <motion.div
              className="inline-flex items-center justify-center space-x-3 text-2xl mb-8 px-6 py-3 bg-gray-50 rounded-xl"
              whileHover={{ scale: 1.05 }}
            >
              <Timer className="w-6 h-6 text-amber-500" />
              <span className="font-mono">{formatTime(elapsed)}</span>
            </motion.div>
            
            <motion.button
              onClick={() => setBreakMode(false)}
              className="flex items-center justify-center space-x-2 mx-auto px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:shadow-lg transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Return to Focus</span>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}