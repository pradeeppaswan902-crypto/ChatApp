import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../config/Api" 

const SignUp = () => {
  const navigate = useNavigate();

  // ✅ single state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
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
    console.log(formData)
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
  const res = await api.post("/user/signup", formData);

  console.log("Signup Response:", res.data);

  // success → login page
  navigate("/login");
} catch (error) {
  console.error(
    "Signup Error:",
    error.response?.data || error.message
  );
}
 finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="card w-full max-w-md shadow-xl bg-base-100">
        <div className="card-body">

          <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>

          {error && (
            <p className="text-red-500 text-center text-sm">{error}</p>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="label">Full Name</label>
              <input
                type="text"
                name="fullName"
                className="input input-bordered w-full"
                placeholder="Enter full name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

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
              <label className="label">Phone</label>
              <input
                type="tel"
                name="phone"
                className="input input-bordered w-full"
                placeholder="Enter phone number"
                value={formData.phone}
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
                placeholder="Create password"
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
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <p className="text-center mt-4 text-sm">
            Already have an account?
            <Link to="/login" className="link link-primary ml-1">
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default SignUp;
