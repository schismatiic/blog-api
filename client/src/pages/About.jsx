import fufu from "../assets/persian1.jpg";
import { Link } from "react-router";

const About = () => {
  return (
    <section id="about" className="flex flex-col items-center px-4 py-12">
      <div className="w-full max-w-3xl rounded-3xl bg-olive-100 p-6 md:p-10 shadow-sm border border-taupe-600/30">
        <h1 className="text-3xl md:text-4xl font-black text-teal-400 text-center">
          About Blog Fufú
        </h1>
        <div className="flex justify-center">
          <img
            className="mt-4 w-96 sm:w-72 md:w-80 lg:w-96 xl:w-md max-w-full h-auto object-contain border border-taupe-600/20 shadow-lg p-4"
            src={fufu}
            alt="Fufú"
          />
        </div>

        <div className="mt-6 space-y-1 text-center text-md">
          <p>
            Welcome to{" "}
            <span className="font-bold text-teal-400">Blog Fufú</span>!
          </p>
          <p>
            This is a blog dedicated to documenting the life of a fluffy white
            persian kitty, Fufú.
          </p>
          <p>
            Fufú is me, meowwww! I love to blog ♡ and talk about my interesting
            life stories.
          </p>
          <p>
            You can also check my husband Tommy's side blog by{" "}
            <Link to="/tommy" className="text-teal-400 cursor-pointer">
              clicking here
            </Link>
          </p>
          <p>
            If you enjoy my little corner of the world, be sure to leave a
            comment and stick around.♡
          </p>
        </div>

        <div className="mt-8 text-center text-2xl">ฅ(⁠=⁠^⁠･⁠ｪ⁠･⁠^⁠=⁠)ฅ</div>
      </div>
    </section>
  );
};

export default About;
