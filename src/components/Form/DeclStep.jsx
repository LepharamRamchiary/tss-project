import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationButton from "../NavigationButton";

export default function DeclStep() {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!isChecked) {
      alert("Please agree to the terms before submitting");
      return;
    }

    try {
      // Get all stored form data from localStorage
      const personalData = JSON.parse(
        localStorage.getItem("personalData") || "{}"
      );
      const identityData = JSON.parse(
        localStorage.getItem("identityData") || "{}"
      );
      const addressData = JSON.parse(
        localStorage.getItem("locationData") || "{}"
      );
      const educationData = JSON.parse(
        localStorage.getItem("employmentPreferences") || "{}"
      );

      // Combine all form data
      // const formData = {
      //   ...personalData,
      //   ...identityData,
      //   ...addressData,
      //   ...educationData,
      //   agreedToTerms: isChecked,
      // };

      // const response = await fetch("http://localhost/fake-endpoint", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(formData),
      // });

      // if (response.ok) {
      //   alert(
      //     "Data submitted successfully! Check the Network tab for details."
      //   );
      // } else {
      //   alert("Failed to simulate submission. Please try again.");
      // }
      alert("Data submitted successfully! ");
      // console.log("Submitted Data:", formData);
      navigate("/")
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form. Please try again.");
    }
  };

  return (
    <div className="">
      <div className="">
        <div className="bg-white border border-gray-300 rounded-lg md:rounded-xl lg:rounded-3xl p-4 md:p-8 lg:p-12">
          <legend className="font-semibold mb-4 md:mb-8 lg:mb-12 text-xl md:text-2xl">
            Declaration
          </legend>
          <div className="grid gap-4 md:gap-6 lg:gap-8">
            <div>
              <ul className="pl-5 space-y-2 md:space-y-3">
                <li className="text-xs sm:text-sm">
                  I hereby declare that the information submitted by me is
                  correct and true to the best of my knowledge.
                </li>
                <li className="text-xs sm:text-sm">
                  I shall be liable for any Disciplinary/Punitive action in case
                  the details are found to be incorrect.
                </li>
                <li className="text-xs sm:text-sm">
                  Information Provided will be the proprietary of ASDM for
                  different enrollment purposes.
                </li>
              </ul>
            </div>
            <div>
              <div className="flex gap-2">
                <input
                  name="declCheck"
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                  className="peer size-4 appearance-none rounded-sm border border-gray-300 accent-emerald-400 checked:appearance-auto flex-shrink-0 mt-1"
                />
                <label className="text-sm md:text-base font-medium">
                  I Agree to the above terms
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <NavigationButton
            label="Previous"
            to="/employment-pre/step4"
            variant="secondary"
          />
          <button
            onClick={handleSubmit}
            disabled={!isChecked}
            className={`px-4 py-2 rounded transition duration-200 ${
              isChecked
                ? "bg-emerald-400 hover:bg-emerald-400/80 font-medium rounded-full border-gray-300 px-4 py-2.5 text-sm mt-4 text-center disabled:bg-gray-200 disabled:text-gray-600"
                : "bg-emerald-400 hover:bg-emerald-400/80 font-medium rounded-full border-gray-300 px-4 py-2.5 text-sm mt-4 text-center disabled:bg-gray-200 disabled:text-gray-600 cursor-not-allowed"
            }`}
          >
            Final Submit
          </button>
        </div>
      </div>
    </div>
  );
}
