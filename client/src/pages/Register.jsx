import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";
import { registerUser } from "../services/api";

const Register = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    const { confirmPassword, ...userData } = formData;
    try {
      await registerUser(userData);
      navigate("/auth/login");
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
      <section className="flex justify-center px-4 ">
        <div className="w-full max-w-md rounded-3xl bg-olive-100 p-6 shadow-sm border border-taupe-600/30">
          <h1 className="text-3xl font-black text-teal-400 text-center">
            Create an account
          </h1>
          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="firstName">First name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Enter your first name"
                className="mt-1 w-full rounded-xl border border-taupe-600/30 p-3"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="lastName">Last name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Enter your last name"
                className="mt-1 w-full rounded-xl border border-taupe-600/30 p-3"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Choose a username"
                className="mt-1 w-full rounded-xl border border-taupe-600/30 p-3"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                className="mt-1 w-full rounded-xl border border-taupe-600/30 p-3"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                className="mt-1 w-full rounded-xl border border-taupe-600/30 p-3"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                className="mt-1 w-full rounded-xl border border-taupe-600/30 p-3"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-teal-400 px-4 py-3 font-bold text-olive-100 cursor-pointer hover:bg-teal-500"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
            <p className="mt-5 text-center text-sm text-taupe-600">
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="font-bold text-teal-400 hover:text-teal-500"
              >
                Log in
              </Link>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Register;
