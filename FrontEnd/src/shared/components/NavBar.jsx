import { useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const NAV_LINKS = ["Discovery", "Projects", "Community"];
  return (
    <nav className="sticky top-0 z-50 bg-gray-950 border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
        {/* Logo */}
        <span className="text-white font-bold text-lg tracking-tight">
          Dev<span className="text-violet-400">Hub</span>
        </span>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-6 text-sm text-gray-400">
          {NAV_LINKS.map((l) => (
            <li key={l}>
              <a href="#" className="hover:text-white transition-colors">
                {l}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        {isLoggedIn ? (
          <div className="hidden md:flex items-center gap-3">
            <input
              placeholder="Search..."
              className="bg-gray-800 text-gray-300 text-sm rounded-md px-3 py-1.5 outline-none focus:ring-1 focus:ring-violet-500 w-36 placeholder-gray-500"
            />
            <button className="text-sm text-gray-300 hover:text-white transition-colors" onClick={()=> navigate('/auth/login')}>
              Log in
            </button>
            <button className="bg-violet-600 hover:bg-violet-500 text-white text-sm px-3 py-1.5 rounded-md transition-colors" onClick={()=> navigate('/auth/register')}>
              Sign up
            </button>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-3">
            <input
              placeholder="Search..."
              className="bg-gray-800 text-gray-300 text-sm rounded-md px-3 py-1.5 outline-none focus:ring-1 focus:ring-violet-500 w-36 placeholder-gray-500"
            />
            <button className="text-sm text-gray-300 hover:text-white transition-colors">
              LogOut
            </button>
            <button className="bg-violet-600 hover:bg-violet-500 text-white text-sm w-7 h-7  rounded-full overflow-hidden transition-colors" onClick={() => navigate("/profile")}>
              <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" srcset="" />
            </button>
          </div>
        )}

        {/* Hamburger */}
        <button
          className="md:hidden text-gray-400 hover:text-white"
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 px-4 py-4 flex flex-col gap-3">
          {NAV_LINKS.map((l) => (
            <a
              key={l}
              href="#"
              className="text-gray-300 hover:text-white text-sm"
            >
              {l}
            </a>
          ))}
          <hr className="border-gray-800" />
          <button className="text-sm text-gray-300 text-left">Log in</button>
          <button className="bg-violet-600 text-white text-sm px-3 py-2 rounded-md">
            Sign up
          </button>
        </div>
      )}
    </nav>
  );
}
