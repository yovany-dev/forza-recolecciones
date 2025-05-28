import { useEffect, useState } from 'react';

function formatDate(date: Date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12 || 12;
  const formattedHours = String(hours).padStart(2, '0');
  return `${day}/${month}/${year} - ${formattedHours}:${minutes} ${ampm}`;
}

export function useClock() {
  const [time, setTime] = useState(() => formatDate(new Date()));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(formatDate(new Date()));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return time;
}
