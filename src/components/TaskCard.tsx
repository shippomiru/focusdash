import { useState, useEffect } from 'react';
import { useStore } from '../store';
import { Timer, Sparkles, PartyPopper as Party, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { translations } from '../types';

const celebrationMessages = {
  en: [
    "🎉 Incredible achievement! You've conquered this task!",
    "⭐ Amazing work! Your dedication shines through!",
    "🌟 Phenomenal job! You're unstoppable!",
    "🎊 Brilliant success! Keep soaring higher!",
    "✨ Outstanding performance! You're making magic happen!"
  ],
  zh: [
    "🎉 太棒了！你成功完成了这个任务！",
    "⭐ 出色的工作！你的专注令人印象深刻！",
    "🌟 惊人的表现！你势不可挡！",
    "🎊 辉煌的成功！继续攀登高峰！",
    "✨ 卓越的表现！你正在创造奇迹！"
  ]
};

export function TaskCard() {
  const { currentTask, updateProgress, completeTask, setBreakMode, setCurrentTask, cancelTask, settings } = useStore();
  const [elapsed, setElapsed] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showNextTaskInput, setShowNextTaskInput] = useState(false);
  const [nextTaskInput, setNextTaskInput] = useState('');
  const [celebrationMessage, setCelebrationMessage] = useState('');

  const t = translations[settings.language];
  const messages = celebrationMessages[settings.language];

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentTask) {
        setElapsed(Math.floor(
          (Date.now() - currentTask.startTime.getTime()) / 1000
        ));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [currentTask]);

  const handleProgressUpdate = () => {
    const newProgress = Math.min(100, currentTask.progress + 10);
    updateProgress(newProgress);
    
    if (newProgress === 100) {
      const message = messages[Math.floor(Math.random() * messages.length)];
      setCelebrationMessage(message);
      setShowCelebration(true);
      setTimeout(() => {
        setShowNextTaskInput(true);
      }, 1000);
    }
  };

  const handleNextTask = () => {
    if (!nextTaskInput.trim()) return;
    
    completeTask();
    setCurrentTask({
      id: Date.now().toString(),
      name: nextTaskInput,
      progress: 0,
      startTime: new Date(),
      totalWorkTime: 0,
      lastBreakTime: null
    });
    setNextTaskInput('');
    setShowNextTaskInput(false);
    setShowCelebration(false);
  };

  const handleBreak = () => {
    if (currentTask.progress < 100) {
      setBreakMode(true, currentTask.name);
    }
  };

  if (!currentTask) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    return `${mins}m`;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex flex-col items-center justify-center px-4"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-md mx-auto shadow-2xl relative"
        >
          {currentTask.progress < 100 ? (
            <>
              <div className="flex justify-between items-start mb-6 sm:mb-8">
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
                >
                  {currentTask.name}
                </motion.h2>
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={handleBreak}
                  className="text-xs sm:text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {t.break}
                </motion.button>
              </div>

              <div className="space-y-5">
                <div className="space-y-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                      {currentTask.progress}%
                    </span>
                    <span className="text-xs sm:text-sm text-gray-500 flex items-center gap-1">
                      <Timer className="w-3 h-3 sm:w-4 sm:h-4" />
                      {formatTime(elapsed)}
                    </span>
                  </div>
                  <div className="relative h-3 sm:h-4 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${currentTask.progress}%` }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                  </div>
                  
                  <motion.button
                    onClick={handleProgressUpdate}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl py-2.5 sm:py-3 text-sm sm:text-base font-medium hover:shadow-lg transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {t.updateProgress}
                  </motion.button>
                </div>
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-4"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="inline-block mb-4 sm:mb-6"
              >
                <Party className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-500" />
              </motion.div>
              
              <motion.p
                className="text-base sm:text-xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent mb-6 sm:mb-8"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                {celebrationMessage}
              </motion.p>

              <AnimatePresence>
                {showNextTaskInput && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-3 sm:space-y-4"
                  >
                    <input
                      type="text"
                      value={nextTaskInput}
                      onChange={(e) => setNextTaskInput(e.target.value)}
                      placeholder={t.whatToFocus}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border-0 rounded-xl text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                      autoFocus
                    />
                    <motion.button
                      onClick={handleNextTask}
                      className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl py-2.5 sm:py-3 text-sm sm:text-base font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>{t.startFocus}</span>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
          
          <AnimatePresence>
            {showCelebration && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 pointer-events-none"
              >
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                    initial={{
                      opacity: 1,
                      scale: 0,
                      x: '50%',
                      y: '50%'
                    }}
                    animate={{
                      opacity: 0,
                      scale: 1,
                      x: `${Math.random() * 100}%`,
                      y: `${Math.random() * 100}%`,
                    }}
                    transition={{
                      duration: 1,
                      ease: 'easeOut',
                      delay: Math.random() * 0.2,
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={cancelTask}
          className="mt-4 px-5 sm:px-6 py-2.5 sm:py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl text-sm sm:text-base font-medium hover:bg-white/20 transition-all flex items-center gap-2"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>{t.cancelTask}</span>
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
}