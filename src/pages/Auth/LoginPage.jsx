import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { Field } from "../../components/Field";
import useAuth from "../../hooks/useAuth";

export const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const {register, handleSubmit, formState: {errors}, setError} = useForm();
  const navigate = useNavigate();
  const {setAuth} = useAuth();
  const submitForm = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/login`, data)
      if(res.status === 200) {
        const {result} = res.data;
        if(result) {
          const authToken = result;
          const user = data.email;
          setAuth({authToken, user});
          localStorage.setItem("authToken", authToken);
          localStorage.setItem("user", user);
          if (data.email == "admin@gmail.com" || data.email == "superadmin@gmail.com") {
            navigate("/admin-dashboard");
          } else {
            navigate("/");
          }
        }
      }

    } catch (error) {
      console.log(error);
      if(error.response.status === 500) {
        setError("email", {message: "Invalid email or password"});
      }
    } finally {
      setLoading(false);
    }
    
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
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
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back!</h2>
          <p className="text-gray-600 mt-2">
            Login to share and discover books
          </p>
        </div>

        <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
          <Field error={errors.email?.message} label="Email Address" htmlFor="email" labelClassName="block text-sm font-medium text-gray-700 mb-2">
            <input
              id="email"
              name="email"
              type="email"
              {...register("email", { required: "Email is required" })}
              className={`auth-input w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all border ${errors.email ? "!border-red-500" : "border-gray-200"}`}
              placeholder="john@example.com"
            />
          </Field>
          <Field error={errors.password?.message} label="Password" htmlFor="password" labelClassName="block text-sm font-medium text-gray-700 mb-2" error={errors.password?.message}>
            <input
              type="password"
              id="password"
              name="password"
              {...register("password", { required: "Password is required", minLength: {value: 6, message: "Password must be at least 8 characters long"} })}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.password ? "!border-red-500" : "border-gray-200"}`}
              placeholder="Enter your password"
            />
          </Field>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
