import { Link } from "react-router";
import { Menu, House, Info, X, LogIn, UserRoundPlus } from "lucide-react";
import { useState } from "react";
import { FaPaw } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { token, logout } = useAuth();
  const [toggleOpen, setToggleOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-olive-100 shadow-sm">
      <nav className="py-0.5">
        <div className="flex justify-between text-lg m-4  items-center">
          <div className="flex gap-x-4">
            <button
              className="md:hidden cursor-pointer"
              onClick={() => setToggleOpen(!toggleOpen)}
              aria-label="Open/close menu"
            >
              {/* Toggle button  */}
              {toggleOpen ? (
                <X className="w-6 h-6 hover:text-teal-400 active:scale-95" />
              ) : (
                <Menu className="w-6 h-6 hover:text-teal-400 active:scale-95" />
              )}
            </button>
            {/* Logo  */}
            <Link className="flex items-center gap-x-2 active:scale-95" to="/">
              <FaPaw
                strokeWidth={3}
                className="w-6 h-6 text-teal-400 rotate-30"
              />
              <h1 className="flex items-center font-black text-lg md:text-2xl ">
                Blog Fufú
              </h1>
            </Link>
          </div>
          {/* Nav  */}
          <ul className="hidden md:flex justify-center font-medium items-center gap-x-4 mr-4">
            <li className="flex gap-1 items-center hover:text-teal-400 hover:border-b-2 hover:border-teal-400 cursor-pointer">
              <House className="w-5 h-5" />
              <Link to="/">Home</Link>
            </li>
            <li className="flex gap-1 items-center hover:text-teal-400 hover:border-b-2 hover:border-teal-400 cursor-pointer">
              <Info className="w-5 h-5" />
              <Link to="/about">About</Link>
            </li>
          </ul>
          {/* Auth buttons  */}
          {token ? (
            <button
              className="flex gap-1 items-center border border-taupe-600/40 px-2 py-1 rounded-xl hover:bg-olive-200 cursor-pointer"
              onClick={logout}
            >
              Log out
            </button>
          ) : (
            <ul className="flex gap-2 items-center text-sm md:text-lg">
              <li className="flex gap-1 items-center text-olive-100 px-2 py-1 rounded-xl bg-teal-400 hover:bg-teal-500 cursor-pointer whitespace-nowrap">
                <LogIn className="w-5 h-5" />
                <Link to="/auth/login">Log In</Link>
              </li>
              <li className="flex gap-1 items-center border border-taupe-600/40 px-2 py-1 rounded-xl hover:bg-olive-200 cursor-pointer">
                <UserRoundPlus className="w-5 h-5" />
                <Link to="/auth/register">Register</Link>
              </li>
            </ul>
          )}
        </div>
        {toggleOpen && (
          <ul className="md:hidden flex flex-col font-medium text-lg">
            <li className="flex items-center">
              <Link
                className="flex items-center gap-1 hover:text-olive-100 hover:bg-teal-400 w-full p-2"
                onClick={() => setToggleOpen(!toggleOpen)}
                to="/"
              >
                <House className="w-5 h-5" />
                Home
              </Link>
            </li>
            <li className="flex items-center">
              <Link
                className="flex items-center gap-1 hover:text-olive-100 hover:bg-teal-400 w-full p-2"
                onClick={() => setToggleOpen(!toggleOpen)}
                to="/about"
              >
                <Info className="w-5 h-5" />
                About
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};
export default Navbar;
