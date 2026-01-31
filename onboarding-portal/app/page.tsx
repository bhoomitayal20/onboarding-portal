import Navbar from "./components/Navbar";
import FeatureCard from "./components/FeatureCard";
import Link from "next/link";


export default function Home() {
  return (
    <>
      <Navbar />

      <section className="flex flex-col items-center justify-center text-center py-32 px-6">
        <h2 className="text-5xl font-bold">
          Onboarding made{" "}
          <span className="text-blue-600">seamless</span>
        </h2>

        <p className="mt-6 max-w-xl text-gray-600">
          A secure platform for candidates and recruiters to manage
          onboarding efficiently.
        </p>
       <div className="mt-8 flex gap-4">
  <Link
    href="/login"
    className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition"
  >
    Get Started
  </Link>

  <Link
    href="/login"
    className="border border-gray-300 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition"
  >
    Login
  </Link>
</div>


      </section>
      <section className="py-20 px-8 bg-gray-50">
  <div className="max-w-6xl mx-auto">
    
    <h3 className="text-center text-2xl font-semibold">
      PLATFORM FEATURES
    </h3>

    <p className="text-center text-gray-600 mt-2 max-w-2xl mx-auto">
      Everything you need for a smooth transition from
      &quot;Hired&quot; to &quot;Onboarded&quot;.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
      <FeatureCard
        title="Candidate Dashboard"
        description="Real-time view of your application status. Track what’s pending and what’s approved instantly."
      />

      <FeatureCard
        title="Recruiter Controls"
        description="Manage incoming candidates, issue offer letters, and verify background checks efficiently."
      />

      <FeatureCard
        title="Secure Documents"
        description="End-to-end encrypted uploads for sensitive documents like Aadhaar, PAN, and appointment letters."
      />
    </div>

  </div>
</section>

    </>
  );
}
