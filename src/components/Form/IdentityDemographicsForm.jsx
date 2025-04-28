import React, { useState, useEffect } from "react";
import NavigationButton from "../NavigationButton";
import { useNavigate } from "react-router-dom";

export default function IdentityDemographicsForm() {
  const [qualification, setQualification] = useState("");
  const [isOtherQualification, setIsOtherQualification] = useState(false);
  const [formData, setFormData] = useState({
    idCardType: "",
    idCardNumber: "",
    highestQualification: "",
    otherQualification: "",
    pwd: "no",
    bpl: "no",
    antodaya: "no",
    mgnrega: "no",
    minority: "no",
    bocw: "no",
    teaTribe: "no",
  });

  const navigate = useNavigate();

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("identityData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData(parsedData);

      if (parsedData.highestQualification) {
        setQualification(parsedData.highestQualification);
        setIsOtherQualification(parsedData.highestQualification === "other");
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleQualificationChange = (e) => {
    const value = e.target.value;
    setQualification(value);
    setIsOtherQualification(value === "other");
    setFormData((prevData) => ({
      ...prevData,
      highestQualification: value,
      otherQualification: value !== "other" ? "" : prevData.otherQualification,
    }));
  };

  const handleOtherQualificationChange = (e) => {
    const value = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      otherQualification: value,
    }));
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNext = () => {
    localStorage.setItem("identityData", JSON.stringify(formData));
    navigate("/location-info/step3");
  };

  return (
    <div className="">
      <div className="">
        <div className="bg-white border border-gray-300 rounded-xl md:rounded-2xl lg:rounded-3xl p-4 md:p-8 lg:p-12 shadow-sm">
          <legend className="font-semibold mb-6 md:mb-8 lg:mb-12 text-xl md:text-2xl">
            Identity & Demographic Details
          </legend>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {/* ID Card Type */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-900 mb-2">
                ID Card Type
              </label>
              <div className="relative w-full outline outline-1 outline-gray-300 rounded-lg p-1 flex items-center">
                <select
                  name="idCardType"
                  value={formData.idCardType}
                  onChange={handleChange}
                  className="block w-full appearance-none px-3 py-1.5 pr-7 text-base text-gray-900 placeholder-gray-400 bg-transparent focus:outline-none focus:outline-2 focus:outline-emerald-400 focus:-outline-offset-2 sm:text-sm"
                >
                  <option value="" disabled>
                    — Select —
                  </option>
                  <option value="uuid">Aadhar Card</option>
                  <option value="pan">PAN Card</option>
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

            {/* ID Card Number */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-900 mb-2">
                ID Card Number
              </label>
              <div className="relative w-full outline outline-1 outline-gray-300 rounded-lg p-1 flex items-center">
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
                      d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  name="idCardNumber"
                  value={formData.idCardNumber}
                  onChange={handleChange}
                  className="block w-full appearance-none px-3 py-1.5 pl-7 text-base text-gray-900 placeholder-gray-400 bg-transparent focus:outline-none focus:outline-2 focus:outline-emerald-400 focus:-outline-offset-2 sm:text-sm"
                />
              </div>
            </div>

            {/* Spacer for desktop layout */}
            <div className="hidden lg:block"></div>

            {/* Highest Qualification - spans full width */}
            <div className="col-span-full">
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Highest Qualification
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative w-full outline outline-1 outline-gray-300 rounded-lg p-1 flex items-center">
                  <select
                    id="qualification"
                    name="highestQualification"
                    value={qualification}
                    onChange={handleQualificationChange}
                    className="block w-full appearance-none px-3 py-1.5 pr-7 text-base text-gray-900 placeholder-gray-400 bg-transparent focus:outline-none focus:outline-2 focus:outline-emerald-400 focus:-outline-offset-2 sm:text-sm"
                  >
                    <option value="" disabled>
                      — Select —
                    </option>
                    <option value="5th">5th Pass</option>
                    <option value="8th">8th Pass</option>
                    <option value="grad">Graduate / Equivalent</option>
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
                <input
                  type="text"
                  id="otherQualification"
                  name="otherQualification"
                  value={formData.otherQualification}
                  onChange={handleOtherQualificationChange}
                  placeholder="Other Qualification"
                  disabled={!isOtherQualification}
                  className="relative w-full block px-3 py-2.5 text-base text-gray-900 placeholder-gray-400 bg-transparent sm:text-sm outline outline-1 outline-gray-300 rounded-lg p-1 focus:outline-2 focus:outline-emerald-400 focus:-outline-offset-2 disabled:bg-gray-100"
                />
              </div>
            </div>

            {/* Yes/No Questions - full width container */}
            <div className="col-span-full mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4 md:gap-x-12">
                {/* PwD Section */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <label className="block text-sm font-medium text-gray-900">
                      Are you a Person with Disability (PwD)?
                    </label>
                    <div className="flex gap-4 items-center">
                      <div className="flex gap-1 items-center">
                        <input
                          name="pwd"
                          type="radio"
                          value="yes"
                          checked={formData.pwd === "yes"}
                          onChange={handleRadioChange}
                          className="box-content w-2 h-2 appearance-none rounded-full border-4 border-white bg-white bg-clip-padding ring-1 ring-gray-950/20 outline-none checked:border-emerald-400 checked:ring-emerald-400"
                        />
                        <label className="text-sm font-medium">Yes</label>
                      </div>
                      <div className="flex gap-1 items-center">
                        <input
                          name="pwd"
                          type="radio"
                          value="no"
                          checked={formData.pwd === "no"}
                          onChange={handleRadioChange}
                          className="box-content w-2 h-2 appearance-none rounded-full border-4 border-white bg-white bg-clip-padding ring-1 ring-gray-950/20 outline-none checked:border-emerald-400 checked:ring-emerald-400"
                        />
                        <label className="text-sm font-medium">No</label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* BPL Section */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <label className="block text-sm font-medium text-gray-900">
                      Are you a BPL Card Holder?
                    </label>
                    <div className="flex gap-4 items-center">
                      <div className="flex gap-1 items-center">
                        <input
                          name="bpl"
                          type="radio"
                          value="yes"
                          checked={formData.bpl === "yes"}
                          onChange={handleRadioChange}
                          className="box-content w-2 h-2 appearance-none rounded-full border-4 border-white bg-white bg-clip-padding ring-1 ring-gray-950/20 outline-none checked:border-emerald-400 checked:ring-emerald-400"
                        />
                        <label className="text-sm font-medium">Yes</label>
                      </div>
                      <div className="flex gap-1 items-center">
                        <input
                          name="bpl"
                          type="radio"
                          value="no"
                          checked={formData.bpl === "no"}
                          onChange={handleRadioChange}
                          className="box-content w-2 h-2 appearance-none rounded-full border-4 border-white bg-white bg-clip-padding ring-1 ring-gray-950/20 outline-none checked:border-emerald-400 checked:ring-emerald-400"
                        />
                        <label className="text-sm font-medium">No</label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Antodaya Section */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <label className="block text-sm font-medium text-gray-900">
                      Are you an Antodaya Card Holder?
                    </label>
                    <div className="flex gap-4 items-center">
                      <div className="flex gap-1 items-center">
                        <input
                          name="antodaya"
                          type="radio"
                          value="yes"
                          checked={formData.antodaya === "yes"}
                          onChange={handleRadioChange}
                          className="box-content w-2 h-2 appearance-none rounded-full border-4 border-white bg-white bg-clip-padding ring-1 ring-gray-950/20 outline-none checked:border-emerald-400 checked:ring-emerald-400"
                        />
                        <label className="text-sm font-medium">Yes</label>
                      </div>
                      <div className="flex gap-1 items-center">
                        <input
                          name="antodaya"
                          type="radio"
                          value="no"
                          checked={formData.antodaya === "no"}
                          onChange={handleRadioChange}
                          className="box-content w-2 h-2 appearance-none rounded-full border-4 border-white bg-white bg-clip-padding ring-1 ring-gray-950/20 outline-none checked:border-emerald-400 checked:ring-emerald-400"
                        />
                        <label className="text-sm font-medium">No</label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* MGNREGA Section */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <label className="block text-sm font-medium text-gray-900">
                      Are you a MGNREGA Card Holder?
                    </label>
                    <div className="flex gap-4 items-center">
                      <div className="flex gap-1 items-center">
                        <input
                          name="mgnrega"
                          type="radio"
                          value="yes"
                          checked={formData.mgnrega === "yes"}
                          onChange={handleRadioChange}
                          className="box-content w-2 h-2 appearance-none rounded-full border-4 border-white bg-white bg-clip-padding ring-1 ring-gray-950/20 outline-none checked:border-emerald-400 checked:ring-emerald-400"
                        />
                        <label className="text-sm font-medium">Yes</label>
                      </div>
                      <div className="flex gap-1 items-center">
                        <input
                          name="mgnrega"
                          type="radio"
                          value="no"
                          checked={formData.mgnrega === "no"}
                          onChange={handleRadioChange}
                          className="box-content w-2 h-2 appearance-none rounded-full border-4 border-white bg-white bg-clip-padding ring-1 ring-gray-950/20 outline-none checked:border-emerald-400 checked:ring-emerald-400"
                        />
                        <label className="text-sm font-medium">No</label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Minority Community Section */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <label className="block text-sm font-medium text-gray-900">
                      Do you belong to any Minority Community?
                    </label>
                    <div className="flex gap-4 items-center">
                      <div className="flex gap-1 items-center">
                        <input
                          name="minority"
                          type="radio"
                          value="yes"
                          checked={formData.minority === "yes"}
                          onChange={handleRadioChange}
                          className="box-content w-2 h-2 appearance-none rounded-full border-4 border-white bg-white bg-clip-padding ring-1 ring-gray-950/20 outline-none checked:border-emerald-400 checked:ring-emerald-400"
                        />
                        <label className="text-sm font-medium">Yes</label>
                      </div>
                      <div className="flex gap-1 items-center">
                        <input
                          name="minority"
                          type="radio"
                          value="no"
                          checked={formData.minority === "no"}
                          onChange={handleRadioChange}
                          className="box-content w-2 h-2 appearance-none rounded-full border-4 border-white bg-white bg-clip-padding ring-1 ring-gray-950/20 outline-none checked:border-emerald-400 checked:ring-emerald-400"
                        />
                        <label className="text-sm font-medium">No</label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* BoCW Section */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <label className="block text-sm font-medium text-gray-900">
                      Are you registered as a Building and Construction Worker
                      (BoCW)?
                    </label>
                    <div className="flex gap-4 items-center">
                      <div className="flex gap-1 items-center">
                        <input
                          name="bocw"
                          type="radio"
                          value="yes"
                          checked={formData.bocw === "yes"}
                          onChange={handleRadioChange}
                          className="box-content w-2 h-2 appearance-none rounded-full border-4 border-white bg-white bg-clip-padding ring-1 ring-gray-950/20 outline-none checked:border-emerald-400 checked:ring-emerald-400"
                        />
                        <label className="text-sm font-medium">Yes</label>
                      </div>
                      <div className="flex gap-1 items-center">
                        <input
                          name="bocw"
                          type="radio"
                          value="no"
                          checked={formData.bocw === "no"}
                          onChange={handleRadioChange}
                          className="box-content w-2 h-2 appearance-none rounded-full border-4 border-white bg-white bg-clip-padding ring-1 ring-gray-950/20 outline-none checked:border-emerald-400 checked:ring-emerald-400"
                        />
                        <label className="text-sm font-medium">No</label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tea Tribe Section */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <label className="block text-sm font-medium text-gray-900">
                      Do you belong to the Tea Tribe Minority Group?
                    </label>
                    <div className="flex gap-4 items-center">
                      <div className="flex gap-1 items-center">
                        <input
                          name="teaTribe"
                          type="radio"
                          value="yes"
                          checked={formData.teaTribe === "yes"}
                          onChange={handleRadioChange}
                          className="box-content w-2 h-2 appearance-none rounded-full border-4 border-white bg-white bg-clip-padding ring-1 ring-gray-950/20 outline-none checked:border-emerald-400 checked:ring-emerald-400"
                        />
                        <label className="text-sm font-medium">Yes</label>
                      </div>
                      <div className="flex gap-1 items-center">
                        <input
                          name="teaTribe"
                          type="radio"
                          value="no"
                          checked={formData.teaTribe === "no"}
                          onChange={handleRadioChange}
                          className="box-content w-2 h-2 appearance-none rounded-full border-4 border-white bg-white bg-clip-padding ring-1 ring-gray-950/20 outline-none checked:border-emerald-400 checked:ring-emerald-400"
                        />
                        <label className="text-sm font-medium">No</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <NavigationButton
            label="Previous"
            to="/personal-info/step1"
            variant="secondary"
          />
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
}
