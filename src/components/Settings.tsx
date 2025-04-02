import { useStore } from '../store';
import { Settings as SettingsIcon, Globe } from 'lucide-react';
import { translations } from '../translations';
import { motion } from 'framer-motion';

export function Settings() {
  const { settings, updateSettings } = useStore();
  const t = translations[settings.language];

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
      <div className="flex items-center gap-2 mb-6">
        <SettingsIcon className="w-5 h-5 text-blue-500" />
        <h2 className="text-2xl sm:text-2xl font-bold">{t.settings}</h2>
      </div>

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label className="block text-base sm:text-base font-medium text-gray-700 mb-2">
            {t.language}
          </label>
          <div className="flex gap-3">
            <button
              onClick={() => updateSettings({ language: 'en' })}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg ${
                settings.language === 'en'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } transition-all`}
            >
              <Globe className="w-4 h-4" />
              <span className="text-base sm:text-base font-medium">English</span>
            </button>
            <button
              onClick={() => updateSettings({ language: 'zh' })}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg ${
                settings.language === 'zh'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } transition-all`}
            >
              <Globe className="w-4 h-4" />
              <span className="text-base sm:text-base font-medium">中文</span>
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block text-base sm:text-base font-medium text-gray-700 mb-2">
            {t.motivationMotto}
          </label>
          <input
            type="text"
            value={settings.motto}
            onChange={(e) => updateSettings({ motto: e.target.value })}
            className="w-full px-4 py-2.5 bg-gray-50 border-0 rounded-xl text-base sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder={t.enterMottoPlaceholder}
          />
        </motion.div>
      </div>
    </div>
  );
}