import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [theme, setTheme] = useState("");

  const handleThemeChange = (event) => {
    const selectedTheme = event.target.value;
    setTheme(selectedTheme);
    localStorage.setItem("chatKaroTheme", selectedTheme);
    document.documentElement.setAttribute("data-theme", selectedTheme);
  };

  useEffect(() => {
    const currentTheme = localStorage.getItem("chatKaroTheme") || "";
    document.documentElement.setAttribute("data-theme", currentTheme);
    setTheme(currentTheme);
  }, []);

  return (
    <div className="bg-primary flex items-center justify-between px-5 py-2">
      <h1 className="text-xl font-bold">ChatKaro</h1>

      <div className="flex gap-4">
        <Link to="/" className="link link-hover">
          Home
        </Link>
        <Link to="/about" className="link link-hover">
          About
        </Link>
      </div>

      <div className="flex gap-3 items-center">
        <Link to="/login" className="btn btn-secondary">
          Login
        </Link>

        <Link to="/signup" className="btn btn-accent">
          Sign Up
        </Link>

        <select
          name="theme"
          id="theme"
          className="select select-bordered"
          onChange={handleThemeChange}
          value={theme}
        >
          <option value="">Default</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="claude">Claude</option>
          <option value="spotify">Spotify</option>
          <option value="vscode">VSCode</option>
          <option value="black">Black</option>
          <option value="corporate">Corporate</option>
          <option value="ghibli">Ghibli</option>
          <option value="gourmet">Gourmet</option>
          <option value="luxury">Luxury</option>
          <option value="mintlify">Mintlify</option>
          <option value="pastel">Pastel</option>
          <option value="perplexity">Perplexity</option>
          <option value="shadcn">Shadcn</option>
          <option value="slack">Slack</option>
          <option value="soft">Soft</option>
          <option value="valorant">Valorant</option>
        </select>
      </div>
    </div>
  );
};

export default Navbar;
