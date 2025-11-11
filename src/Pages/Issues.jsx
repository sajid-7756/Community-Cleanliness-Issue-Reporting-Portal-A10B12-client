import { useEffect, useState } from "react";
import {
  FaTrash,
  FaHardHat,
  FaTools,
  FaRoad,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";
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
        <Container className="min-h-screen bg-linear-to-br p-4 md:p-8">
          <div className="mb-10">
            <h1 className="text-4xl font-bold mb-6">
              Recent <span className="text-primary">Complaints</span>
            </h1>
            <p className="mt-6 text-lg">
              Community reported issues awaiting resolution
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {issues.map((issue, index) => {
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

              const colorScheme =
                issue.category === "Garbage"
                  ? {
                      gradient: "from-green-400 to-emerald-600",
                      bg: "bg-green-500",
                      text: "text-green-600",
                    }
                  : issue.category === "Illegal Construction"
                  ? {
                      gradient: "from-orange-400 to-red-600",
                      bg: "bg-orange-500",
                      text: "text-orange-600",
                    }
                  : issue.category === "Broken Public Property"
                  ? {
                      gradient: "from-amber-400 to-yellow-600",
                      bg: "bg-amber-500",
                      text: "text-amber-600",
                    }
                  : issue.category === "Road Damage"
                  ? {
                      gradient: "from-red-400 to-rose-600",
                      bg: "bg-red-500",
                      text: "text-red-600",
                    }
                  : {
                      gradient: "from-gray-400 to-slate-600",
                      bg: "bg-gray-500",
                      text: "text-gray-600",
                    };

              return (
                <div
                  key={issue._id}
                  className="group relative bg-base-100 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Card Content */}
                  <div className="relative bg-base-100 rounded-2xl overflow-hidden h-full flex flex-col">
                    {/* Image Section */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={issue.image}
                        alt={issue.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
                      />

                      {/* Subtle Overlay - Always Visible */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent"></div>

                      {/* Category Badge - Always Visible */}
                      <div
                        className={`absolute top-4 right-4 ${colorScheme.bg} text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg flex items-center gap-2 transform transition-all duration-300 group-hover:scale-110`}
                      >
                        <Icon className="h-4 w-4" />
                        {issue.category}
                      </div>
                    </div>

                    {/* Content Section - Always Visible */}
                    <div className="p-6 flex flex-col grow bg-base-100">
                      {/* Title */}
                      <h3 className="text-xl font-bold mb-3 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                        {issue.title}
                      </h3>

                      {/* Location */}
                      <div className="flex items-center text-sm font-medium mb-4 group-hover:text-blue-600 transition-colors duration-300">
                        <FaMapMarkerAlt className="h-4 w-4 mr-2 shrink-0" />
                        <span className="truncate">{issue.location}</span>
                      </div>

                      {/* Description */}
                      <p className="text-sm leading-relaxed mb-4 grow line-clamp-3">
                       Amount: <span className="font-semibold">{issue.amount} $</span>
                      </p>

                      {/* Divider */}
                      <div
                        className={`h-px bg-linear-to-r ${colorScheme.gradient} mb-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}
                      ></div>

                      {/* Action Button */}
                      <Link
                        to={`/issue-details/${issue._id}`}
                        className={`w-full ${colorScheme.bg} hover:opacity-90 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group-hover:gap-4 shadow-md hover:shadow-xl transform active:scale-95`}
                      >
                        <span>See Details</span>
                        <FaArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </div>

                    {/* Shine Effect on Hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700">
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      )}
    </Container>
  );
};

export default Issues;
