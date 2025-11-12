import { useContext } from "react";
import { AuthContext } from "../Provider/AuthContext";
import toast from "react-hot-toast";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Container from "../Components/Container";
import NewIssueForm from "../Components/NewIssueForm";
import { Fade } from "react-awesome-reveal";

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

    axiosSecure.post("/issues", newIssue).then(() => {
      toast.success("Successfully added");
      e.target.reset();
    });
  };

  return (
    <Fade>
      <Container className="p-6 md:p-10 bg-base-100">
        <title>Add Issues</title>
        
        {/* Header */}
        <div className="mb-5 text-center">
          <h2 className="text-3xl font-bold">
            Report a New <span className="text-primary">Issue</span>
          </h2>
          <p className="mt-2">
            Help keep your community clean and safe by reporting local problems.
          </p>
        </div>

        {/* Form Card */}
        <NewIssueForm handleSubmit={handleSubmit} user={user}></NewIssueForm>
      </Container>
    </Fade>
  );
};

export default AddIssue;
