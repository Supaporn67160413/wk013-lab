import { useState, useEffect } from "react";

export default function SearchUsers() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      //ถ้า User เผลอกดสเปซบาร์ไว้ ก็จะตั้งให้มันเป็นว่างไปเลย
      setResults([]);
      return;
    }

    //สร้าง AbortController เพื่อยกเลิก request ที่ค้างอยู่
    const controller = new AbortController();

    async function search() {
      setLoading(true);
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users?q=${query}`,
          { signal: controller.signal }, //ไปดึงข้อมูลมาให้แต่หากมีการแก้ไขคำจะถูกยกเลิกทันที
        );
        const data = await response.json();
        setResults(data);
      } catch (err) {
        // ตั้งเงื่อนไข ที่ว่า Error ไม่ใช่มาจากการยกเลิกคำสั่งใช่ไหม
        if (err.name !== "AbortError") {
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    }

    //Delay search เล็กน้อย
    const timer = setTimeout(search, 500);

    return () => {
      clearTimeout(timer);
      controller.abort(); //ยกเลิกคำสั่งที่ยังคงตกค้างอยู่
    };
  }, [query]);

  return (
    <div style={{ padding: "20px" }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="🔍 ค้นหา users..."
      />

      {loading && <p>⏳ Searching...</p>}

      <ul>
        {results.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
