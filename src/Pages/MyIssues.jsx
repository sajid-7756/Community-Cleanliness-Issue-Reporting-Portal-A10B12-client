import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Provider/AuthContext";
import Container from "../Components/Container";
import { useRef } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const MyIssues = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [myIssues, setMyIssues] = useState([]);
  const [selectedIssue, setselectedIssue] = useState([]);
  const issueModalRef = useRef(null);

  const issueId = selectedIssue?._id;

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/issues/?email=${user.email}`)
        .then((res) => setMyIssues(res.data))
        .catch((err) => console.log(err));
    }
  }, [axiosSecure, user]);

  const handleUpdateIssue = (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const category = e.target.category.value;
    const amount = e.target.amount.value;
    const description = e.target.description.value;
    const status = e.target.status.value;

    const updatedIssue = {
      title,
      category,
      amount,
      description,
      status,
      issueId,
    };

    axiosSecure
      .patch(`/issues/${issueId}`, updatedIssue)
      .then((res) => {
        if (res.data.modifiedCount) {
          console.log("Issue updated", res.data);
          setMyIssues((prevIssues) =>
            prevIssues.map((issue) =>
              issue._id === issueId ? { ...issue, ...updatedIssue } : issue
            )
          );
          alert("updated sucess");
          issueModalRef.current.close();
        }
      })
      .catch((err) => console.error(err));
  };

  const handleDeleteIssue = (id) => {
    axiosSecure.delete(`/issues/${id}`).then((data) => {
      alert("delete success");
      console.log("data after delete", data.data);
      const filteredIssues = myIssues.filter((e) => e._id !== id);
      setMyIssues(filteredIssues);
    });
  };

  return (
    <Container className="p-6 md:p-10 min-h-screen">
      <h3 className="text-2xl font-bold mb-6">
        My <span className="text-primary">Issues </span>({myIssues.length})
      </h3>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Issue</th>
              <th>Category</th>
              <th>Budget</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {myIssues.map((issue, index) => (
              <tr key={issue._id}>
                <td>{index + 1}</td>

                {/* Issue title + image/avatar */}
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={
                            issue.image ||
                            "https://img.daisyui.com/images/profile/demo/5@94.webp"
                          }
                          alt={issue.title}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{issue.title}</div>
                      <div className="text-sm opacity-50">{issue.location}</div>
                    </div>
                  </div>
                </td>

                {/* Category */}
                <td>
                  <span className="badge badge-ghost badge-sm">
                    {issue.category}
                  </span>
                </td>

                {/* Budget */}
                <td>${issue.amount}</td>

                {/* Status */}
                <td>
                  {issue.status === "ongoing" ? (
                    <div className="badge badge-warning">{issue.status}</div>
                  ) : (
                    <div className="badge badge-success">{issue.status}</div>
                  )}
                </td>

                {/* Actions */}
                <td>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setselectedIssue(issue);
                        issueModalRef.current.showModal();
                      }}
                      className="btn btn-outline btn-primary"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteIssue(issue._id)}
                      className="btn btn-outline btn-error"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <dialog
        ref={issueModalRef}
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box bg-white dark:bg-base-100">
          <div className="max-w-lg mx-auto p-6 bg-base-100 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4 text-primary">
              Update Issue
            </h2>
            <button
              onClick={() => issueModalRef.current.close()}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
            <form onSubmit={handleUpdateIssue} className="space-y-4">
              {/* Title */}
              <div>
                <label className="label">Title</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={selectedIssue.title}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="label">Category</label>
                <select
                  name="category"
                  className="select select-bordered w-full"
                >
                  <option>Garbage</option>
                  <option>Illegal Construction</option>
                  <option>Broken Public Property</option>
                  <option>Road Damage</option>
                </select>
              </div>

              {/* Amount */}
              <div>
                <label className="label">Amount</label>
                <input
                  type="number"
                  name="amount"
                  defaultValue={selectedIssue.amount}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="label">Description</label>
                <textarea
                  name="description"
                  defaultValue={selectedIssue.description}
                  className="textarea textarea-bordered w-full"
                  required
                ></textarea>
              </div>

              {/* Status */}
              <div>
                <label className="label">Status</label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="status"
                      value="ongoing"
                      defaultChecked
                      className="radio radio-sm"
                    />
                    Ongoing
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="status"
                      value="ended"
                      className="radio radio-sm"
                    />
                    Ended
                  </label>
                </div>
              </div>

              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Submit Issue
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </Container>
  );
};

export default MyIssues;
