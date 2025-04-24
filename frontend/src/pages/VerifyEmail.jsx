import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/authContext";

const VerifyEmail = () => {
  const { id, token } = useParams();
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, checkAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    if (isAuthenticated) navigate("/");
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/user/${id}/verify/${token}`);
        toast.success(response.data.message);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Verification failed.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, token]);

  return (
    <div className="bg-dark min-h-screen text-white flex flex-col items-center justify-center p-4">
      {loading && (
        <div className="flex flex-col items-center mb-10" role="status">
          <svg
            aria-hidden="true"
            className="w-20 h-20 animate-spin text-gray-200 fill-indigo-500"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.59C100 78.2 77.61 100.59 50 100.59C22.39 100.59 0 78.2 0 50.59C0 22.98 22.39 0.59 50 0.59C77.61 0.59 100 22.98 100 50.59Z"
              fill="currentColor"
            />
            <path
              d="M93.97 39.04C96.39 38.4 97.86 35.91 97.01 33.6C95.19 28.82 92.48 24.47 89.01 20.99C85.53 17.52 81.18 14.81 76.4 12.99C74.09 12.14 71.6 13.61 70.96 16.03C70.31 18.44 71.79 20.93 74.2 21.58C77.85 22.6 81.15 24.56 83.83 27.24C86.51 29.92 88.47 33.22 89.5 36.87C90.15 39.28 92.64 40.76 95.05 40.12C95.37 40.04 95.67 39.94 95.97 39.82L93.97 39.04Z"
              fill="currentFill"
            />
          </svg>
          <span className="my-4 text-lg">Loading...</span>
        </div>
      )}

      {!loading && (
        <span className="my-4 text-xl font-medium">Verification successful!</span>
      )}

      {!loading && !isAuthenticated && (
        <Link
          to={"/login"}
          className="inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
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
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      )}
    </div>
  );
};

export default VerifyEmail;
