import { useState } from "react";
import { useFormik } from "formik";
import { BasicSchema } from "../validation/schema";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = (values, actions) => {
    navigate("/");
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      userName: "",
      terms: false,
    },
    validationSchema: BasicSchema,
    onSubmit,
  });

  return (
    <div className="dark flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 pt-40 min-h-screen bg-[var(--bg-color)]">
      <div className="max-w-md w-full space-y-8 bg-neutral-900 p-8 rounded-2xl shadow-2xl border border-neutral-800">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-white tracking-tight">
            Create an Account
          </h2>
        </div>

        <form
          className="mt-8 space-y-6"
          onSubmit={formik.handleSubmit}
        >
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-neutral-300 block">
                Username
              </label>
              <input
                type="text"
                name="userName"
                value={formik.values.userName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-neutral-700 bg-neutral-800 text-white placeholder-neutral-500"
                placeholder="Enter your username"
              />
              {formik.touched.userName && formik.errors.userName && (
                <p className="text-sm text-red-500 mt-1">{formik.errors.userName}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-neutral-300 block">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-neutral-700 bg-neutral-800 text-white placeholder-neutral-500"
                placeholder="name@example.com"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-sm text-red-500 mt-1">{formik.errors.email}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-neutral-300 block">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="appearance-none rounded-lg relative block w-full px-3 py-3 pr-10 border border-neutral-700 bg-neutral-800 text-white placeholder-neutral-500"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-white cursor-pointer"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-sm text-red-500 mt-1">{formik.errors.password}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-neutral-300 block">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="appearance-none rounded-lg relative block w-full px-3 py-3 pr-10 border border-neutral-700 bg-neutral-800 text-white placeholder-neutral-500"
                  placeholder="confirm password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-white cursor-pointer"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <p className="text-sm text-red-500 mt-1">{formik.errors.confirmPassword}</p>
                )}
            </div>
          </div>

          <div className="flex items-center text-sm">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              checked={formik.values.terms}
              onChange={formik.handleChange}
              className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-neutral-700 rounded bg-neutral-800 cursor-pointer"
            />
            <label htmlFor="terms" className="ml-2 block text-neutral-400">
              I agree to the{" "}
              <a href="#terms" className="text-emerald-500 hover:underline">
                Terms and Conditions
              </a>
            </label>
          </div>

          <div>
            <button
              type="submit"
              disabled={!formik.values.terms}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white transition-all shadow-lg shadow-emerald-900/20 ${
                !formik.values.terms
                  ? "bg-neutral-700 opacity-50 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-500 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              }`}
            >
              Get Started
            </button>
          </div>

          <div className="text-center text-sm text-neutral-400">
            Already have an account?{" "}
            <Link to="/login" className="text-emerald-500 hover:underline font-medium">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;