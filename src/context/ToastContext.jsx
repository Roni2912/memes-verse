import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const ToastContext = createContext(null);
const DURATION = 3000;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const nextId = useRef(0);

  const show = useCallback((message, type = 'success') => {
    const id = nextId.current++;
    setToasts((list) => [...list, { id, message, type }]);
    setTimeout(() => setToasts((list) => list.filter((t) => t.id !== id)), DURATION);
  }, []);

  const api = useMemo(
    () => ({
      success: (message) => show(message, 'success'),
      error: (message) => show(message, 'error'),
    }),
    [show],
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-4 z-[60] flex flex-col items-center gap-2 px-4"
      >
        {toasts.map(({ id, message, type }) => {
          const Icon = type === 'error' ? AlertCircle : CheckCircle2;
          return (
            <div
              key={id}
              role="status"
              className="animate-pop pointer-events-auto flex max-w-sm items-center gap-2.5 rounded-control border border-line bg-surface px-4 py-2.5 text-sm shadow-pop"
            >
              <Icon
                className={`h-4 w-4 shrink-0 ${type === 'error' ? 'text-danger' : 'text-success'}`}
              />
              {message}
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
