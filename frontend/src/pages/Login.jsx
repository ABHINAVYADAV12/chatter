import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/authContext";
import Cookies from "js-cookie";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { isAuthenticated} = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      console.log("User is authenticated, redirecting to chat");
      navigate("/chathome");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "/api/user/login";
      const response = await axios.post(url, data, {
        withCredentials: true, // Important for cookies
      });

      console.log("Login response:", response.data);

      if (response.status === 200) {
        toast.success("Login successful!");

        // Check if the cookie was set automatically
        const cookieToken = Cookies.get("authToken");

        if (cookieToken) {
          console.log("Auth cookie was set automatically");
        } else {
          // If cookie wasn't set automatically, set it manually
          console.log("Setting auth cookie manually");
          Cookies.set("authToken", response.data.token, {
            expires: 7, // 7 days
            path: "/",
          });
        }

        // Redirect to chat home
        setTimeout(() => {
          window.location.href = "/chathome";
        }, 500); // Small delay to ensure cookie is set
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <section className="min-h-screen bg-dark flex items-center justify-center">
      <div className="w-full max-w-md rounded-lg shadow border p-6 bg-white">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900">
          Sign in to your account
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your email
            </label>
            <input
              onChange={handleChange}
              value={data.email}
              type="email"
              name="email"
              id="email"
              className="w-full border sm:text-sm rounded-lg p-2.5"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              onChange={handleChange}
              value={data.password}
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="w-full border sm:text-sm rounded-lg p-2.5"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 border text-indigo-600 focus:ring-indigo-500 rounded"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-900">
                Remember me
              </label>
            </div>
            <a
              href="#"
              className="text-sm font-medium text-indigo-600 hover:underline"
            >
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Sign in
          </button>
          <p className="text-sm font-light text-gray-500">
            Don't have an account yet?{" "}
            <Link
              to="/register"
              className="font-medium text-indigo-600 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
