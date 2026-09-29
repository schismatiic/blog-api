import { Link } from "react-router";
import { FaPaw } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="flex flex-col justify-center items-center bg-olive-100 mt-8 px-4 py-8 text-teal-400 shadow-sm">
      <Link className="flex items-center gap-x-2 active:scale-95" to="/">
        <FaPaw strokeWidth={3} className="w-6 h-6 text-teal-400 rotate-30" />
        <h1 className="flex items-center font-black text-lg md:text-2xl">
          Blog Fufú
        </h1>
      </Link>
      <p className="text-center text-xs">
        Made with ♡ and a little bit of cat magic · © 2026 Blog Fufú
      </p>
    </footer>
  );
};
export default Footer;
