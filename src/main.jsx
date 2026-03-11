import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx"; // รับเข้า แล้วนำมาเป็นชื่อแท็กเลย
import UserList from "./UserList.jsx";
import PostsByUser from "./PostsByUser.jsx";
import Timer from "./Timer.jsx";
import WindowSize from "./WindowSize.jsx";
import SearchUsers from "./SearchUsers.jsx";
import DataDashboard from "./DataDashboard.jsx";
import WeatherApp from "./WeatherApp.jsx";

//หา Element ที่ชื่อ root แล้วก็จะ render
//reder คือ การเปลี่ยนแปลงของ Component
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* แทนที่ด้วย Export มาทั้งหมด*/}
    <App />
    <UserList />
    <PostsByUser />
    <Timer />
    <WindowSize />
    <SearchUsers />
    <DataDashboard />
    <WeatherApp />
  </StrictMode>,
);
