import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavigationButton from "../NavigationButton";

const LocationInformation = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    currentAddress: "",
    currentDistrict: "",
    currentAreaType: "city",
    currentULB: "",
    currentBlock: "",
    currentCityName: "",
    currentVillageName: "",
    currentCouncilConstituency: "",
    currentAssemblyConstituency: "",
    currentZipCode: "",
    currentPoliceStation: "",
    currentPostOffice: "",
    permanentAddress: "",
    permanentDistrict: "",
    permanentAreaType: "city",
    permanentULB: "",
    permanentBlock: "",
    permanentCityName: "",
    permanentVillageName: "",
    permanentCouncilConstituency: "",
    permanentAssemblyConstituency: "",
    permanentZipCode: "",
    permanentPoliceStation: "",
    permanentPostOffice: "",
    sameAddress: "yes",
  });

  const [isCurrentVillageEditable, setIsCurrentVillageEditable] =
    useState(false);
  const [isPermanentVillageEditable, setIsPermanentVillageEditable] =
    useState(false);

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("locationData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData(parsedData);
      setIsCurrentVillageEditable(parsedData.currentAreaType === "village");
      setIsPermanentVillageEditable(parsedData.permanentAreaType === "village");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCurrentAreaTypeChange = (type) => {
    setFormData((prevData) => ({
      ...prevData,
      currentAreaType: type,
      currentULB: "",
      currentBlock: "",
      currentCityName: "",
      currentVillageName: "",
    }));
    setIsCurrentVillageEditable(type === "village");
  };

  const handlePermanentAreaTypeChange = (type) => {
    setFormData((prevData) => ({
      ...prevData,
      permanentAreaType: type,
      permanentULB: "",
      permanentBlock: "",
      permanentCityName: "",
      permanentVillageName: "",
    }));
    setIsPermanentVillageEditable(type === "village");
  };

  const handleSameAddressChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      sameAddress: value,
      ...(value === "yes" && {
        permanentAddress: prevData.currentAddress,
        permanentDistrict: prevData.currentDistrict,
        permanentAreaType: prevData.currentAreaType,
        permanentULB: prevData.currentULB,
        permanentBlock: prevData.currentBlock,
        permanentCityName: prevData.currentCityName,
        permanentVillageName: prevData.currentVillageName,
        permanentCouncilConstituency: prevData.currentCouncilConstituency,
        permanentAssemblyConstituency: prevData.currentAssemblyConstituency,
        permanentZipCode: prevData.currentZipCode,
        permanentPoliceStation: prevData.currentPoliceStation,
        permanentPostOffice: prevData.currentPostOffice,
      }),
    }));

    if (value === "yes") {
      setIsPermanentVillageEditable(isCurrentVillageEditable);
    }
  };

  const handleNext = () => {
    localStorage.setItem("locationData", JSON.stringify(formData));
    navigate("/employment-pre/step4");
  };

  return (
    <div className="">
      <div className="">
        <div className="bg-white border border-gray-300 rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 mt-4 sm:mt-6">
          <legend className="font-semibold mb-4 sm:mb-6 md:mb-8 lg:mb-12 text-xl sm:text-2xl">
            Location Information
          </legend>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Current Address */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-3">
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Current Address
              </label>
              <textarea
                name="currentAddress"
                value={formData.currentAddress}
                onChange={handleChange}
                className="relative w-full block px-3 py-2.5 text-base text-gray-900 placeholder-gray-400 bg-transparent sm:text-sm outline outline-1 outline-gray-300 rounded-lg p-1 focus:outline-2 focus:outline-emerald-400 focus:-outline-offset-2"
                rows="3"
              />
            </div>

            {/* District */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                District
              </label>
              <div className="relative w-full outline outline-1 outline-gray-300 rounded-lg p-1 flex items-center has-[select:focus]:outline-2 has-[select:focus]:outline-emerald-400 has-[select:focus]:-outline-offset-2">
                <select
                  name="currentDistrict"
                  value={formData.currentDistrict}
                  onChange={handleChange}
                  className="block w-full appearance-none px-3 py-1.5 pr-7 text-base text-gray-900 bg-transparent focus:outline-none sm:text-sm"
                >
                  <option value="" disabled>
                    — Select —
                  </option>
                  <option value="dist1">Dist 1</option>
                  <option value="dist2">Dist 2</option>
                </select>
                <span className="pointer-events-none absolute right-3 inset-y-0 flex items-center text-gray-500">
                  <i className="bi bi-chevron-down text-xs"></i>
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Type of Area
              </label>
              <div className="flex gap-4 items-center mt-1 sm:mt-3">
                <div className="flex gap-1 items-center">
                  <input
                    type="radio"
                    name="current_area_type"
                    value="city"
                    checked={formData.currentAreaType === "city"}
                    onChange={() => handleCurrentAreaTypeChange("city")}
                    className="box-content size-2.25 appearance-none rounded-full border-4 border-white bg-white ring-1 ring-gray-950/20 checked:border-emerald-400 checked:ring-emerald-400"
                  />
                  <label className="text-sm font-medium">City</label>
                </div>
                <div className="flex gap-1 items-center">
                  <input
                    type="radio"
                    name="current_area_type"
                    value="village"
                    checked={formData.currentAreaType === "village"}
                    onChange={() => handleCurrentAreaTypeChange("village")}
                    className="box-content size-2.25 appearance-none rounded-full border-4 border-white bg-white ring-1 ring-gray-950/20 checked:border-emerald-400 checked:ring-emerald-400"
                  />
                  <label className="text-sm font-medium">Village</label>
                </div>
              </div>
            </div>

            {/* ULB or Block */}
            <div>
              {formData.currentAreaType === "city" ? (
                <>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    ULB
                  </label>
                  <div className="relative w-full outline outline-1 outline-gray-300 rounded-lg p-1 flex items-center">
                    <select
                      name="currentULB"
                      value={formData.currentULB}
                      onChange={handleChange}
                      className="block w-full appearance-none px-3 py-1.5 pr-7 text-base text-gray-900 bg-transparent focus:outline-none sm:text-sm"
                    >
                      <option value="" disabled>
                        — Select —
                      </option>
                      <option value="ulb1">ULB 1</option>
                      <option value="ulb2">ULB 2</option>
                    </select>
                    <span className="pointer-events-none absolute right-3 inset-y-0 flex items-center text-gray-500">
                      <i className="bi bi-chevron-down text-xs"></i>
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Block
                  </label>
                  <div className="relative w-full outline outline-1 outline-gray-300 rounded-lg p-1 flex items-center">
                    <select
                      name="currentBlock"
                      value={formData.currentBlock}
                      onChange={handleChange}
                      className="block w-full appearance-none px-3 py-1.5 pr-7 text-base text-gray-900 bg-transparent focus:outline-none sm:text-sm"
                    >
                      <option value="" disabled>
                        — Select —
                      </option>
                      <option value="block1">Block 1</option>
                      <option value="block2">Block 2</option>
                    </select>
                    <span className="pointer-events-none absolute right-3 inset-y-0 flex items-center text-gray-500">
                      <i className="bi bi-chevron-down text-xs"></i>
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* City Name or Village Name */}
            <div>
              {formData.currentAreaType === "city" ? (
                <>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    City Name
                  </label>
                  <input
                    name="currentCityName"
                    value={formData.currentCityName}
                    onChange={handleChange}
                    className="relative w-full block px-3 py-2.5 text-base text-gray-900 bg-transparent sm:text-sm outline outline-1 outline-gray-300 rounded-lg p-1 focus:outline-2 focus:outline-emerald-400 focus:-outline-offset-2"
                  />
                </>
              ) : (
                <>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Village Name
                  </label>
                  <input
                    name="currentVillageName"
                    value={formData.currentVillageName}
                    onChange={handleChange}
                    className={`relative w-full block px-3 py-2.5 text-base text-gray-900 bg-transparent sm:text-sm outline outline-1 outline-gray-300 rounded-lg p-1 focus:outline-2 focus:outline-emerald-400 focus:-outline-offset-2 ${
                      isCurrentVillageEditable ? "" : "bg-gray-100"
                    }`}
                    disabled={!isCurrentVillageEditable}
                  />
                </>
              )}
            </div>

            {/* Council Constituency */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Council Constituency
              </label>
              <div className="relative w-full outline outline-1 outline-gray-300 rounded-lg p-1 flex items-center">
                <select
                  name="currentCouncilConstituency"
                  value={formData.currentCouncilConstituency}
                  onChange={handleChange}
                  className="block w-full appearance-none px-3 py-1.5 pr-7 text-base text-gray-900 bg-transparent focus:outline-none sm:text-sm"
                >
                  <option value="" disabled>
                    — Select —
                  </option>
                  <option value="const1">Constituency 1</option>
                  <option value="const2">Constituency 2</option>
                </select>
                <span className="pointer-events-none absolute right-3 inset-y-0 flex items-center text-gray-500">
                  <i className="bi bi-chevron-down text-xs"></i>
                </span>
              </div>
            </div>

            {/* Assembly Constituency */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Assembly Constituency
              </label>
              <div className="relative w-full outline outline-1 outline-gray-300 rounded-lg p-1 flex items-center">
                <select
                  name="currentAssemblyConstituency"
                  value={formData.currentAssemblyConstituency}
                  onChange={handleChange}
                  className="block w-full appearance-none px-3 py-1.5 pr-7 text-base text-gray-900 bg-transparent focus:outline-none sm:text-sm"
                >
                  <option value="" disabled>
                    — Select —
                  </option>
                  <option value="const1">Constituency 1</option>
                  <option value="const2">Constituency 2</option>
                </select>
                <span className="pointer-events-none absolute right-3 inset-y-0 flex items-center text-gray-500">
                  <i className="bi bi-chevron-down text-xs"></i>
                </span>
              </div>
            </div>

            {/* Zip Code */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Zip Code
              </label>
              <input
                name="currentZipCode"
                value={formData.currentZipCode}
                onChange={handleChange}
                className="relative w-full block px-3 py-2.5 text-base text-gray-900 bg-transparent sm:text-sm outline outline-1 outline-gray-300 rounded-lg p-1 focus:outline-2 focus:outline-emerald-400 focus:-outline-offset-2"
              />
            </div>

            {/* Police Station */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Police Station
              </label>
              <input
                name="currentPoliceStation"
                value={formData.currentPoliceStation}
                onChange={handleChange}
                className="relative w-full block px-3 py-2.5 text-base text-gray-900 bg-transparent sm:text-sm outline outline-1 outline-gray-300 rounded-lg p-1 focus:outline-2 focus:outline-emerald-400 focus:-outline-offset-2"
              />
            </div>

            {/* Post Office */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Post Office
              </label>
              <input
                name="currentPostOffice"
                value={formData.currentPostOffice}
                onChange={handleChange}
                className="relative w-full block px-3 py-2.5 text-base text-gray-900 bg-transparent sm:text-sm outline outline-1 outline-gray-300 rounded-lg p-1 focus:outline-2 focus:outline-emerald-400 focus:-outline-offset-2"
              />
            </div>

            {/* Permanent Address Checkbox */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 mt-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <label className="block text-sm font-medium text-gray-900">
                  Is Your Permanent Address the Same as Your Current Address?
                </label>
                <div className="flex gap-4 items-center">
                  <div className="flex gap-1 items-center">
                    <input
                      type="radio"
                      name="samePaddress"
                      value="yes"
                      checked={formData.sameAddress === "yes"}
                      onChange={() => handleSameAddressChange("yes")}
                      className="box-content size-2.25 appearance-none rounded-full border-4 border-white bg-white ring-1 ring-gray-950/20 checked:border-emerald-400 checked:ring-emerald-400"
                    />
                    <label className="text-sm font-medium">Yes</label>
                  </div>
                  <div className="flex gap-1 items-center">
                    <input
                      type="radio"
                      name="samePaddress"
                      value="no"
                      checked={formData.sameAddress === "no"}
                      onChange={() => handleSameAddressChange("no")}
                      className="box-content size-2.25 appearance-none rounded-full border-4 border-white bg-white ring-1 ring-gray-950/20 checked:border-emerald-400 checked:ring-emerald-400"
                    />
                    <label className="text-sm font-medium">No</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Permanent Address Section */}
          {formData.sameAddress === "no" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200">
              <div className="col-span-1 sm:col-span-2 lg:col-span-3">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Permanent Address
                </label>
                <textarea
                  name="permanentAddress"
                  value={formData.permanentAddress}
                  onChange={handleChange}
                  className="relative w-full block px-3 py-2.5 text-base text-gray-900 bg-transparent sm:text-sm outline outline-1 outline-gray-300 rounded-lg p-1 focus:outline-2 focus:outline-emerald-400 focus:-outline-offset-2"
                  rows="3"
                />
              </div>

              {/* District */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  District
                </label>
                <div className="relative w-full outline outline-1 outline-gray-300 rounded-lg p-1 flex items-center has-[select:focus]:outline-2 has-[select:focus]:outline-emerald-400 has-[select:focus]:-outline-offset-2">
                  <select
                    name="permanentDistrict"
                    value={formData.permanentDistrict}
                    onChange={handleChange}
                    className="block w-full appearance-none px-3 py-1.5 pr-7 text-base text-gray-900 bg-transparent focus:outline-none sm:text-sm"
                  >
                    <option value="" disabled>
                      — Select —
                    </option>
                    <option value="dist1">Dist 1</option>
                    <option value="dist2">Dist 2</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 inset-y-0 flex items-center text-gray-500">
                    <i className="bi bi-chevron-down text-xs"></i>
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Type of Area
                </label>
                <div className="flex gap-4 items-center mt-1 sm:mt-3">
                  <div className="flex gap-1 items-center">
                    <input
                      type="radio"
                      name="permanent_area_type"
                      value="city"
                      checked={formData.permanentAreaType === "city"}
                      onChange={() => handlePermanentAreaTypeChange("city")}
                      className="box-content size-2.25 appearance-none rounded-full border-4 border-white bg-white ring-1 ring-gray-950/20 checked:border-emerald-400 checked:ring-emerald-400"
                    />
                    <label className="text-sm font-medium">City</label>
                  </div>
                  <div className="flex gap-1 items-center">
                    <input
                      type="radio"
                      name="permanent_area_type"
                      value="village"
                      checked={formData.permanentAreaType === "village"}
                      onChange={() => handlePermanentAreaTypeChange("village")}
                      className="box-content size-2.25 appearance-none rounded-full border-4 border-white bg-white ring-1 ring-gray-950/20 checked:border-emerald-400 checked:ring-emerald-400"
                    />
                    <label className="text-sm font-medium">Village</label>
                  </div>
                </div>
              </div>

              {/* ULB or Block */}
              <div>
                {formData.permanentAreaType === "city" ? (
                  <>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      ULB
                    </label>
                    <div className="relative w-full outline outline-1 outline-gray-300 rounded-lg p-1 flex items-center">
                      <select
                        name="permanentULB"
                        value={formData.permanentULB}
                        onChange={handleChange}
                        className="block w-full appearance-none px-3 py-1.5 pr-7 text-base text-gray-900 bg-transparent focus:outline-none sm:text-sm"
                      >
                        <option value="" disabled>
                          — Select —
                        </option>
                        <option value="ulb1">ULB 1</option>
                        <option value="ulb2">ULB 2</option>
                      </select>
                      <span className="pointer-events-none absolute right-3 inset-y-0 flex items-center text-gray-500">
                        <i className="bi bi-chevron-down text-xs"></i>
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Block
                    </label>
                    <div className="relative w-full outline outline-1 outline-gray-300 rounded-lg p-1 flex items-center">
                      <select
                        name="permanentBlock"
                        value={formData.permanentBlock}
                        onChange={handleChange}
                        className="block w-full appearance-none px-3 py-1.5 pr-7 text-base text-gray-900 bg-transparent focus:outline-none sm:text-sm"
                      >
                        <option value="" disabled>
                          — Select —
                        </option>
                        <option value="block1">Block 1</option>
                        <option value="block2">Block 2</option>
                      </select>
                      <span className="pointer-events-none absolute right-3 inset-y-0 flex items-center text-gray-500">
                        <i className="bi bi-chevron-down text-xs"></i>
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* City Name or Village Name */}
              <div>
                {formData.permanentAreaType === "city" ? (
                  <>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      City Name
                    </label>
                    <input
                      name="permanentCityName"
                      value={formData.permanentCityName}
                      onChange={handleChange}
                      className="relative w-full block px-3 py-2.5 text-base text-gray-900 bg-transparent sm:text-sm outline outline-1 outline-gray-300 rounded-lg p-1 focus:outline-2 focus:outline-emerald-400 focus:-outline-offset-2"
                    />
                  </>
                ) : (
                  <>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Village Name
                    </label>
                    <input
                      name="permanentVillageName"
                      value={formData.permanentVillageName}
                      onChange={handleChange}
                      className={`relative w-full block px-3 py-2.5 text-base text-gray-900 bg-transparent sm:text-sm outline outline-1 outline-gray-300 rounded-lg p-1 focus:outline-2 focus:outline-emerald-400 focus:-outline-offset-2 ${
                        isPermanentVillageEditable ? "" : "bg-gray-100"
                      }`}
                      disabled={!isPermanentVillageEditable}
                    />
                  </>
                )}
              </div>

              {/* Council Constituency */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Council Constituency
                </label>
                <div className="relative w-full outline outline-1 outline-gray-300 rounded-lg p-1 flex items-center">
                  <select
                    name="permanentCouncilConstituency"
                    value={formData.permanentCouncilConstituency}
                    onChange={handleChange}
                    className="block w-full appearance-none px-3 py-1.5 pr-7 text-base text-gray-900 bg-transparent focus:outline-none sm:text-sm"
                  >
                    <option value="" disabled>
                      — Select —
                    </option>
                    <option value="const1">Constituency 1</option>
                    <option value="const2">Constituency 2</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 inset-y-0 flex items-center text-gray-500">
                    <i className="bi bi-chevron-down text-xs"></i>
                  </span>
                </div>
              </div>

              {/* Assembly Constituency */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Assembly Constituency
                </label>
                <div className="relative w-full outline outline-1 outline-gray-300 rounded-lg p-1 flex items-center">
                  <select
                    name="permanentAssemblyConstituency"
                    value={formData.permanentAssemblyConstituency}
                    onChange={handleChange}
                    className="block w-full appearance-none px-3 py-1.5 pr-7 text-base text-gray-900 bg-transparent focus:outline-none sm:text-sm"
                  >
                    <option value="" disabled>
                      — Select —
                    </option>
                    <option value="const1">Constituency 1</option>
                    <option value="const2">Constituency 2</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 inset-y-0 flex items-center text-gray-500">
                    <i className="bi bi-chevron-down text-xs"></i>
                  </span>
                </div>
              </div>

              {/* Zip Code */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Zip Code
                </label>
                <input
                  name="permanentZipCode"
                  value={formData.permanentZipCode}
                  onChange={handleChange}
                  className="relative w-full block px-3 py-2.5 text-base text-gray-900 bg-transparent sm:text-sm outline outline-1 outline-gray-300 rounded-lg p-1 focus:outline-2 focus:outline-emerald-400 focus:-outline-offset-2"
                />
              </div>

              {/* Police Station */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Police Station
                </label>
                <input
                  name="permanentPoliceStation"
                  value={formData.permanentPoliceStation}
                  onChange={handleChange}
                  className="relative w-full block px-3 py-2.5 text-base text-gray-900 bg-transparent sm:text-sm outline outline-1 outline-gray-300 rounded-lg p-1 focus:outline-2 focus:outline-emerald-400 focus:-outline-offset-2"
                />
              </div>

              {/* Post Office */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Post Office
                </label>
                <input
                  name="permanentPostOffice"
                  value={formData.permanentPostOffice}
                  onChange={handleChange}
                  className="relative w-full block px-3 py-2.5 text-base text-gray-900 bg-transparent sm:text-sm outline outline-1 outline-gray-300 rounded-lg p-1 focus:outline-2 focus:outline-emerald-400 focus:-outline-400 focus:-outline-offset-2"
                />
              </div>
            </div>
          )}
        </div>
        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <NavigationButton
            label="Previous"
            to="/identity-demographics/step2"
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
};

export default LocationInformation;
