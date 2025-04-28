import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavigationButton from "../NavigationButton";

const PersonalContactForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    fatherName: "",
    motherName: "",
    gender: "",
    dob: "",
    religion: "",
    category: "",
    mobileNumber: "+91 83* *** **72",
    altMobileNumber: "",
    email: "",
  });

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("personalData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNext = () => {
    localStorage.setItem("personalData", JSON.stringify(formData));
    navigate("/identity-demographics/step2");
  };

  return (
    <div className="">
      <div className="">
        <div className="step bg-white border border-gray-300 rounded-lg md:rounded-xl lg:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12">
          <legend className="font-semibold mb-4 sm:mb-6 md:mb-8 lg:mb-12 text-xl sm:text-xl md:text-2xl">
            Personal & Contact Information
          </legend>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                First Name
              </label>
              <input
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                className="relative w-full block px-3 py-2 text-base text-gray-900 placeholder-gray-400 bg-transparent sm:text-sm outline outline-1 outline-gray-300 rounded-lg p-1 focus:outline-2 focus:outline-emerald-400 focus:-outline-offset-2"
              />
            </div>

            {/* Middle Name */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Middle Name
              </label>
              <input
                name="middleName"
                type="text"
                value={formData.middleName}
                onChange={handleChange}
                className="relative w-full block px-3 py-2 text-base text-gray-900 placeholder-gray-400 bg-transparent sm:text-sm outline outline-1 outline-gray-300 rounded-lg p-1 focus:outline-2 focus:outline-emerald-400 focus:-outline-offset-2"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Last Name
              </label>
              <input
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                className="relative w-full block px-3 py-2 text-base text-gray-900 placeholder-gray-400 bg-transparent sm:text-sm outline outline-1 outline-gray-300 rounded-lg p-1 focus:outline-2 focus:outline-emerald-400 focus:-outline-offset-2"
              />
            </div>

            {/* Father's Name */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Father's Name
              </label>
              <input
                name="fatherName"
                type="text"
                value={formData.fatherName}
                onChange={handleChange}
                className="relative w-full block px-3 py-2 text-base text-gray-900 placeholder-gray-400 bg-transparent sm:text-sm outline outline-1 outline-gray-300 rounded-lg p-1 focus:outline-2 focus:outline-emerald-400 focus:-outline-offset-2"
              />
            </div>

            {/* Mother's Name */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Mother's Name
              </label>
              <input
                name="motherName"
                type="text"
                value={formData.motherName}
                onChange={handleChange}
                className="relative w-full block px-3 py-2 text-base text-gray-900 placeholder-gray-400 bg-transparent sm:text-sm outline outline-1 outline-gray-300 rounded-lg p-1 focus:outline-2 focus:outline-emerald-400 focus:-outline-offset-2"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Gender
              </label>
              <div className="relative w-full outline outline-1 outline-gray-300 rounded-lg p-1 flex items-center focus-within:outline-2 focus-within:outline-emerald-400 focus-within:-outline-offset-2">
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="block w-full appearance-none px-3 py-1.5 pr-7 text-base text-gray-900 placeholder:text-gray-400 bg-transparent focus:outline-none sm:text-sm"
                >
                  <option value="" disabled>
                    — Select —
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <span className="pointer-events-none absolute right-3 inset-y-0 flex items-center text-gray-500">
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
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </div>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Date of Birth
              </label>
              <div className="relative w-full outline outline-1 outline-gray-300 rounded-lg p-1 flex items-center focus-within:outline-2 focus-within:outline-emerald-400 focus-within:-outline-offset-2">
                {formData.dob === "" &&
                  navigator &&
                  /Mobi|Android/i.test(navigator.userAgent) && (
                    <div className="block w-full appearance-none px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 bg-transparent focus:outline-none sm:text-sm">
                      dd/mm/yyyy
                    </div>
                  )}
                <input
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleChange}
                  placeholder="dd/mm/yyyy"
                  className="block w-full appearance-none px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 bg-transparent focus:outline-none sm:text-sm"
                />
              </div>
            </div>

            {/* Religion */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Religion
              </label>
              <div className="relative w-full outline outline-1 outline-gray-300 rounded-lg p-1 flex items-center focus-within:outline-2 focus-within:outline-emerald-400 focus-within:-outline-offset-2">
                <select
                  name="religion"
                  value={formData.religion}
                  onChange={handleChange}
                  className="block w-full appearance-none px-3 py-1.5 pr-7 text-base text-gray-900 placeholder:text-gray-400 bg-transparent focus:outline-none sm:text-sm"
                >
                  <option value="" disabled>
                    — Select —
                  </option>
                  <option value="hindu">Hinduism</option>
                  <option value="islam">Islam</option>
                  <option value="sikh">Sikhism</option>
                  <option value="other">Other</option>
                </select>
                <span className="pointer-events-none absolute right-3 inset-y-0 flex items-center text-gray-500">
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
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </div>
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Mobile Number
              </label>
              <div className="relative w-full outline outline-1 outline-gray-300 rounded-lg p-1 flex items-center bg-gray-50">
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
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </span>
                <input
                  name="mobileNumber"
                  type="tel"
                  value={formData.mobileNumber}
                  disabled
                  className="block w-full appearance-none px-3 py-1.5 pl-7 text-base text-gray-900 placeholder:text-gray-400 bg-transparent focus:outline-none sm:text-sm"
                />
              </div>
            </div>

            {/* Alt. Mobile Number */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Alt. Mobile Number
              </label>
              <div className="relative w-full outline outline-1 outline-gray-300 rounded-lg p-1 flex items-center focus-within:outline-2 focus-within:outline-emerald-400 focus-within:-outline-offset-2">
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
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </span>
                <input
                  name="altMobileNumber"
                  type="tel"
                  value={formData.altMobileNumber}
                  onChange={handleChange}
                  className="block w-full appearance-none px-3 py-1.5 pl-7 text-base text-gray-900 placeholder:text-gray-400 bg-transparent focus:outline-none sm:text-sm"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Email Address
              </label>
              <div className="relative w-full outline outline-1 outline-gray-300 rounded-lg p-1 flex items-center focus-within:outline-2 focus-within:outline-emerald-400 focus-within:-outline-offset-2">
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
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full appearance-none px-3 py-1.5 pl-7 text-base text-gray-900 placeholder:text-gray-400 bg-transparent focus:outline-none sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <button className="bg-gray-400 font-medium rounded-full border-gray-300 px-4 py-2.5 text-sm mt-4 text-center text-gray-100 cursor-not-allowed">
            Previous
          </button>
          <button
            onClick={handleNext}
            className="bg-black hover:bg-black/80 text-white font-medium rounded-full border-gray-300 px-4 py-2.5 text-sm mt-4 text-center disabled:bg-gray-200 disabled:text-gray-600"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalContactForm;
