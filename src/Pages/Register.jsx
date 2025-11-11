import React, { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthContext";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAxios from "../Hooks/useAxios";

const Register = () => {
  const axiosInstance = useAxios();
  const {
    user,
    setUser,
    signUpFunc,
    signOutFunc,
    updateProfileFunc,
    signInGoogleFunc,
    setLoading,
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const displayName = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photoURL = form.photoURL.value;

    const nameRegex = /^[a-zA-Z\s]{3,30}$/;
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!nameRegex.test(displayName)) {
      return toast.error("Name must be 3–30 letters only.");
    }

    if (!emailRegex.test(email)) {
      return toast.error("Please enter a valid email address.");
    }

    if (!passwordRegex.test(password)) {
      return toast.error(
        "Password must be at least 6 characters, include uppercase, lowercase, number, and special character."
      );
    }

    signUpFunc(email, password)
      .then(() => {
        toast.success("Sign Up Success");
        updateProfileFunc(displayName, photoURL)
          .then(() => {
            signOutFunc()
              .then(() => {
                setUser(null);
                navigate("/login");
                setLoading(false);
              })
              .catch((err) => {
                toast.error(err);
              });
          })
          .catch((err) => {
            toast.error(err);
          });
      })
      .catch((e) => {
        if (e.code === "auth/email-already-in-use") {
          toast.error("User already exists in the database.");
        } else if (e.code === "auth/weak-password") {
          toast.error("Bhai tomake at least 6 ta digit er pass dite hobe");
        } else if (e.code === "auth/invalid-email") {
          toast.error("Invalid email format. Please check your email.");
        } else if (e.code === "auth/user-not-found") {
          toast.error("User not found. Please sign up first.");
        } else if (e.code === "auth/wrong-password") {
          toast.error("Wrong password. Please try again.");
        } else if (e.code === "auth/user-disabled") {
          toast.error("This user account has been disabled.");
        } else if (e.code === "auth/too-many-requests") {
          toast.error("Too many attempts. Please try again later.");
        } else if (e.code === "auth/operation-not-allowed") {
          toast.error("Operation not allowed. Please contact support.");
        } else if (e.code === "auth/network-request-failed") {
          toast.error("Network error. Please check your connection.");
        } else {
          toast.error(e.message || "An unexpected error occurred.");
        }
        setLoading(false);
      });

    form.reset();
  };

  const handleGoogleSignIn = () => {
    signInGoogleFunc()
      .then((result) => {
        console.log(result.user);
        const newUser = {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        };

        axiosInstance
          .post("/users", newUser)
          .then((data) => {
            console.log(data.data);
            toast.success("Google Sign In Success");
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  if (user) {
    return <Navigate to={"/"}></Navigate>;
  }

  return (
    <>
    <title>Clean Hub - Register</title>
      <section className="w-11/12 mx-auto my-12 flex justify-center">
        <form
          onSubmit={handleSignUp}
          className="w-full max-w-md bg-base-100 shadow-lg rounded-xl p-6 space-y-4"
        >
          <h2 className="text-2xl font-bold text-center text-primary">
            Sign Up
          </h2>

          {/* Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* PhoroURL */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              type="text"
              name="photoURL"
              placeholder="Enter your Photo URL"
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
          <div className="form-control mt-4 space-y-4">
            <button type="submit" className="btn btn-primary w-full">
              Sign Up
            </button>

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

            {/* Sign In Redirect */}
            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-primary font-medium hover:underline hover:text-primary-focus transition"
              >
                Login
              </a>
            </p>
          </div>
        </form>
      </section>
    </>
  );
};

export default Register;
