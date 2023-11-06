import { useState, useEffect } from "react";

export default function UserStatus() {
  const [loggedIn, setLoggedIn] = useState("");

  useEffect(() => {
    setLoggedIn(localStorage.getItem("user") || "");
  }, []);

  const handleLogout = async (event) => {
    event.preventDefault();
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    window.location.reload();
  };

  return loggedIn ? (
    <div className="relative flex flex-col justify-center items-center">
      <p className="text-gray-600 font-semibold mb-2">User: {loggedIn}</p>
      <button
        className="text-s bg-red-500 hover:bg-red-900 text-white border-0 rounded w-28 h-9 px-2 cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  ) : null;
}
