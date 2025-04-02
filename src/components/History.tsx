import { format } from 'date-fns';
import { useStore } from '../store';
import { Clock, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { translations } from '../translations';

function getTimeSlots() {
  const slots = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      slots.push({
        hour,
        minute,
        active: false,
        intensity: 0
      });
    }
  }
  return slots;
}

export function History() {
  const { tasks, settings } = useStore();
  const t = translations[settings.language];

  const calculateDuration = (start: Date, end: Date) => {
    const diff = end.getTime() - start.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const getActivityHeatmap = () => {
    const today = new Date();
    const slots = getTimeSlots();
    
    tasks.forEach(task => {
      const startDate = new Date(task.startTime);
      const endDate = task.endTime ? new Date(task.endTime) : new Date();
      
      if (startDate.toDateString() === today.toDateString()) {
        let current = new Date(startDate);
        while (current < endDate) {
          const hour = current.getHours();
          const minute = current.getMinutes();
          const slotIndex = (hour * 4) + Math.floor(minute / 15);
          
          if (slots[slotIndex]) {
            slots[slotIndex].active = true;
            slots[slotIndex].intensity += 1;
          }
          
          current = new Date(current.getTime() + 15 * 60000);
        }
      }
    });
    
    return slots;
  };

  const getIntensityColor = (intensity: number) => {
    if (!intensity) return 'bg-gray-100';
    if (intensity === 1) return 'bg-blue-200';
    if (intensity === 2) return 'bg-blue-300';
    if (intensity === 3) return 'bg-blue-400';
    return 'bg-blue-500';
  };

  const timeSlots = getActivityHeatmap();

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
      <div className="text-center mb-4 sm:mb-6">
        <h2 className="text-2xl sm:text-2xl font-bold mb-2">{t.taskHistory}</h2>
        <p className="text-base sm:text-base text-gray-600 italic">"{settings.motto}"</p>
      </div>

      <div className="mb-6 sm:mb-8">
        <h3 className="text-xl sm:text-xl font-semibold mb-3">{t.todayTimeline}</h3>
        
        <div className="overflow-x-auto">
          <div className="min-w-[600px] xl:min-w-0">
            <div className="grid grid-cols-24 gap-1">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="text-base text-gray-400 text-center">
                  {i}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-96 gap-[2px] mt-2">
              {timeSlots.map((slot, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.001 }}
                  className={`h-4 rounded-sm ${getIntensityColor(slot.intensity)} transition-colors`}
                  title={`${slot.hour}:${slot.minute.toString().padStart(2, '0')}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end mt-2 space-x-2">
          <span className="text-base text-gray-500">{t.less}</span>
          <div className="flex space-x-1">
            <div className="w-3 h-3 rounded-sm bg-gray-100" />
            <div className="w-3 h-3 rounded-sm bg-blue-200" />
            <div className="w-3 h-3 rounded-sm bg-blue-300" />
            <div className="w-3 h-3 rounded-sm bg-blue-400" />
            <div className="w-3 h-3 rounded-sm bg-blue-500" />
          </div>
          <span className="text-base text-gray-500">{t.more}</span>
        </div>
      </div>

      <div className="space-y-3">
        {tasks.map(task => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border rounded-lg p-3 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-base sm:text-base">{task.name}</h3>
              <span className="text-green-500">
                <CheckCircle2 className="w-4 h-4" />
              </span>
            </div>
            <div className="flex items-center justify-between text-base text-gray-600">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{task.endTime && calculateDuration(task.startTime, task.endTime)}</span>
              </div>
              <span>{format(task.startTime, 'MM-dd')}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}