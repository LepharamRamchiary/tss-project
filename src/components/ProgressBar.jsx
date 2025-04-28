import React from "react";

const ProgressBar = ({ currentStep, totalSteps, onNext, onPrevious }) => {
  return (
    <div className="flex items-center w-full max-w-2xl mb-6 mt-12">
      {/*  larger screens */}
      <div className="hidden sm:flex bg-white py-2.5 px-2.5 rounded-full border border-gray-300">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber <= currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <React.Fragment key={stepNumber}>
              {/* Step circle */}
              <div className="flex flex-col items-center">
                <div
                  className={`flex items-center justify-center h-5 w-5 rounded-full text-sm font-medium ${
                    isCurrent
                      ? "bg-black text-white"
                      : isActive
                      ? "bg-green-500 text-white"
                      : "bg-white text-gray-500 border border-gray-300"
                  }`}
                >
                  {stepNumber}
                </div>
              </div>

              {/* Dash and line between steps */}
              {stepNumber < totalSteps && (
                <div className="flex items-center mx-2">
                  <div
                    className={`w-24 h-0.5 flex items-center justify-center relative ${
                      stepNumber < currentStep ? "bg-green-500" : "bg-gray-300"
                    }`}
                  ></div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/*  mobile screens */}
      <div className="flex sm:hidden items-center justify-between w-full bg-white py-2 px-2 rounded-full border border-gray-300">
        {/* Previous Step */}
        {currentStep > 1 && (
          <button
            onClick={onPrevious}
            className="flex items-center justify-center p-1 h-5 w-5 rounded-full text-sm font-medium bg-gray-300 text-black"
          >
            {currentStep - 1}
          </button>
        )}

        {/* Current Step */}
        <div className="flex items-center justify-center p-1 h-5 w-5 rounded-full text-sm font-medium bg-black text-white">
          {currentStep}
        </div>

        {/* Next Step */}
        {currentStep < totalSteps && (
          <button
            onClick={onNext}
            className="flex items-center justify-center p-1 h-5 w-5 rounded-full text-sm font-medium bg-gray-300 text-black"
          >
            {currentStep + 1}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
