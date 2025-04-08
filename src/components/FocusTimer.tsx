import { trackEvent, EventCategory, EventAction } from '../utils/analytics';

const FocusTimer: React.FC = () => {
  const handleStartFocus = () => {
    trackEvent(EventAction.START, EventCategory.FOCUS, 'focus_start');
  };

  const handleUpdateProgress = (progress: number) => {
    trackEvent(EventAction.UPDATE, EventCategory.PROGRESS, 'progress_update', progress);
  };

  const handleStartBreak = () => {
    trackEvent(EventAction.START, EventCategory.BREAK, 'break_start');
  };

  const handleResumeFocus = () => {
    trackEvent(EventAction.RESUME, EventCategory.FOCUS, 'focus_resume');
  };

  const handleCancelFocus = () => {
    trackEvent(EventAction.CANCEL, EventCategory.FOCUS, 'focus_cancel');
  };

  return (
    // ... rest of the component code ...
  );
};

export default FocusTimer; 