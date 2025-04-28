import React from "react";
import IdentityVerification from "../components/IdentityVerification";

function Home() {
  return (
    <div className="w-full min-h-screen bg-blue-50">
      <div className="sm:p-12 p-3 pt-16">
        <div className="flex flex-col gap-3">
          <h2 className="md:text-5xl lg:text-5xl sm:text-3xl text-2xl text-gray-950 font-medium font-roboto">
            Skill Training Registration
          </h2>
          <span>
            <p className="text-gray-600 md:text-lg text-sm font-roboto">
              Complete the form to register for the skill training program.{" "}
            </p>
            <p className="text-gray-600 md:text-lg text-sm font-roboto">
              Ensure all details are accurate.
            </p>
          </span>
        </div>
        <IdentityVerification />
      </div>
    </div>
  );
}

export default Home;