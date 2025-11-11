import { useContext, useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router";
import {
  FaTrash,
  FaHardHat,
  FaTools,
  FaRoad,
  FaArrowLeft,
} from "react-icons/fa";
import Container from "../Components/Container";
import { AuthContext } from "../Provider/AuthContext";
import Loading from "../Components/Loading";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAxios from "../Hooks/useAxios";
import toast from "react-hot-toast";

const IssueDetails = () => {
  const { user } = useContext(AuthContext);
  const data = useLoaderData();
  const [showModal, setShowModal] = useState(false);
  const axiosSecure = useAxiosSecure();
  const axiosInstance = useAxios();
  const [contricbutions, setContricbutions] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const handlePayUpContribution = (e) => {
    e.preventDefault();

    const additionalInfo = e.target.additionalInfo.value;
    const address = e.target.address.value;
    const phoneNumber = e.target.number.value;
    const amount = e.target.amount.value;
    const date = e.target.date.value;

    const newContribution = {
      issueId: data._id,
      amount,
      phone: phoneNumber,
      address,
      date,
      additionalInfo: additionalInfo,
      name: user?.displayName,
      email: user?.email,
      image: user?.photoURL,
      category: data?.category,
      title: data?.title,
    };

    axiosSecure.post("/contributions", newContribution).then((data) => {
      if (data.data.insertedId) {
        toast.success("contribution success");
        setShowModal(false);
        console.log("data after post", data.data);
        setRefetch((prev) => !prev);
      }
    });
  };

  useEffect(() => {
    axiosInstance.get(`/contributions/${data?._id}`).then((data) => {
      setContricbutions(data.data);
      console.log(data.issueId);
      setLoading(false);
    });
  }, [axiosInstance, data?._id, refetch]);

  const decContribution = contricbutions.sort((a, b) => b.amount - a.amount);
  console.log(decContribution);

  const { Icon, badgeClass } =
    data.category === "Garbage"
      ? { Icon: FaTrash, badgeClass: "badge-primary" }
      : data.category === "Illegal Construction"
      ? { Icon: FaHardHat, badgeClass: "badge-secondary" }
      : data.category === "Broken Public Property"
      ? { Icon: FaTools, badgeClass: "badge-warning" }
      : data.category === "Road Damage"
      ? { Icon: FaRoad, badgeClass: "badge-error" }
      : { Icon: FaTools, badgeClass: "badge-neutral" };

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <Container className="p-6 md:p-10 min-h-screen space-y-10">
      <title>Issue Details</title>
      <h2 className="text-3xl font-bold mb-8">
        <Link onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </Link>
        Issue <span className="text-primary">Details</span>
      </h2>
      <div className="card bg-base-100 shadow-xl w-full mx-auto overflow-hidden hover:shadow-2xl transition-all duration-300">
        {/* Image */}
        <figure className="relative overflow-hidden">
          <img
            src={data.image}
            alt={data.title}
            className="w-full h-100 object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-base-100/10 to-transparent"></div>
        </figure>

        <div className="card-body space-y-4 p-6">
          {/* Title */}
          <div className="border-l-4 border-primary pl-3 -ml-3">
            <h2 className="card-title text-2xl font-bold text-base-content">
              {data.title}
            </h2>
          </div>

          {/* Category & Location */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm">
            <span
              className={`badge ${badgeClass} badge-lg text-primary-content font-semibold px-3 py-2 flex items-center gap-2 w-fit`}
            >
              <Icon className="h-3.5 w-3.5" />
              {data.category}
            </span>
            <div className="flex items-center gap-2 text-base-content/80">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-accent"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium">{data.location}</span>
            </div>
          </div>

          {/* Description */}
          <div className="bg-base-200/50 rounded-lg p-4 border border-base-300/30">
            <p className="text-base-content/80 leading-relaxed">
              {data.description}
            </p>
          </div>

          {/* Date & Amount */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-4 bg-base-200/30 rounded-lg border border-base-300/20">
            <div className="flex items-center gap-2 text-base-content/70">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-info"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium">{data.date}</span>
            </div>
            <div className="flex items-center gap-2 bg-success/10 text-success px-3 py-1.5 rounded-full border border-success/20">
              <span className="font-bold">Amount: ${data.amount}</span>
            </div>
          </div>

          {/* Pay Contribution Button */}
          <div className="card-actions justify-end mt-2 pt-4 border-t border-base-300/30">
            <button
              className="btn btn-primary px-8 rounded-full font-semibold text-primary-content hover:scale-105 transform transition-all duration-300 hover:shadow-lg active:scale-95"
              onClick={() => setShowModal(true)}
            >
              Pay Clean-Up Contribution
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box w-full max-w-lg bg-white dark:bg-base-100">
            <h3 className="font-bold text-lg mb-4">Contribution Form</h3>

            <form onSubmit={handlePayUpContribution} className="space-y-4">
              {/* Issue Title */}
              <div>
                <label className="label">Issue Title</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={data?.title}
                  readOnly
                  className="input input-bordered w-full"
                />
              </div>

              {/* Amount */}
              <div>
                <label className="label">Amount</label>
                <input
                  type="number"
                  name="amount"
                  defaultValue={data?.amount}
                  className="input input-bordered w-full"
                />
              </div>

              {/* Contributor Name */}
              <div>
                <label className="label">Contributor Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={user?.displayName}
                  placeholder="Your name"
                  className="input input-bordered w-full"
                />
              </div>

              {/* Email */}
              <div>
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  defaultValue={user?.email}
                  readOnly
                  className="input input-bordered w-full"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="label">Phone Number</label>
                <input
                  type="tel"
                  name="number"
                  placeholder="Your phone number"
                  className="input input-bordered w-full"
                />
              </div>

              {/* Address */}
              <div>
                <label className="label">Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Your address"
                  className="input input-bordered w-full"
                />
              </div>

              {/* Date */}
              <div>
                <label className="label">Date</label>
                <input
                  type="text"
                  name="date"
                  defaultValue={new Date().toLocaleDateString()}
                  readOnly
                  className="input input-bordered w-full"
                />
              </div>

              {/* Additional Info */}
              <div>
                <label className="label">Additional Info</label>
                <textarea
                  placeholder="Any extra details..."
                  name="additionalInfo"
                  className="textarea textarea-bordered w-full"
                ></textarea>
              </div>

              {/* Buttons */}
              <div className="modal-action">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit Contribution
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="overflow-x-auto">
        <h2 className="text-4xl font-bold mb-8">
          Contributors of this <span className="text-primary">Issue</span>
        </h2>
        {decContribution.length === 0 ? (
          <h3 className=" text-warning text-xl font-semibold">
            No one Contributed for this Issue
          </h3>
        ) : (
          <table className="table bg-primary-content">
            <thead>
              <tr>
                <th>SL NO</th>
                <th>Image</th>
                <th>Name</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {decContribution.map((contricbution, index) => (
                <tr key={contricbution._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={
                              contricbution.image ||
                              "https://img.daisyui.com/images/profile/demo/5@94.webp"
                            }
                            alt={contricbution.title}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{contricbution.title}</div>
                        <div className="text-sm opacity-50">
                          {contricbution.location}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className="text-accent">{contricbution.name}</span>
                  </td>

                  <td>${contricbution.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Container>
  );
};

export default IssueDetails;
