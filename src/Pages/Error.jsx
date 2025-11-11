import { Link } from "react-router";

const Error = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-base-100 p-6">
      <title>Error - 404</title>
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <div className="badge badge-error text-error-content px-4 py-3 text-sm font-semibold">
            404 — Page not found
          </div>
        </div>

        <h1 className="text-3xl font-bold text-base-content mb-3">
          Oops, nothing to see here.
        </h1>

        <p className="text-base-content/70 mb-6">
          The page you’re looking for doesn’t exist or may have moved.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link to="/" className="btn btn-primary">
            Go back home
          </Link>
        </div>

        <div className="mt-8">
          <div className="mockup-code text-white text-left">
            <pre data-prefix=">">
              <code>Requested route: not found</code>
            </pre>
            <pre data-prefix="$">
              <code>Try navigating from the menu</code>
            </pre>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Error;
