import { useState, useEffect } from "react";

export default function Timer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return; //ถ้า Time ไม่ได้รันอยู่ไม่ต้อง set timer

    const timer = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    // เคลียร์: ปลดปล่อย Timer เมื่อ component unmount หรือ isRunning เปลี่ยน
    return () => {
      console.log("🧹 Cleanup timer");
      clearInterval(timer);
    };
  }, [isRunning]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>⏱️ Timer: {time}s</h2>
      <button onClick={() => setIsRunning(!isRunning)}>
        {" "}
        {isRunning ? "Stop" : "Start"}
      </button>
      <button onClick={() => setTime(0)}>Reset</button>
    </div>
  );
}
