import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../config/Api";

const Login = () => {
  const navigate = useNavigate();

  // ✅ single state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ common handler
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/user/login", formData, {
        withCredentials: true,
      });

      console.log("Login Response:", res.data);

      // success → home
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="card w-full max-w-md shadow-xl bg-base-100">
        <div className="card-body">

          <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

          {error && (
            <p className="text-red-500 text-center text-sm">{error}</p>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                className="input input-bordered w-full"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="label">Password</label>
              <input
                type="password"
                name="password"
                className="input input-bordered w-full"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center mt-4 text-sm">
            Don’t have an account?
            <Link to="/signup" className="link link-primary ml-1">
              Sign up
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;
