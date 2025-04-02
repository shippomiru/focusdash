import { Home, History as HistoryIcon, Settings as SettingsIcon, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStore } from '../store';
import { translations } from '../translations';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const { settings } = useStore();
  const t = translations[settings.language];

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex flex-col items-center gap-4 p-3 sm:p-6"
    >
      <motion.div className="flex items-center gap-1 sm:gap-2 bg-white/80 backdrop-blur-lg p-1.5 sm:p-2 rounded-full shadow-lg border border-gray-100 overflow-x-auto max-w-full mx-auto">
        <button
          onClick={() => onNavigate('main')}
          className={`p-2 sm:p-3 rounded-full flex items-center gap-1.5 sm:gap-2 transition-all whitespace-nowrap ${
            currentPage === 'main' 
              ? 'bg-blue-500 text-white' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Home className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className={`text-xs sm:text-sm font-medium ${currentPage === 'main' ? '' : 'text-gray-600'}`}>
            {t.home}
          </span>
        </button>

        <button
          onClick={() => onNavigate('history')}
          className={`p-2 sm:p-3 rounded-full flex items-center gap-1.5 sm:gap-2 transition-all whitespace-nowrap ${
            currentPage === 'history' 
              ? 'bg-blue-500 text-white' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <HistoryIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className={`text-xs sm:text-sm font-medium ${currentPage === 'history' ? '' : 'text-gray-600'}`}>
            {t.history}
          </span>
        </button>

        <button
          onClick={() => onNavigate('settings')}
          className={`p-2 sm:p-3 rounded-full flex items-center gap-1.5 sm:gap-2 transition-all whitespace-nowrap ${
            currentPage === 'settings' 
              ? 'bg-blue-500 text-white' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <SettingsIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className={`text-xs sm:text-sm font-medium ${currentPage === 'settings' ? '' : 'text-gray-600'}`}>
            {t.settings}
          </span>
        </button>

        <button
          onClick={() => onNavigate('help')}
          className={`p-2 sm:p-3 rounded-full flex items-center gap-1.5 sm:gap-2 transition-all whitespace-nowrap ${
            currentPage === 'help' 
              ? 'bg-blue-500 text-white' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className={`text-xs sm:text-sm font-medium ${currentPage === 'help' ? '' : 'text-gray-600'}`}>
            {t.help}
          </span>
        </button>
      </motion.div>
    </motion.div>
  );
}