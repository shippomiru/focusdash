import { useStore } from '../store';

export function Reminders() {
  const { settings, currentTask } = useStore();

  // Component no longer does anything since notifications are removed
  return null;
}