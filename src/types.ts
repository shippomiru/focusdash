export interface Task {
  id: string;
  name: string;
  progress: number;
  startTime: Date;
  endTime?: Date;
  totalWorkTime: number;
  lastBreakTime: Date | null;
}

export interface Settings {
  motto: string;
  language: 'en' | 'zh';
}

export interface AppState {
  currentTask?: Task;
  tasks: Task[];
  settings: Settings;
  isBreakMode: boolean;
  breakTask?: string;
  setCurrentTask: (task: Task) => void;
  updateProgress: (progress: number) => void;
  completeTask: () => void;
  updateSettings: (settings: Partial<Settings>) => void;
  setBreakMode: (isBreak: boolean, task?: string) => void;
  cancelTask: () => void;
}

export interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

export const translations: Translations = {
  en: {
    motto: 'Forward steps add up.',
    startFocus: 'Start Focus',
    updateProgress: 'Update Progress',
    break: 'Break',
    cancelTask: 'Cancel Task',
    currentlyFocusing: 'Currently focusing on:',
    whatToFocus: 'What would you like to focus on?',
    trackProgress: 'Track progress, build momentum.',
  },
  zh: {
    motto: '前进的每一步都在积累。',
    startFocus: '开始专注',
    updateProgress: '更新进度',
    break: '休息',
    cancelTask: '取消任务',
    currentlyFocusing: '当前专注：',
    whatToFocus: '接下来做点什么？',
    trackProgress: '追踪进度，积累动力。',
  }
};