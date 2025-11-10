const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="flex flex-col items-center space-y-4">
        {/* DaisyUI spinner */}
        <span className="loading loading-spinner loading-lg text-primary"></span>

        {/* Optional text */}
        <p className="text-lg font-semibold text-primary">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
