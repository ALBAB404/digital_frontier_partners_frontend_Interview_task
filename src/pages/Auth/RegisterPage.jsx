import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { Field } from "../../components/Field";

export const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [gettingLocation, setGettingLocation] = useState(false);

  const submitForm = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/register`,
        data
      );
      if (res.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 500) {
        setError("email", { message: "Email already exists" });
      }
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = () => {
    setGettingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            latitude: position.coords.latitude.toFixed(6),
            longitude: position.coords.longitude.toFixed(6),
          });
          setGettingLocation(false);
        },
        (error) => {
          setError("Unable to get your location. Please enter manually.");
          setGettingLocation(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
      setGettingLocation(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <svg
              className="h-12 w-12 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Join Book Share</h2>
          <p className="text-gray-600 mt-2">
            Create an account to start sharing books
          </p>
        </div>

        <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
          <Field
            label="Full Name"
            error={errors.name?.message}
            htmlFor="name"
            labelClassName="block text-sm font-medium text-gray-700 mb-2"
          >
            <input
              id="name"
              type="text"
              {...register("name", { required: "Full Name is required" })}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                errors.name ? "!border-red-500" : "border-gray-200"
              }`}
              placeholder="John Doe"
            />
          </Field>

          <Field
            label="Email"
            error={errors.email?.message}
            htmlFor="email"
            labelClassName="block text-sm font-medium text-gray-700 mb-2"
          >
            <input
              type="email"
              id="email"
              name="email"
              {...register("email", { required: "Email is required" })}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                errors.email ? "!border-red-500" : "border-gray-200"
              }`}
              placeholder="Enter your email"
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Password"
              error={errors.password?.message}
              htmlFor="password"
              labelClassName="block text-sm font-medium text-gray-700 mb-2"
            >
              <input
                id="password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 8 characters long",
                  },
                })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.password ? "!border-red-500" : "border-gray-200"
                }`}
                placeholder="********"
              />
            </Field>

            <Field
              label="Confirm Password"
              error={errors.password_confirmation?.message}
              htmlFor="password_confirmation"
              labelClassName="block text-sm font-medium text-gray-700 mb-2"
            >
              <input
                id="password_confirmation"
                type="password"
                {...register("password_confirmation", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.password_confirmation
                    ? "!border-red-500"
                    : "border-gray-200"
                }`}
                placeholder="********"
              />
            </Field>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <button
                type="button"
                onClick={getCurrentLocation}
                disabled={gettingLocation}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium disabled:opacity-50"
              >
                {gettingLocation
                  ? "Getting location..."
                  : "Use current location"}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Latitude" error={errors.latitude?.message}>
                <input
                  type="number"
                  step="any"
                  {...register("latitude", {
                    required: "Latitude is required",
                  })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.latitude ? "!border-red-500" : "border-gray-200"
                  }`}
                  placeholder="Latitude"
                />
              </Field>

              <Field label="Longitude" error={errors.longitude?.message}>
                <input
                  type="number"
                  step="any"
                  {...register("longitude", {
                    required: "Longitude is required",
                  })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.longitude ? "!border-red-500" : "border-gray-200"
                  }`}
                  placeholder="Longitude"
                />
              </Field>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
