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
        {elapsed < 3600000 ? time.slice(3) : time} {"\u23F8"}
      </span>
    </div>
  );
}