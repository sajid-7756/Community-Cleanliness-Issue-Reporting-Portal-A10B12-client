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
  const { user, loading } = useContext(AuthContext);
  const data = useLoaderData();
  const [showModal, setShowModal] = useState(false);
  const axiosSecure = useAxiosSecure();
  const axiosInstance = useAxios();
  const [contricbutions, setContricbutions] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const navigate = useNavigate();

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
    axiosInstance.get(`/contributions/${data.issueId}`).then((data) => {
      setContricbutions(data.data);
    });
  }, [axiosInstance, data?.issueId, refetch]);

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
      <h2 className="text-3xl font-bold mb-8">
        <Link onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </Link>
        Issue <span className="text-primary">Details</span>
      </h2>
      <div className="card bg-base-100 shadow-xl w-full mx-auto">
        {/* Image */}
        <figure>
          <img
            src={data.image}
            alt={data.title}
            className="w-full h-full object-cover rounded-t-xl"
          />
        </figure>

        <div className="card-body space-y-4">
          {/* Title */}
          <h2 className="card-title text-2xl font-bold text-primary">
            {data.title}
          </h2>

          {/* Category + Location */}
          <div className="flex flex-wrap gap-4 text-sm text-neutral-content">
            <span className={`badge ${badgeClass} flex items-center gap-1`}>
              <Icon className="h-3 w-3" /> {data.category}
            </span>
            <span className="text-accent">
              <strong>Location:</strong> {data.location}
            </span>
          </div>

          {/* Description */}
          <p className="text-base-content">{data.description}</p>

          {/* Date + Amount */}
          <div className="flex justify-between items-center text-sm mt-2">
            <span>
              <strong>Date:</strong> {data.date}
            </span>
            <span className="font-semibold text-success">
              Amout: ${data.amount}
            </span>
          </div>

          {/* Pay Contribution Button */}
          <div className="card-actions justify-end mt-4">
            <button
              className="btn btn-primary"
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
        <h2 className="text-3xl font-bold mb-8">
          Contributors of this <span className="text-primary">Issue</span>
        </h2>
        {contricbutions.length === 0 ? (
          <h3 className=" text-warning text-xl font-semibold">
            No one Contributed for this Issue
          </h3>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>SL NO</th>
                <th>Image</th>
                <th>Name</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {contricbutions.map((contricbution, index) => (
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
