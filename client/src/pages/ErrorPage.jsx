import fufu from "../assets/persian0.jpg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex justify-center flex-1">
        <div className="flex flex-col items-center m-4 text-lg p-4 bg-olive-100 rounded-2xl shadow-sm w-fit">
          <div className="relative mb-6">
            <div className="relative max-w-lg rounded-[3rem] bg-white px-8 py-5 text-center shadow-md border border-taupe-600/30">
              <p>
                Oh no, this route doesn't exist! You can go back to the home
                page by{" "}
                <Link to="/" className="text-teal-400 cursor-pointer">
                  clicking here
                </Link>
                , meow!
              </p>

              {/* cola de la nube */}
              {/* cola de la nube */}
              <div className="absolute -bottom-5 right-[15%] h-8 w-8 rounded-full bg-white border border-taupe-600/30" />
              <div className="absolute -bottom-9 right-[20%] h-4 w-4 rounded-full bg-white border border-taupe-600/30" />
            </div>
          </div>
          <img
            className="mt-4 w-96 sm:w-72 md:w-80 lg:w-96 xl:w-md max-w-full h-auto object-contain rounded-xl border border-taupe-600/40 p-4"
            src={fufu}
            alt="Fufú"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ErrorPage;
