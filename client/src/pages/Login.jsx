import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";
import { loginUser } from "../services/api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await loginUser(formData);
      login(data.token);
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Link
        to="/"
        className="flex items-center gap-2 m-4 cursor-pointer text-taupe-600 hover:text-taupe-500"
      >
        <ChevronLeft />
        <p>Back</p>
      </Link>
      <section className="flex justify-center px-4">
        <div className="w-full max-w-md rounded-3xl bg-olive-100 p-6 shadow-sm border border-taupe-600/30">
          <h1 className="text-3xl font-black text-teal-400 text-center">
            Welcome back!
          </h1>
          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="identifier">Username or email</label>
              <input
                id="identifier"
                name="identifier"
                type="text"
                placeholder="Enter your username or email"
                className="mt-1 w-full rounded-xl border border-taupe-600/30 p-3"
                value={formData.identifier}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                className="mt-1 w-full rounded-xl border border-taupe-600/30 p-3"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-teal-400 px-4 py-3 font-bold text-olive-100 cursor-pointer hover:bg-teal-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>

            <p className="mt-5 text-center text-sm text-taupe-600">
              Don't have an account?{" "}
              <Link
                to="/auth/register"
                className="font-bold text-teal-400 hover:text-teal-500"
              >
                Create one
              </Link>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Login;
