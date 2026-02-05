import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import api from "../config/Api";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/user/signup", formData);
      navigate("/login");
    } catch {
      setError("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ===== FORM ===== */}
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="card w-full max-w-md bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="text-2xl font-bold text-center">Sign Up</h2>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                name="fullName"
                className="input input-bordered w-full"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
              />
              <input
                name="email"
                className="input input-bordered w-full"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                name="phone"
                className="input input-bordered w-full"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
              />
              <input
                name="password"
                type="password"
                className="input input-bordered w-full"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />

              <button className="btn btn-primary w-full">
                {loading ? "Creating..." : "Create Account"}
              </button>
            </form>

            <p className="text-center text-sm mt-3">
              Already have an account?
              <Link to="/login" className="link link-primary ml-1">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* ===== FLOATING BUTTON ===== */}
      <button className="btn btn-primary btn-circle fixed bottom-6 right-6 z-50">
        <IoSettingsOutline size={22} />
      </button>

      {/* ===== FLYONUI CAROUSEL ===== */}
      <div
        id="horizontal-thumbnails"
        data-carousel='{ "loadingClasses": "opacity-0" }'
        className="relative w-full max-w-4xl mx-auto my-16"
      >
        <div className="carousel">
          <div className="carousel-body h-[400px]">
            <div className="carousel-slide">
              <img
                src="https://cdn.flyonui.com/fy-assets/components/carousel/image-21.png"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="carousel-slide">
              <img
                src="https://cdn.flyonui.com/fy-assets/components/carousel/image-14.png"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="carousel-slide">
              <img
                src="https://cdn.flyonui.com/fy-assets/components/carousel/image-7.png"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <button className="carousel-prev start-4 size-10 bg-base-100 rounded-full shadow">
            ‹
          </button>

          <button className="carousel-next end-4 size-10 bg-base-100 rounded-full shadow">
            ›
          </button>
        </div>
      </div>
    </>
  );
};

export default SignUp;
