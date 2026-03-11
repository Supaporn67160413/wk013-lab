import { useState, useEffect } from "react";

export default function PostsByUser() {
  const [userId, setUserId] = useState(1);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
      );
      const data = await response.json();
      setPosts(data);
      setLoading(false);
    }

    fetchPosts();
  }, [userId]); //เมื่อเปลี่ยน userId ก็สามารถทำงานได้เลย

  return (
    <div style={{ padding: "20px" }}>
      <div>
        <label>
          Select User:
          <select value={userId} onChange={(e) => setUserId(e.target.value)}>
            {[1, 2, 3, 4, 5].map((id) => (
              <option key={id} value={id}>
                User {id}
              </option>
            ))}
          </select>
        </label>
      </div>

      {loading && <p>⏳ Loading posts...</p>}

      <h3>📝 Posts by User {userId}</h3>
      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            margin: "10px 0",
            borderRadius: "4px",
          }}
        >
          <h4>{post.title}</h4>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}
