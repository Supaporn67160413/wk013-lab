import { useState, useEffect } from "react";

export default function DataDashboard() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComment] = useState([]);

  //Effect 1: Fetch users
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((r) => r.json()) //จัดข้อมูลให้กลายเป็น JavaScript
      .then(setUsers); //หลังจากนั้นก็เอาไป setUsers
  }, []);

  //Effect 2: Fetch posts
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((r) => r.json())
      .then(setPosts);
  }, []);

  //Effect 3: Fetch comment
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((r) => r.json())
      .then(setComment);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>📊 Dashboard</h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
        <div style={{ border: "1px solid #ddd", padding: "10px" }}>
          <h3>👥 Users: {users.length}</h3>
        </div>
        <div style={{ border: "1px solid #ddd", padding: "10px" }}>
          <h3>Posts: {posts.length}</h3>
        </div>
        <div style={{ border: "1px solid #ddd", padding: "10px" }}>
          <h3>💬 Comments: {comments.length}</h3>
        </div>
      </div>
    </div>
  );
}
