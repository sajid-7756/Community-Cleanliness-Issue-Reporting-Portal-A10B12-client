import { useContext } from "react";
import { AuthContext } from "../Provider/AuthContext";
import toast from "react-hot-toast";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const AddIssue = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const handleSubmit = (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const category = e.target.category.value;
    const location = e.target.location.value;
    const description = e.target.description.value;
    const image = e.target.image.value;
    const amount = e.target.amount.value;
    const status = e.target.status.value;

    const newIssue = {
      title,
      category,
      location,
      description,
      image,
      amount,
      status,
      email: user?.email,
      date: new Date().toLocaleDateString(),
    };

    axiosSecure.post("/issues", newIssue).then((data) => {
      toast.success("Successfully added");
      console.log("issue after post", data.data);
    });
  };

  return (
    <div className="p-6 md:p-10 min-h-screen bg-base-100">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">
          Report a New <span className="text-primary">Issue</span>
        </h2>
        <p className="text-neutral mt-2">
          Help keep your community clean and safe by reporting local problems.
        </p>
      </div>

      {/* Form Card */}
      <div className="card bg-base-100 shadow-xl max-w-2xl mx-auto">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Issue Title */}
            <div>
              <label className="label">Issue Title</label>
              <input
                type="text"
                name="title"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Category Dropdown */}
            <div>
              <label className="label">Category</label>
              <select name="category" className="select select-bordered w-full bg-white dark:bg-base-100">
                <option>Garbage</option>
                <option>Illegal Construction</option>
                <option>Broken Public Property</option>
                <option>Road Damage</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="label">Location</label>
              <input
                type="text"
                name="location"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="label">Description</label>
              <textarea
                name="description"
                className="textarea textarea-bordered w-full"
                required
              ></textarea>
            </div>

            {/* Image URL */}
            <div>
              <label className="label">Image URL</label>
              <input
                type="text"
                name="image"
                className="input input-bordered w-full"
              />
            </div>

            {/* Amount */}
            <div>
              <label className="label">Amount</label>
              <input
                type="number"
                name="amount"
                defaultValue={500}
                className="input input-bordered w-full"
              />
            </div>

            {/* Status (default ongoing) */}
            <div>
              <label className="label">Status</label>
              <input
                type="text"
                name="status"
                value={"ongoing"}
                readOnly
                className="input input-bordered w-full bg-base-200"
              />
            </div>

            {/* Date (auto-set, read-only) */}
            <div>
              <label className="label">Date</label>
              <input
                type="text"
                name="date"
                value={new Date().toLocaleDateString()}
                readOnly
                className="input input-bordered w-full bg-base-200"
              />
            </div>

            {/* Email (current user, read-only) */}
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                value={user?.email}
                readOnly
                className="input input-bordered w-full bg-base-200"
              />
            </div>

            {/* Submit Button */}
            <div className="card-actions justify-end">
              <button type="submit" className="btn btn-primary">
                Submit Issue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddIssue;
