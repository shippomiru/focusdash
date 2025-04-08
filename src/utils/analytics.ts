export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });
  }
};

// 预定义的事件类型
export const EventCategory = {
  FOCUS: 'focus',
  BREAK: 'break',
  PROGRESS: 'progress',
  NAVIGATION: 'navigation',
  SETTINGS: 'settings'
} as const;

export const EventAction = {
  START: 'start',
  UPDATE: 'update',
  CANCEL: 'cancel',
  RESUME: 'resume',
  VIEW: 'view',
  CHANGE: 'change'
} as const; 