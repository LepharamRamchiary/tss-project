import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProgressBar from "./ProgressBar";

const RegistrationLayout = ({ currentStep, children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if the current path matches any of the step paths
    const validPaths = [
      "/personal-info/step1",
      "/identity-demographics/step2",
      "/location-info/step3",
      "/employment-pre/step4",
      "/decl-step/step5",
    ];

    if (!validPaths.includes(location.pathname)) {
      // Redirect to home page if the path is invalid
      navigate("/");
    }

    // Handle page reload: redirect to home page
    const handleBeforeUnload = () => {
      // We set a flag in sessionStorage that we're reloading
      sessionStorage.setItem('isReloading', 'true');
    };

    // Set up the event listener for reload detection
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Check if we're coming from a reload
    const checkReload = () => {
      const isReloading = sessionStorage.getItem('isReloading');
      if (isReloading === 'true') {
        // Clear the flag
        sessionStorage.removeItem('isReloading');
        // Redirect to home
        navigate("/");
      }
    };

    // Run the check when component mounts
    checkReload();

    // Clean up the event listener
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [location.pathname, navigate]);

  return (
    <div className="w-full min-h-screen bg-blue-50">
      <div className="sm:p-12 p-4">
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