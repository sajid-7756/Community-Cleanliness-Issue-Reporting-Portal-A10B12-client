import {  useEffect, useState } from "react";
import { FaTrash, FaHardHat, FaTools, FaRoad } from "react-icons/fa";
import Container from "../Components/Container";
import { Link } from "react-router";
import Loading from "../Components/Loading";
import useAxios from "../Hooks/useAxios";

const Issues = () => {
  const axiosInstance = useAxios();
  const [issues, setIssues] = useState([]);
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/issues", {
        params: {
          category,
          status,
        },
      })
      .then((res) => {
        setIssues(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [axiosInstance, category, status]);

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <Container className="p-4 md:p-8 min-h-screen">
      <title>All Issues</title>
      <h2 className="text-3xl font-bold mb-8">
        All <span className="text-primary">Issues</span>
      </h2>

      <div className="flex justify-between flex-wrap gap-4 mb-6">
        {/* Category Filter */}
        <select
          onChange={(e) => setCategory(e.target.value)}
          className="select select-bordered bg-white dark:bg-base-100"
        >
          <option value="all">All Categories</option>
          <option value="Garbage">Garbage</option>
          <option value="Illegal Construction">Illegal Construction</option>
          <option value="Broken Public Property">Broken Public Property</option>
          <option value="Road Damage">Road Damage</option>
        </select>

        {/* Status Filter */}
        <select
          onChange={(e) => setStatus(e.target.value)}
          className="select select-bordered bg-white dark:bg-base-100"
        >
          <option value="all">All Status</option>
          <option value="ongoing">Ongoing</option>
          <option value="ended">Ended</option>
        </select>
      </div>

      {issues.length === 0 ? (
        <div className="text-center text-lg text-neutral-content">
          Issue Not Found
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {issues.map((issue, index) => {
            // choose icon
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

            // choose badge class
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
                {/* Image */}
                {issue.image && (
                  <figure>
                    <img
                      src={issue.image}
                      alt={issue.title}
                      className="w-full h-48 object-cover rounded-t-xl"
                    />
                  </figure>
                )}

                <div className="card-body p-5">
                  {/* Title + Category */}
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

                  {/* Description */}
                  <p className="text-base-content text-opacity-80 line-clamp-2 text-sm mb-4">
                    {issue.description}
                  </p>

                  {/* Details Button */}
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
      )}
    </Container>
  );
};

export default Issues;
