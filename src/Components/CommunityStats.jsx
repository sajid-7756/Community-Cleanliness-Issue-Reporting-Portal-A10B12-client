import { useEffect, useState } from "react";
import useAxios from "../Hooks/useAxios";
import { FaUsers, FaCheckCircle, FaHourglassHalf } from "react-icons/fa";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthContext";
import Container from "./Container";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Typewriter } from "react-simple-typewriter";

const CommunityStats = () => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState();
  const [myIssues, setMyIssues] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/users")
      .then((data) => {
        setStats(data.data);
      })
      .catch((err) => console.error(err));
  }, [axiosInstance]);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/myIssue/?email=${user?.email}`)
        .then((res) => {
          setMyIssues(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [axiosSecure, user]);

  const pendingIssue = myIssues.filter((issue) => issue.status === "ongoing");
  const resolvedIssue = myIssues.filter((issue) => issue.status === "ended");

  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <div className="p-6 md:p-10 bg-secondary/50">
      <Container className="p-4 space-y-10">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-6">
            Community
            <span className="text-primary">
              <Typewriter words={["States"]} loop={true}></Typewriter>
            </span>
          </h1>
          <p className="mt-6 text-lg">
            Real-time insights into reported issues across the community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Users */}
          <div className="group bg-white dark:bg-base-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex flex-col items-center space-y-3">
              <div className="bg-primary/10 p-4 rounded-full group-hover:scale-110 transition-transform duration-300">
                <FaUsers className="text-primary text-4xl" />
              </div>
              <div className="text-center">
                <div
                  ref={ref}
                  className="text-4xl font-bold text-base-content mb-1 tabular-nums"
                >
                  {inView ? (
                    <CountUp
                      end={stats?.length || 0}
                      duration={2}
                      separator=","
                    />
                  ) : (
                    0
                  )}
                </div>
                <div className="text-sm font-medium text-base-content/60 uppercase tracking-wide">
                  Registered Users
                </div>
              </div>
            </div>
          </div>

          {/* Resolved Issues */}
          <div className="group bg-white dark:bg-base-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex flex-col items-center space-y-3">
              <div className="bg-success/10 p-4 rounded-full group-hover:scale-110 transition-transform duration-300">
                <FaCheckCircle className="text-success text-4xl" />
              </div>
              <div className="text-center">
                <div
                  ref={ref}
                  className="text-4xl font-bold text-base-content mb-1 tabular-nums"
                >
                  {inView ? (
                    <CountUp
                      end={resolvedIssue?.length || 0}
                      duration={2}
                      separator=","
                    />
                  ) : (
                    0
                  )}
                </div>
                <div className="text-sm font-medium text-base-content/60 uppercase tracking-wide">
                  Issues Resolved
                </div>
              </div>
            </div>
          </div>

          {/* Pending Issues */}
          <div className="group bg-white dark:bg-base-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex flex-col items-center space-y-3">
              <div className="bg-warning/10 p-4 rounded-full group-hover:scale-110 transition-transform duration-300">
                <FaHourglassHalf className="text-warning text-4xl" />
              </div>
              <div className="text-center">
                <div
                  ref={ref}
                  className="text-4xl font-bold text-base-content mb-1 tabular-nums"
                >
                  {inView ? (
                    <CountUp
                      end={pendingIssue?.length || 0}
                      duration={2}
                      separator=","
                    />
                  ) : (
                    0
                  )}
                </div>
                <div className="text-sm font-medium text-base-content/60 uppercase tracking-wide">
                  Issues Pending
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CommunityStats;
