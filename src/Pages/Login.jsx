import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../Provider/AuthContext";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAxios from "../Hooks/useAxios";
import { Fade } from "react-awesome-reveal";

const Login = () => {
  const { user, setUser, signInFunc, signInGoogleFunc, setLoading } =
    useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef();
  const axiosInstance = useAxios();

  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInFunc(email, password)
      .then((res) => {
        setUser(res.user);
        toast.success("Sign In Success");
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.code);
        setLoading(false);
        navigate("/signin");
      });

    form.reset();
    navigate(location.state || "/");
  };

  const handleGoogleSignIn = () => {
    signInGoogleFunc()
      .then((result) => {
        const newUser = {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        };

        axiosInstance
          .post("/users", newUser)
          .then(() => {
            toast.success("Google Sign In Success");
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => {
        toast.error(error.code);
      });
  };

  if (user) {
    return <Navigate to={"/"}></Navigate>;
  }

  return (
    <>
      <Fade>
        <title>Clean Hub - Login</title>
        <section className="w-11/12 mx-auto my-12 flex flex-col items-center justify-center">
          <div className="w-full max-w-md bg-base-100 shadow-lg rounded-xl p-6 space-y-4">
            <form onSubmit={handleSignIn} className="space-y-4">
              <h2 className="text-3xl font-bold text-center ">
                Sign <span className="text-primary">In</span>
              </h2>
              <p className="mt-2 text-center text-base-content/70 text-sm">
                Sign in to manage your account and stay updated on community
                progress.
              </p>

              {/* Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  ref={emailRef}
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Password */}
              <div className="form-control relative">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  className="input input-bordered w-full"
                  required
                />
                <p
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute text-black top-9 right-5 cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </p>
              </div>

              {/* Submit */}
              <div className="form-control mt-4">
                <button type="submit" className="btn btn-primary w-full">
                  Sign In
                </button>
              </div>
            </form>

            {/* Google */}
            <button
              onClick={handleGoogleSignIn}
              className="btn bg-white text-black border-[#e5e5e5] w-full"
            >
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Login with Google
            </button>

            {/* Sign Up Redirect */}
            <p className="text-center text-sm text-gray-600 mt-4">
              Don’t have an account?{" "}
              <Link
                to={"/register"}
                className="text-primary font-medium hover:underline hover:text-primary-focus transition"
              >
                Register
              </Link>
            </p>
          </div>
        </section>
      </Fade>
    </>
  );
};

export default Login;
