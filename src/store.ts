import { create } from 'zustand';
import { AppState, Settings, Task } from './types';

const defaultSettings: Settings = {
  motto: 'Forward steps add up.',
  language: 'en',
};

export const useStore = create<AppState>((set) => ({
  tasks: [],
  settings: defaultSettings,
  isBreakMode: false,
  currentTask: undefined,
  breakTask: undefined,
  
  setCurrentTask: (task: Task) => set({ currentTask: task }),
  
  updateProgress: (progress: number) => 
    set((state) => {
      if (!state.currentTask) return state;
      
      const now = new Date();
      const workTime = state.currentTask.lastBreakTime
        ? now.getTime() - state.currentTask.lastBreakTime.getTime()
        : now.getTime() - state.currentTask.startTime.getTime();
      
      const updatedTask = {
        ...state.currentTask,
        progress,
        totalWorkTime: state.currentTask.totalWorkTime + workTime,
        lastBreakTime: now
      };

      // If progress is 100%, add to history but keep as current task for celebration
      if (progress === 100) {
        return {
          ...state,
          currentTask: updatedTask,
          tasks: [...state.tasks, { ...updatedTask, endTime: now }]
        };
      }

      return { 
        ...state, 
        currentTask: updatedTask 
      };
    }),
    
  completeTask: () => set({ currentTask: undefined }),
    
  updateSettings: (settings: Partial<Settings>) =>
    set((state) => ({
      settings: { ...state.settings, ...settings }
    })),
    
  setBreakMode: (isBreak: boolean, task?: string) =>
    set((state) => ({
      isBreakMode: isBreak,
      breakTask: task,
      currentTask: state.currentTask && {
        ...state.currentTask,
        lastBreakTime: isBreak ? new Date() : state.currentTask.lastBreakTime
      }
    })),
    
  cancelTask: () => set({ currentTask: undefined }),
}));