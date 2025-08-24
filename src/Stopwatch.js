import { useState, useEffect } from "react";

export default function Stopwatch() {
    const [elapsed, setElapsed] = useState(0)

    useEffect(() => {
        const start = Date.now();
        const id = setInterval(() => setElapsed(Date.now() - start), 100);
        return () => clearInterval(id);
    }, []);

    const time = new Date(elapsed).toISOString().slice(11, 19);
    return (
        <div className="stopwatch">
            {elapsed < 3600000 ? time.slice(3) : time}
        </div>
    );
}