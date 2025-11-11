import { RingLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <RingLoader size={100} color="green" />
    </div>
  );
};

export default Loading;
