import { useState, useEffect } from "react";

export default function Stopwatch({ isPaused, onTogglePause }) {
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    if (isPaused) return;

    const start = Date.now() - elapsed;
    const id = setInterval(() => setElapsed(Date.now() - start), 100);
    return () => clearInterval(id);
  }, [isPaused, elapsed]);

  const time = new Date(elapsed).toISOString().slice(11, 19);

  return (
    <div className="stopwatch">
      <span onClick={onTogglePause} style={{ cursor: 'pointer' }}>
        {elapsed < 3600000 ? time.slice(3) : time}&nbsp;
        {isPaused ? (
          <svg
            style={{ height: '1em', width: 'auto', verticalAlign: 'middle' }}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <polygon points="5,3 19, 12 5,21"></polygon>
          </svg>
        ) : (
          <svg
            style={{ height: '1em', width: 'auto', verticalAlign: 'middle' }}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <rect x="6" y="3" width="4" height="16"></rect>
            <rect x="14" y="3" width="4" height="16"></rect>
          </svg>
        )}
      </span>
    </div>
  );
}