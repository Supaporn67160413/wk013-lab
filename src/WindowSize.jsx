import { useState, useEffect } from "react";

export default function WindowSize() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    //ดักฟังว่ามีการขยายไซส์หรือไม่
    window.addEventListener("resize", handleResize);

    //ดักฟังเสร็จแล้วก็นำออก
    return () => {
      console.log("🧹 นำเอา resize listener ออก");
      window.removeEventListener("resize", handleResize);
    };
  }, []); //ทำงาน 1 ครั้ง

  return (
    <div>
      <h2>📏 Window Width: {width}px</h2>
      <p>ลองเปลี่ยนขนาดหน้าต่างบราว์เซอร์ดู</p>
    </div>
  );
}
