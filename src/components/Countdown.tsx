import { useEffect, useState } from "react";

const TARGET = new Date("2026-07-16T18:00:00").getTime();

function getRemaining() {
  const diff = Math.max(0, TARGET - Date.now());
  return {
    jours: Math.floor(diff / 86400000),
    heures: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    secondes: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown() {
  const [time, setTime] = useState(getRemaining);

  useEffect(() => {
    const id = setInterval(() => setTime(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
      {Object.entries(time).map(([label, value]) => (
        <div
          key={label}
          className="satin-panel gold-border shimmer flex h-24 w-24 flex-col items-center justify-center rounded-lg shadow-[0_12px_30px_-12px_rgba(120,95,55,0.35)] sm:h-28 sm:w-28"
        >
          <span className="font-serif text-3xl font-medium text-gold-gradient sm:text-4xl">
            {String(value).padStart(2, "0")}
          </span>
          <span className="mt-1 text-[10px] tracking-[0.3em] uppercase text-cocoa/70">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
