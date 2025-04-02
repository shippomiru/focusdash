import { useStore } from '../store';
import { motion } from 'framer-motion';
import { translations } from '../types';

export function Settings() {
  const { settings, updateSettings } = useStore();
  const t = translations[settings.language];

  const handleLanguageChange = (lang: 'en' | 'zh') => {
    updateSettings({ language: lang });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 mb-8 max-w-2xl mx-auto"
    >
      <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
        {settings.language === 'en' ? 'Settings' : '设置'}
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {settings.language === 'en' ? 'Language' : '语言'}
          </label>
          <div className="flex gap-4">
            <button
              onClick={() => handleLanguageChange('en')}
              className={`px-4 py-2 rounded-lg ${
                settings.language === 'en'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              English
            </button>
            <button
              onClick={() => handleLanguageChange('zh')}
              className={`px-4 py-2 rounded-lg ${
                settings.language === 'zh'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              中文
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {settings.language === 'en' ? 'Motto' : '格言'}
          </label>
          <input
            type="text"
            value={settings.motto}
            onChange={(e) => updateSettings({ motto: e.target.value })}
            className="w-full px-3 py-2 bg-gray-50 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </motion.div>
  );
}