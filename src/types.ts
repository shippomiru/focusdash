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