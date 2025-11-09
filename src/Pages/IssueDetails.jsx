import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router";
import { FaTrash, FaHardHat, FaTools, FaRoad } from "react-icons/fa";
import Container from "../Components/Container";
import useAxios from "../Hooks/useAxios";
import { AuthContext } from "../Provider/AuthContext";

const IssueDetails = () => {
  const { user, loading } = useContext(AuthContext);
  const data = useLoaderData();
  const [showModal, setShowModal] = useState(false);
  const axiosInstance = useAxios();

  console.log(user);

  const handlePayUpContribution = (e) => {
    e.preventDefault();

    const additionalInfo = e.target.additionalInfo.value;
    const address = e.target.address.value;
    const phoneNumber = e.target.number.value;
    const amount = e.target.amount.value;
    const date = e.target.date.value;
    // console.log({ additionalInfo, address, amount, phoneNumber, date });

    const newContribution = {
      issueId: data._id,
      amount,
      phone: phoneNumber,
      address,
      date,
      additionalInfo: additionalInfo,
      name: user?.displayName,
      email: user?.email,
    };
    console.log(newContribution);

    axiosInstance.post("/contributions", newContribution).then((data) => {
      if (data.data.insertedId) {
        alert("contribution success");
        console.log("data after post", data.data);
      }
    });
  };

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
    return <p>loading</p>;
  }

  return (
    <Container className="p-6 md:p-10 min-h-screen">
      <h2 className="text-3xl font-bold mb-8">
        Latest Local <span className="text-primary">Issues</span>
      </h2>
      <div className="card bg-base-100 shadow-xl max-w-3xl mx-auto">
        {/* Image */}
        <figure>
          <img
            src={data.image}
            alt={data.title}
            className="w-full h-100 object-cover rounded-t-xl"
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
              <strong className="text-black">Location:</strong> {data.location}
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

      {/* DaisyUI Modal */}
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box w-full max-w-lg">
            <h3 className="font-bold text-lg mb-4">Contribution Form</h3>

            <form onSubmit={handlePayUpContribution} className="space-y-4">
              {/* Issue Title */}
              <div>
                <label className="label">Issue Title</label>
                <input
                  type="text"
                  value={data.title}
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
                  defaultValue={data.amount}
                  className="input input-bordered w-full"
                />
              </div>

              {/* Contributor Name */}
              <div>
                <label className="label">Contributor Name</label>
                <input
                  type="text"
                  value={user?.displayName}
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
                  defaultValue={data?.email}
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
                  value={new Date().toLocaleDateString()}
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
    </Container>
  );
};

export default IssueDetails;
