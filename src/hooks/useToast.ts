import { useCallback, useEffect, useState } from "react";

export type ShowToastFunction = (message: string, duration?: number) => void;

export function useToast(): [string | null, ShowToastFunction] {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastDuration, setToastDuration] = useState<number>(2000);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, toastDuration);
      return () => clearTimeout(timer);
    }
  }, [toastMessage, toastDuration]);

  const showToast = useCallback((message: string, duration: number = 2000) => {
    setToastMessage(message);
    setToastDuration(duration);
  }, []);

  return [toastMessage, showToast];
}
