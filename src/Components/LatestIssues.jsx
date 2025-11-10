import React, { useEffect, useState } from "react";
import { FaTrash, FaHardHat, FaTools, FaRoad } from "react-icons/fa";
import useAxios from "../Hooks/useAxios";
import { Link } from "react-router";
import Container from "./Container";

const LatestIssues = () => {
  const [latestIssues, setlatestIssues] = useState([]);
  const axiosInstance = useAxios();

  useEffect(() => {
    axiosInstance
      .get("/latest-issues")
      .then((res) => {
        console.log(res.data);
        setlatestIssues(res.data);
      })
      .catch((err) => console.error(err));
  }, [axiosInstance]);

  return (
    <Container className="p-4 md:p-8 min-h-screen">
      <h2 className="text-3xl font-bold mb-8">
        Latest Local <span className="text-primary">Issues</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {latestIssues.map((issue, index) => {
          const Icon =
            issue.category === "Garbage"
              ? FaTrash
              : issue.category === "Illegal Construction"
              ? FaHardHat
              : issue.category === "Broken Public Property"
              ? FaTools
              : issue.category === "Road Damage"
              ? FaRoad
              : FaTools;

          const badgeClass =
            issue.category === "Garbage"
              ? "badge-primary"
              : issue.category === "Illegal Construction"
              ? "badge-secondary"
              : issue.category === "Broken Public Property"
              ? "badge-warning"
              : issue.category === "Road Damage"
              ? "badge-error"
              : "badge-neutral";

          return (
            <div
              key={index}
              className="card bg-base-100 shadow-xl border-t-4 border-primary transition-shadow duration-300 hover:shadow-2xl"
            >
              <figure>
                <img
                  src={issue.image}
                  alt={issue.title}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
              </figure>

              <div className="card-body p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="card-title text-base-content text-xl font-semibold leading-tight pr-2">
                    {issue.title}
                  </h3>
                  <div
                    className={`badge ${badgeClass} text-primary-content font-medium text-xs whitespace-nowrap`}
                  >
                    <Icon className="mr-1 h-3 w-3" />
                    {issue.category}
                  </div>
                </div>

                {/* Location */}
                <p className="text-sm text-primary italic mb-2">
                  <span className="font-bold">Location:</span>{" "}
                  {issue.location}
                </p>

                <p className="text-base-content text-opacity-80 line-clamp-2 text-sm mb-4">
                  {issue.description}
                </p>

                <div className="card-actions justify-end">
                  <Link
                    to={`/issue-details/${issue._id}`}
                    className="btn btn-primary text-primary-content hover:bg-primary-focus"
                  >
                    See Details
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default LatestIssues;
