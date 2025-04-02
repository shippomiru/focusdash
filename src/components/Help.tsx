import { HelpCircle, CheckCircle, Coffee, Bell, LineChart } from 'lucide-react';
import { useStore } from '../store';
import { translations } from '../translations';
import { motion } from 'framer-motion';

export function Help() {
  const { settings } = useStore();
  const t = translations[settings.language];

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
      <div className="text-center mb-4 md:mb-6">
        <h2 className="text-2xl sm:text-2xl font-bold">{t.helpTitle}</h2>
      </div>

      <div className="space-y-8 md:space-y-10">
        {/* Core Features */}
        <section>
          <h3 className="text-xl sm:text-xl font-semibold mb-4">{t.features}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: CheckCircle, title: t.feature1 },
              { icon: Coffee, title: t.feature2 },
              { icon: LineChart, title: t.feature3 },
              { icon: Bell, title: t.feature4 },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2"
              >
                <feature.icon className="w-5 h-5 text-blue-500" />
                <span className="font-medium text-base sm:text-base text-gray-700">{feature.title}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section>
          <h3 className="text-xl sm:text-xl font-semibold mb-4">{t.howItWorks}</h3>
          <div className="space-y-5">
            {[t.step1, t.step2, t.step3, t.step4].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-base sm:text-base text-gray-700 leading-relaxed"
              >
                {step}
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h3 className="text-xl sm:text-xl font-semibold mb-4">{t.faq}</h3>
          <div className="space-y-6">
            {[
              { q: t.q1, a: t.a1 },
              { q: t.q2, a: t.a2 },
              { q: t.q3, a: t.a3 },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-2"
              >
                <h4 className="font-medium text-base sm:text-base text-gray-800">{item.q}</h4>
                <p className="text-base sm:text-base text-gray-600 leading-relaxed">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}