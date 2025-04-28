// // import React, { useEffect } from "react";
// // import { useNavigate, useLocation } from "react-router-dom";
// // import ProgressBar from "./ProgressBar";

// // const RegistrationLayout = ({ currentStep, children }) => {
// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   useEffect(() => {
// //     // Check if the current path matches any of the step paths
// //     const validPaths = [
// //       "/personal-info/step1",
// //       "/identity-demographics/step2",
// //       "/location-info/step3",
// //       "/employment-pre/step4",
// //       "/decl-step/step5",
// //     ];

// //     if (!validPaths.includes(location.pathname)) {
// //       // Redirect to home page if the path is invalid
// //       navigate("/");
// //     }
// //   }, [location.pathname, navigate]);

// //   return (
// //     <div className="w-full min-h-screen bg-blue-50">
// //       <div className="sm:p-12 p-2">
// //         <div className="flex flex-col gap-3">
// //           <h2 className="md:text-5xl lg:text-5xl sm:text-3xl text-2xl text-gray-950 font-medium font-roboto">
// //             Skill Training Registration
// //           </h2>
// //           <span>
// //             <p className="text-gray-600 md:text-lg text-sm font-roboto">
// //               Complete the form to register for the skill training program.{" "}
// //             </p>
// //             <p className="text-gray-600 md:text-lg text-sm font-roboto">
// //               Ensure all details are accurate.
// //             </p>
// //           </span>
// //         </div>

// //         <ProgressBar currentStep={currentStep} totalSteps={5} />

// //         <div>{children}</div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default RegistrationLayout;

// import React, { useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import ProgressBar from "./ProgressBar";

// const RegistrationLayout = ({ currentStep, children }) => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     // Check if the current path matches any of the step paths
//     const validPaths = [
//       "/personal-info/step1",
//       "/identity-demographics/step2",
//       "/location-info/step3",
//       "/employment-pre/step4",
//       "/decl-step/step5",
//     ];

//     if (!validPaths.includes(location.pathname)) {
//       // Redirect to home page if the path is invalid
//       navigate("/");
//     }

//     // Handle page reload: redirect to home page
//     const handleBeforeUnload = () => {
//       // We set a flag in sessionStorage that we're reloading
//       sessionStorage.setItem('isReloading', 'true');
//     };

//     // Set up the event listener for reload detection
//     window.addEventListener('beforeunload', handleBeforeUnload);

//     // Check if we're coming from a reload
//     const checkReload = () => {
//       const isReloading = sessionStorage.getItem('isReloading');
//       if (isReloading === 'true') {
//         // Clear the flag
//         sessionStorage.removeItem('isReloading');
//         // Redirect to home
//         navigate("/");
//       }
//     };

//     // Run the check when component mounts
//     checkReload();

//     // Clean up the event listener
//     return () => {
//       window.removeEventListener('beforeunload', handleBeforeUnload);
//     };
//   }, [location.pathname, navigate]);

//   return (
//     <div className="w-full min-h-screen bg-blue-50">
//       <div className="sm:p-12 p-4">
//         <div className="flex flex-col gap-3">
//           <h2 className="md:text-5xl lg:text-5xl sm:text-3xl text-2xl text-gray-950 font-medium font-roboto">
//             Skill Training Registration
//           </h2>
//           <span>
//             <p className="text-gray-600 md:text-lg text-sm font-roboto">
//               Complete the form to register for the skill training program.{" "}
//             </p>
//             <p className="text-gray-600 md:text-lg text-sm font-roboto">
//               Ensure all details are accurate.
//             </p>
//           </span>
//         </div>

//         <ProgressBar currentStep={currentStep} totalSteps={5} />

//         <div>{children}</div>
//       </div>
//     </div>
//   );
// };

// export default RegistrationLayout;


import React, { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProgressBar from "./ProgressBar";

const RegistrationLayout = ({ currentStep, children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  // Create a ref to track if this is the first render
  const isFirstMount = useRef(true);
  // Ref to store the last navigated path
  const lastPathRef = useRef(location.pathname);

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
      return;
    }
    
    // Create a navigation tracking function
    // This will help us distinguish between normal navigation and page reload
    const handleNavigation = () => {
      // Update the last path whenever we navigate normally
      lastPathRef.current = location.pathname;
      // Store this in sessionStorage so we can check after a reload
      sessionStorage.setItem('lastNavigatedPath', location.pathname);
    };

    // Only set up reload detection after the component has mounted once
    if (isFirstMount.current) {
      isFirstMount.current = false;

      // Store the initial path
      sessionStorage.setItem('lastNavigatedPath', location.pathname);
      
      // Set up reload detection
      const handleBeforeUnload = () => {
        // Mark that we're about to reload
        sessionStorage.setItem('isReloading', 'true');
      };
      
      window.addEventListener('beforeunload', handleBeforeUnload);
      
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    } else {
      // This is not the first mount, so check if we're coming from a reload
      const isReloading = sessionStorage.getItem('isReloading') === 'true';
      const lastNavigatedPath = sessionStorage.getItem('lastNavigatedPath');
      
      if (isReloading) {
        // Clear the reload flag
        sessionStorage.removeItem('isReloading');
        
        // Only redirect if we're on the same path as before the reload
        // This prevents redirecting during normal navigation
        if (lastNavigatedPath === location.pathname) {
          navigate("/");
          return;
        }
      }
      
      // Update navigation tracking for future checks
      handleNavigation();
    }
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