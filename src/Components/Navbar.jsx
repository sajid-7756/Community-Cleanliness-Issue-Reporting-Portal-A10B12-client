import React, { useContext } from "react";
import Container from "./Container";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Provider/AuthContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, setUser, signOutFunc } = useContext(AuthContext);

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
          <a className="btn btn-ghost text-xl">
            Clean <span className="text-accent">Hub</span>
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end space-x-2">
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
              className="btn btn-sm btn-outline hover:btn-primary transition-all duration-300"
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
