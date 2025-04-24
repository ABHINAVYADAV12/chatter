import { Link } from "react-router-dom";
import hero from "../assets/hero.png";
import { useAuth } from "../context/authContext";

const Hero = () => {
  const { isAuthenticated } = useAuth();

  return (
    <section className="bg-gray-900 text-white">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Swift Chat: Instant Connections, Effortless Conversations
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-300 lg:mb-8 md:text-lg lg:text-xl">
            Connect Seamlessly, Chat Effortlessly: Elevate Your Experience with Our Intuitive Chat Application!
          </p>

          {/* Conditional Buttons */}
          {!isAuthenticated ? (
            <div className="flex gap-4">
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
              >
                Login
                <svg
                  className="w-5 h-5 ml-2 -mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L12 7.414V17a1 1 0 11-2 0V7.414l-4.293 4.293a1 1 0 01-1.414-1.414l6-6z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white border border-gray-300 rounded-lg hover:bg-gray-800"
              >
                Register
              </Link>
            </div>
          ) : (
            <Link
              to="/chathome"
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
            >
              Go to Chat
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L12 7.414V17a1 1 0 11-2 0V7.414l-4.293 4.293a1 1 0 01-1.414-1.414l6-6z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          )}
        </div>

        {/* Image section */}
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img src={hero} alt="mockup" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
