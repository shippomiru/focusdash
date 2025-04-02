import React, { useState, useEffect } from 'react';
import { useStore } from './store';
import { TaskCard } from './components/TaskCard';
import { BreakMode } from './components/BreakMode';
import { History } from './components/History';
import { Settings } from './components/Settings';
import { Navigation } from './components/Navigation';
import { Reminders } from './components/Reminders';
import { Help } from './components/Help';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { translations } from './types';

function App() {
  const [taskInput, setTaskInput] = useState('');
  const [currentPage, setCurrentPage] = useState('main');
  const { setCurrentTask, currentTask, settings } = useStore();

  useEffect(() => {
    console.log('App mounted');
    console.log('Current settings:', settings);
    console.log('Current task:', currentTask);
  }, []);

  const t = translations[settings.language];

  const subtitleMessages = [
    "Guard your flow, master Your day.",
    "Track progress, build momentum."
  ];

  const inputPlaceholders = [
    "What would you like to focus on?",
    "What's your mission for the next 30 minutes?"
  ];

  const randomSubtitle = subtitleMessages[Math.floor(Math.random() * subtitleMessages.length)];
  const randomPlaceholder = inputPlaceholders[Math.floor(Math.random() * inputPlaceholders.length)];

  const startTask = () => {
    if (!taskInput.trim()) return;
    
    setCurrentTask({
      id: Date.now().toString(),
      name: taskInput,
      progress: 0,
      startTime: new Date(),
      totalWorkTime: 0,
      lastBreakTime: null
    });
    setTaskInput('');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'history':
        return <History />;
      case 'settings':
        return <Settings />;
      case 'help':
        return <Help />;
      default:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 mb-8 max-w-2xl mx-auto"
          >
            <motion.div 
              className="text-center mb-6 sm:mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-2xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 sm:mb-3">
                FocusDash
              </h1>
              <p className="text-base sm:text-base text-gray-600">
                {currentTask ? `${t.currentlyFocusing} ${currentTask.name}` : t.trackProgress}
              </p>
            </motion.div>
            
            {!currentTask && (
              <div className="space-y-4 sm:space-y-6">
                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <input
                      type="text"
                      value={taskInput}
                      onChange={(e) => setTaskInput(e.target.value)}
                      placeholder={t.whatToFocus}
                      className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border-0 rounded-xl text-base sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                    <motion.button
                      onClick={startTask}
                      className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium text-base sm:text-base hover:shadow-lg transition-all flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>{t.startFocus}</span>
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-4 sm:py-8 px-3 sm:px-4 flex flex-col">
      <div className="flex-grow max-w-4xl mx-auto w-full">
        {renderPage()}
      </div>

      {!currentTask && (
        <div className="fixed bottom-0 left-0 right-0 z-10">
          <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
        </div>
      )}

      <TaskCard />
      <BreakMode />
      <Reminders />
    </div>
  );
}

export default App;