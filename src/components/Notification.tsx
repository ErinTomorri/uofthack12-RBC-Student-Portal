import { XMarkIcon } from '@heroicons/react/24/outline';
import { useBankStore } from '../lib/store';

const NOTIFICATION_STYLES = {
  warning: {
    bg: 'bg-red-50',
    text: 'text-red-700',
    icon: '⚠️',
  },
  info: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    icon: 'ℹ️',
  },
  success: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    icon: '✅',
  },
};

function formatTime(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  });
}

export function NotificationList() {
  const { notifications, dismissNotification } = useBankStore();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-sm w-full">
      {notifications.map((notification) => {
        const style = NOTIFICATION_STYLES[notification.type];
        return (
          <div
            key={notification.id}
            className={`${
              style.bg
            } p-4 rounded-lg shadow-lg transform transition-all duration-500 hover:scale-102 animate-slide-in`}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <span className="text-lg" role="img" aria-label={notification.type}>
                  {style.icon}
                </span>
              </div>
              <div className="ml-3 w-0 flex-1 pt-0.5">
                <p className={`text-sm font-medium ${style.text}`}>
                  {notification.message}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {formatTime(notification.date)}
                </p>
              </div>
              <div className="ml-4 flex-shrink-0 flex">
                <button
                  className={`rounded-md inline-flex ${style.text} hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                  onClick={() => dismissNotification(notification.id)}
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
} 