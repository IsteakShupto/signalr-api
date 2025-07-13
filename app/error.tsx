"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <section
      role="alert"
      className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-6 text-center font-grotesque"
    >
      <h1 className="text-4xl font-extrabold text-red-600 mb-4">
        Oops! Something went wrong.
      </h1>
      <p className="text-lg text-gray-700 mb-6 max-w-md">
        We are sorry, but an unexpected error has occurred.
      </p>
      <pre className="bg-red-100 text-red-800 rounded-md p-4 mb-6 max-w-lg overflow-auto whitespace-pre-wrap break-words font-grotesque">
        {error.message}
      </pre>
      <button
        onClick={reset}
        className="px-6 py-3 bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 text-white rounded-md font-semibold transition"
      >
        Try Again
      </button>
    </section>
  );
}
