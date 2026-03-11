import { useState, useEffect } from "react";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); //เพื่อให้ก่อนที่จะเปิดหน้า มีการโหลดก่อน
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
        );
        if (!response.ok) {
          throw new Error("Failed to fetch"); //try จะหยุดทำงานคือบังคับให้เกิด Error ซึ่งข้อความนี้จะไปใส่อยู่ใน catch(err)
        }
        console.log(response);
        const data = await response.json();
        console.log(data);
        setUsers(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers(); //เรียกใช้ฟังก์ชัน
  }, []); //ทำงานครั้งเดียว ตอนแรกของการโหลดหน้าเว็บไซต์

  if (loading) return <p>⏳ Loading...</p>;
  if (error) return <p>Error: {error}</p>; //ถ้ามี Error ก็จะแสดงออกมาให้เห็น

  return (
    <div>
      <h2>👥 Users ({users.length})</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
