import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OTPVerification() {
  const [otpValue, setOtpValue] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setOtpValue(value);
  };

  const handleVerifyClick = () => {
    navigate("/personal-info/step1");
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 items-end mt-10">
      {/* OTP Input Section */}
      <div className="col-span-1 sm:col-span-2 lg:col-span-1">
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Enter OTP sent to +91 83* *** **72
        </label>
        <div className="relative w-full outline outline-1 outline-gray-300 rounded-lg p-1 flex items-center focus-within:outline-2 focus-within:outline-emerald-400 focus-within:-outline-offset-2 disabled:bg-gray-100">
          <span className="pointer-events-none absolute left-3 inset-y-0 flex items-center text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </span>
          <input
            type="tel"
            value={otpValue}
            onChange={handleInputChange}
            className="block w-full appearance-none px-3 py-1.5 pl-7 text-base text-gray-900 placeholder:text-gray-400 bg-transparent focus:outline-none sm:text-sm"
          />
        </div>
      </div>

      {/* Buttons Section */}
      <div className="flex flex-col sm:flex-row gap-2 items-center justify-start sm:justify-end">
        <button
          id="verifyOtp"
          type="button"
          onClick={handleVerifyClick}
          className="bg-emerald-400 hover:bg-emerald-400/80 font-medium rounded-full border-gray-300 px-4 py-2.5 text-sm text-center disabled:bg-gray-200 disabled:text-gray-600 w-full sm:w-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 inline mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          Verify
        </button>
        <button
          id="resendOtp"
          type="button"
          className="font-medium rounded-full border-gray-300 px-4 py-2.5 text-sm text-center disabled:bg-gray-200 disabled:text-gray-600 w-full sm:w-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 inline mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Resend OTP
        </button>
      </div>
    </div>
  );
}
