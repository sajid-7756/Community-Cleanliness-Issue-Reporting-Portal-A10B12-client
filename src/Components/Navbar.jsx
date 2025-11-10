import React, { useContext, useEffect, useState } from "react";
import Container from "./Container";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Provider/AuthContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, setUser, signOutFunc } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  const handleSignOut = () => {
    signOutFunc()
      .then(() => {
        toast.success("Sign Out Success");
        setUser(null);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/issues"}>All Issues</NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to={"/add-issues"}>Add Issues</NavLink>
          </li>
          <li>
            <NavLink to={"/my-issues"}>My Issues</NavLink>
          </li>
          <li>
            <NavLink to={"/my-contribution"}>My Contribution</NavLink>
          </li>
        </>
      )}
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <Container className="flex">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link to={'/'} className="btn btn-ghost text-xl">
            Clean <span className="text-accent">Hub</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end space-x-2">
          <label className="flex cursor-pointer gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>
            <input
              onChange={(e) => handleTheme(e.target.checked)}
              type="checkbox"
              checked={theme === "dark"}
              className="toggle theme-controller"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </label>
          {user ? (
            <div className="dropdown dropdown-end avatar indicator relative">
              <span className="indicator-item badge badge-primary absolute top-1 -right-4 animate-pulse hidden sm:block">
                {user?.displayName}
              </span>
              <label tabIndex={0} className="cursor-pointer">
                <img
                  title={user.displayName}
                  className="w-12 h-12 rounded-full"
                  src={user?.photoURL}
                  alt={user?.displayName}
                />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-30 absolute top-14 "
              >
                <li>
                  <button className="btn btn-outline" onClick={handleSignOut}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to={"/login"}
              className="btn btn-outline hover:btn-primary transition-all duration-300"
            >
              Sign In
            </Link>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
