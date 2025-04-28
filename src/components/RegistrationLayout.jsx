import React from "react";
import ProgressBar from "./ProgressBar";

const RegistrationLayout = ({ currentStep, children }) => {
  return (
    <div className="w-full min-h-screen bg-blue-50">
      <div className="p-12">
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

        <ProgressBar currentStep={currentStep} totalSteps={5} />

        <div>{children}</div>
      </div>
    </div>
  );
};

export default RegistrationLayout;
