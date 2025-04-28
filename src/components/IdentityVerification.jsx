import React, { useState } from "react";
import OTPVerification from "./OTPVerification";

function IdentityVerification() {
  const [showOtp, setShowOtp] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");
  
  const handleGetOtp = () => {
    setShowOtp(true);
  };
  
  const handleMobileChange = (e) => {
    setMobileNumber(e.target.value);
  };
  
  const handleAadharChange = (e) => {
    setAadharNumber(e.target.value);
  };
  
  const handleVerifyOtp = (otp) => {
    console.log("Verifying OTP:", otp);
  };
  
  const handleResendOtp = () => {
    console.log("Resending OTP");
  };
  
  const handleGoBack = () => {
    setShowOtp(false);
  };

  return (
    <div className="mt-4 sm:mt-6 md:mt-10">
      <div className="border border-gray-300 rounded-lg sm:rounded-2xl md:rounded-3xl bg-white p-4 sm:p-6 md:p-8 lg:p-12">
        <h1 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-semibold font-roboto">
          Identity Verification
        </h1>
        
        {!showOtp ? (
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 md:gap-6 mt-6 sm:mt-8 md:mt-10 items-center">
            {/* Mobile Number Section */}
            <div className="flex flex-col w-full lg:w-auto">
              <label htmlFor="mobile" className="text-gray-700 font-medium mb-1">
                Your Mobile Number
              </label>
              <div className="relative flex items-center w-full lg:w-80">
                <input
                  type="text"
                  id="mobile"
                  name="mobile"
                  value={mobileNumber}
                  onChange={handleMobileChange}
                  className="border border-gray-300 rounded-lg p-2 pl-10 w-full"
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
              </div>
            </div>
            
            {/* OR Divider */}
            <div className="flex items-center justify-center my-4 lg:my-0 w-full lg:w-auto">
              <hr className="border-t border-gray-400 w-full lg:w-10" />
              <span className="text-gray-600 mx-4 whitespace-nowrap">OR</span>
              <hr className="border-t border-gray-400 w-full lg:w-10" />
            </div>
            
            {/* Aadhar Number Section */}
            <div className="flex flex-col w-full lg:w-auto">
              <label htmlFor="aadhar" className="text-gray-700 font-medium mb-1">
                Your Aadhar Number
              </label>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 w-full">
                <div className="relative flex items-center w-full sm:w-auto">
                  <input
                    type="text"
                    id="aadhar"
                    name="aadhar"
                    value={aadharNumber}
                    onChange={handleAadharChange}
                    className="border border-gray-300 rounded-lg p-2 pl-10 w-full sm:w-80"
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </span>
                </div>
                <button 
                  className="bg-gray-900 py-2 px-4 duration-500 ease-in-out hover:bg-gray-500 rounded-full text-white text-sm font-medium mt-2 sm:mt-0"
                  onClick={handleGetOtp}
                >
                  Get OTP
                </button>
              </div>
            </div>
          </div>
        ) : (
          <OTPVerification 
            mobileNumber={mobileNumber}
            onVerify={handleVerifyOtp}
            onResend={handleResendOtp}
            onGoBack={handleGoBack}
          />
        )}
      </div>
    </div>
  );
}

export default IdentityVerification;