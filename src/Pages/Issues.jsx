import { useEffect, useState } from "react";
import Container from "../Components/Container";
import { Link } from "react-router";
import Loading from "../Components/Loading";
import useAxios from "../Hooks/useAxios";

import { Fade } from "react-awesome-reveal";

import {
  Search,
  MapPin,
  ArrowRight,
} from "lucide-react";

const Issues = () => {
  const axiosInstance = useAxios();
  const [issues, setIssues] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get("/issues", {
        params: { category, status },
      })
      .then((res) => {
        setIssues(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [axiosInstance, category, status]);


  // Handle Search, Sort and Local Filtering
  useEffect(() => {
    let result = [...issues];

    // Search
    if (searchTerm) {
      result = result.filter(
        (issue) =>
          issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          issue.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === "budget-high") return b.amount - a.amount;
      if (sortBy === "budget-low") return a.amount - b.amount;
      if (sortBy === "newest") return new Date(b.date) - new Date(a.date);
      if (sortBy === "oldest") return new Date(a.date) - new Date(b.date);
      return 0;
    });

    setFilteredIssues(result);
  }, [issues, searchTerm, sortBy]);

  if (loading) return <Loading />;

  return (
    <div className="bg-base-200/30 min-h-screen">
      <Container className="py-12 md:py-20">
        <title>Explore Issues | CleanHub</title>

        <header className="mb-16 text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-black text-secondary tracking-tight mb-6">
            Community <span className="text-primary italic">Reports</span>
          </h1>
          <p className="text-lg text-secondary/60 font-medium leading-relaxed">
            Discover local challenges reported by citizens. Join the movement to
            clean up and upgrade our environment.
          </p>
        </header>

        {/* Controls Bar */}
        <div className="bg-base-100 rounded-[2.5rem] border border-base-200 p-4 md:p-6 mb-12 shadow-sm flex flex-col lg:flex-row gap-6 items-center">
          {/* Search */}
          <div className="relative w-full lg:flex-1">
            <Search
              className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/40"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by title or location..."
              className="input input-lg w-full pl-14 rounded-2xl bg-base-200/50 border-transparent focus:bg-base-100 transition-all font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 w-full lg:w-auto">
            <div className="flex-1 lg:w-48">
              <select
                onChange={(e) => setCategory(e.target.value)}
                className="select select-lg w-full rounded-2xl bg-base-200/50 border-transparent font-bold text-secondary/70 focus:bg-base-100"
                value={category}
              >
                <option value="all">All Categories</option>
                <option value="Garbage">Garbage</option>
                <option value="Illegal Construction">
                  Illegal Construction
                </option>
                <option value="Broken Public Property">
                  Broken Public Property
                </option>
                <option value="Road Damage">Road Damage</option>
              </select>
            </div>

            <div className="flex-1 lg:w-48">
              <select
                onChange={(e) => setStatus(e.target.value)}
                className="select select-lg w-full rounded-2xl bg-base-200/50 border-transparent font-bold text-secondary/70 focus:bg-base-100"
                value={status}
              >
                <option value="all">Any Status</option>
                <option value="ongoing">Ongoing</option>
                <option value="ended">Ended</option>
              </select>
            </div>

            <div className="flex-1 lg:w-56">
              <select
                onChange={(e) => setSortBy(e.target.value)}
                className="select select-lg w-full rounded-2xl bg-base-200/50 border-transparent font-bold text-secondary/70 focus:bg-base-100"
                value={sortBy}
              >
                <option value="newest">Sort by: Newest</option>
                <option value="oldest">Sort by: Oldest</option>
                <option value="budget-high">Budget: High to Low</option>
                <option value="budget-low">Budget: Low to High</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <Fade triggerOnce>
          {filteredIssues.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-base-100 rounded-[3rem] border-2 border-dashed border-base-200">
              <div className="w-24 h-24 bg-base-200 rounded-full flex items-center justify-center mb-6 text-primary/40">
                <Search size={48} />
              </div>
              <h3 className="text-2xl font-black text-secondary">
                No issues found
              </h3>
              <p className="text-secondary/50 font-medium">
                Try adjusting your filters or search terms
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredIssues.map((issue) => (
                <div
                  key={issue._id}
                  className="group bg-base-100 rounded-[2.5rem] border border-base-200 overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-2 flex flex-col"
                >
                  {/* Image Header */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={issue.image}
                      alt={issue.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-base-content/10"></div>

                    {/* Category Tag */}
                    <div className="absolute top-6 right-6">
                      <span className="badge badge-lg py-5 px-6 rounded-2xl bg-white/90 backdrop-blur-md border-none text-secondary font-black text-xs uppercase tracking-widest shadow-xl">
                        {issue.category}
                      </span>
                    </div>

                    {/* Budget Tag */}
                    <div className="absolute bottom-6 left-6">
                      <div className="bg-primary text-white p-3 px-5 rounded-2xl font-black text-xl shadow-2xl">
                        ${issue.amount}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-4">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          issue.status === "ongoing"
                            ? "bg-warning animate-pulse"
                            : "bg-success"
                        }`}
                      ></div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-secondary/40">
                        {issue.status}
                      </span>
                    </div>

                    <h2 className="text-2xl font-extrabold text-secondary leading-tight mb-4 group-hover:text-primary transition-colors">
                      {issue.title}
                    </h2>

                    <div className="flex items-center gap-2 text-secondary/60 mb-6 font-bold text-sm">
                      <MapPin size={16} className="text-primary" />
                      {issue.location}
                    </div>

                    <div className="mt-auto pt-6 border-t border-base-200 flex items-center justify-between">
                      <div className="text-xs font-bold text-secondary/40 italic">
                        Reported {new Date(issue.date).toLocaleDateString()}
                      </div>
                      <Link
                        to={`/issue-details/${issue._id}`}
                        className="btn btn-primary btn-circle btn-md shadow-lg shadow-primary/20 hover:scale-110 active:scale-95 transition-all"
                      >
                        <ArrowRight size={20} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Fade>
      </Container>
    </div>
  );
};

export default Issues;
