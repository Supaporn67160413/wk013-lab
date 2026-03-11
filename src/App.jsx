import { useEffect, useState } from "react";
// import './App.css'

export default function App() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");

  // useEffect ที่ทำงานเพียงครั้งแรกเท่านั้น
  useEffect(() => {
    console.log("Component mounted");
  }, []);

  // useEffect ที่ทำงนทุกครั้งที่ count เปลี่ยน
  useEffect(() => {
    console.log(`Count เปลี่ยนเป็น: ${count}`);
  }, [count]);

  // useEffect ทำงานเมื่อ message เปลี่ยน
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log(`💬 Message: ${message}`);
    }, 2000); //ทำงานทุก 2 วินาที

    //เคลียร์ฟังก์ชัน
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>🎯 useEffect Examples</h1>

      <div>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="พิมพ์ข้อความ"
        />
        <p>Message: {message}</p>
      </div>

      <p style={{ color: "#999", fontSize: "12px" }}>
        ดูที่ Console (F12) เพื่อเห็น logs
      </p>
    </div>
  );
}
