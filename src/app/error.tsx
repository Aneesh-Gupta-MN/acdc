"use client";

// Client error boundary offers a quiet recovery path without exposing implementation details to patients.
export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="grid min-h-screen place-items-center bg-ivory px-6 text-center text-charcoal">
      <div className="max-w-lg">
        <p className="eyebrow mb-4 text-burgundy">All Care Dental Centre</p>
        <h1 className="section-title mb-6">We’re ready when you are.</h1>
        <p className="mb-8 text-lg">Please try the page again, or call the clinic directly for help.</p>
        <button
          className="min-h-touch rounded-sm bg-burgundy px-6 font-semibold text-ivory"
          onClick={() => reset()}
        >
          Try again
        </button>
      </div>
    </main>
  );
}
