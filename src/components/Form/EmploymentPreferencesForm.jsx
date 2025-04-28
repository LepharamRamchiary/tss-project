import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavigationButton from "../NavigationButton";

export default function EmploymentPreferencesForm() {
  const navigate = useNavigate();

  const [preferences, setPreferences] = useState([
    { id: 1, category: "", sector: "", course: "", district: "" },
  ]);
  const [goOutsideDistrict, setGoOutsideDistrict] = useState(false);
  const [goOutsideState, setGoOutsideState] = useState(false);
  const [goOutsideIndia, setGoOutsideIndia] = useState(false);
  const [employmentExchangeNumber, setEmploymentExchangeNumber] = useState("");
  const [outsideDistrictPreferences, setOutsideDistrictPreferences] = useState([
    "",
    "",
    "",
  ]);
  const [outsideStatePreferences, setOutsideStatePreferences] = useState([
    "",
    "",
    "",
  ]);

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("employmentPreferences");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setPreferences(
        parsedData.preferences || [
          { id: 1, category: "", sector: "", course: "", district: "" },
        ]
      );
      setGoOutsideDistrict(parsedData.goOutsideDistrict || false);
      setGoOutsideState(parsedData.goOutsideState || false);
      setGoOutsideIndia(parsedData.goOutsideIndia || false);
      setEmploymentExchangeNumber(parsedData.employmentExchangeNumber || "");
      setOutsideDistrictPreferences(
        parsedData.outsideDistrictPreferences || ["", "", ""]
      );
      setOutsideStatePreferences(
        parsedData.outsideStatePreferences || ["", "", ""]
      );
    }
  }, []);

  const addPreference = () => {
    setPreferences([
      ...preferences,
      {
        id: preferences.length + 1,
        category: "",
        sector: "",
        course: "",
        district: "",
      },
    ]);
  };

  const removePreference = (id) => {
    if (preferences.length === 1) return;

    const updatedPreferences = preferences.filter((pref) => pref.id !== id);

    const reindexedPreferences = updatedPreferences.map((pref, index) => ({
      ...pref,
      id: index + 1,
    }));

    setPreferences(reindexedPreferences);
  };

  const handlePreferenceChange = (id, field, value) => {
    const updatedPreferences = preferences.map((pref) => {
      if (pref.id === id) {
        return { ...pref, [field]: value };
      }
      return pref;
    });
    setPreferences(updatedPreferences);
  };

  const handleExchangeNumberChange = (e) => {
    setEmploymentExchangeNumber(e.target.value);
  };

  const handleOutsideDistrictChange = (index, value) => {
    const updated = [...outsideDistrictPreferences];
    updated[index] = value;
    setOutsideDistrictPreferences(updated);
  };

  const handleOutsideStateChange = (index, value) => {
    const updated = [...outsideStatePreferences];
    updated[index] = value;
    setOutsideStatePreferences(updated);
  };

  const handleNext = () => {
    const formData = {
      preferences,
      goOutsideDistrict,
      goOutsideState,
      goOutsideIndia,
      employmentExchangeNumber,
      outsideDistrictPreferences,
      outsideStatePreferences,
    };
    localStorage.setItem("employmentPreferences", JSON.stringify(formData));
    navigate("/decl-step/step5");
  };

  const handlePrevious = () => {
    navigate("/employment-pre");
  };

  return (
    <div className="">
      <div className="">
        <div className="bg-white border border-gray-300 rounded-3xl p-4 md:p-8 lg:p-12">
          <legend className="font-semibold mb-6 md:mb-8 lg:mb-12 text-xl md:text-2xl">
            Employment, Course & Relocation Preferences
          </legend>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Employment Exchange Number */}
            <div className="col-span-1">
              <label className="block text-sm/6 font-medium text-gray-900 mb-2">
                Employment Exchange Number
              </label>
              <div className="relative w-full has-[input:focus]:outline-2 has-[input:focus]:outline-emerald-400 has-[input:focus]:-outline-offset-2 has-[input:disabled]:bg-gray-100 outline outline-1 outline-gray-300 rounded-lg p-1 flex items-center">
                <span className="pointer-events-none absolute left-3 inset-y-0 flex items-center text-gray-500">
                  <i className="bi bi-briefcase text-xs"></i>
                </span>
                <input
                  type="tel"
                  value={employmentExchangeNumber}
                  onChange={handleExchangeNumberChange}
                  className="block w-full appearance-none px-3 py-1.5 pl-7 text-base text-gray-900 placeholder:text-gray-400 bg-transparent focus:outline-none sm:text-sm"
                />
              </div>
            </div>

            {/* Preferences Table */}
            <div className="col-span-1 md:col-span-2 lg:col-span-3 mt-4">
              <label className="block text-sm/6 font-medium text-gray-900 mb-2">
                Preferences
              </label>
              <div className="rounded-lg border border-gray-300 overflow-x-auto">
                <table className="w-full text-sm divide-y divide-gray-300 table-fixed">
                  <thead className="bg-gray-100">
                    <tr>
                      <th
                        scope="col"
                        className="px-2 py-2 font-medium text-gray-500 uppercase text-xs w-12"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-2 font-medium text-gray-500 uppercase text-xs text-left w-32 sm:w-auto"
                      >
                        Course Category
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-2 font-medium text-gray-500 uppercase text-xs text-left w-32 sm:w-auto"
                      >
                        Sector
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-2 font-medium text-gray-500 uppercase text-xs text-left w-32 sm:w-auto"
                      >
                        Course
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-2 font-medium text-gray-500 uppercase text-xs text-left w-32 sm:w-auto"
                      >
                        District
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-2 font-medium text-gray-500 uppercase text-xs w-28"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-300">
                    {preferences.map((pref) => (
                      <tr key={pref.id}>
                        <th scope="col" className="px-2 py-2">
                          {pref.id}
                        </th>
                        <td scope="col" className="px-2 py-2 break-words">
                          <div className="relative w-full has-[select:focus]:outline-2 has-[select:focus]:outline-emerald-400 has-[select:focus]:-outline-offset-2 outline outline-1 outline-gray-300 rounded-lg p-1 flex items-center">
                            <select
                              className="block w-full appearance-none px-3 py-1.5 pr-7 text-base text-gray-900 placeholder:text-gray-400 bg-transparent focus:outline-none sm:text-sm"
                              value={pref.category}
                              onChange={(e) =>
                                handlePreferenceChange(
                                  pref.id,
                                  "category",
                                  e.target.value
                                )
                              }
                            >
                              <option value="" disabled>
                                — Select —
                              </option>
                              <option value="category1">Category 1</option>
                              <option value="category2">Category 2</option>
                            </select>
                            <span className="pointer-events-none absolute right-3 inset-y-0 flex items-center text-gray-500">
                              <i className="bi bi-chevron-down text-xs"></i>
                            </span>
                          </div>
                        </td>
                        <td scope="col" className="px-2 py-2">
                          <div className="relative w-full has-[select:focus]:outline-2 has-[select:focus]:outline-emerald-400 has-[select:focus]:-outline-offset-2 outline outline-1 outline-gray-300 rounded-lg p-1 flex items-center">
                            <select
                              className="block w-full appearance-none px-3 py-1.5 pr-7 text-base text-gray-900 placeholder:text-gray-400 bg-transparent focus:outline-none sm:text-sm"
                              value={pref.sector}
                              onChange={(e) =>
                                handlePreferenceChange(
                                  pref.id,
                                  "sector",
                                  e.target.value
                                )
                              }
                            >
                              <option value="" disabled>
                                — Select —
                              </option>
                              <option value="sector1">Sector 1</option>
                              <option value="sector2">Sector 2</option>
                            </select>
                            <span className="pointer-events-none absolute right-3 inset-y-0 flex items-center text-gray-500">
                              <i className="bi bi-chevron-down text-xs"></i>
                            </span>
                          </div>
                        </td>
                        <td scope="col" className="px-2 py-2">
                          <div className="relative w-full has-[select:focus]:outline-2 has-[select:focus]:outline-emerald-400 has-[select:focus]:-outline-offset-2 outline outline-1 outline-gray-300 rounded-lg p-1 flex items-center">
                            <select
                              className="block w-full appearance-none px-3 py-1.5 pr-7 text-base text-gray-900 placeholder:text-gray-400 bg-transparent focus:outline-none sm:text-sm"
                              value={pref.course}
                              onChange={(e) =>
                                handlePreferenceChange(
                                  pref.id,
                                  "course",
                                  e.target.value
                                )
                              }
                            >
                              <option value="" disabled>
                                — Select —
                              </option>
                              <option value="course1">Course 1</option>
                              <option value="course2">Course 2</option>
                            </select>
                            <span className="pointer-events-none absolute right-3 inset-y-0 flex items-center text-gray-500">
                              <i className="bi bi-chevron-down text-xs"></i>
                            </span>
                          </div>
                        </td>
                        <td scope="col" className="px-2 py-2">
                          <div className="relative w-full has-[select:focus]:outline-2 has-[select:focus]:outline-emerald-400 has-[select:focus]:-outline-offset-2 outline outline-1 outline-gray-300 rounded-lg p-1 flex items-center">
                            <select
                              className="block w-full appearance-none px-3 py-1.5 pr-7 text-base text-gray-900 placeholder:text-gray-400 bg-transparent focus:outline-none sm:text-sm"
                              value={pref.district}
                              onChange={(e) =>
                                handlePreferenceChange(
                                  pref.id,
                                  "district",
                                  e.target.value
                                )
                              }
                            >
                              <option value="" disabled>
                                — Select —
                              </option>
                              <option value="district1">District 1</option>
                              <option value="district2">District 2</option>
                            </select>
                            <span className="pointer-events-none absolute right-3 inset-y-0 flex items-center text-gray-500">
                              <i className="bi bi-chevron-down text-xs"></i>
                            </span>
                          </div>
                        </td>
                        <td scope="col" className="px-2 py-2">
                          <div className="flex items-center justify-center gap-2">
                            {/* Remove button - only show if there's more than one preference */}
                            {preferences.length > 1 && (
                              <button
                                type="button"
                                className="bg-red-500 hover:bg-red-600 text-white font-medium rounded-full border-gray-300 px-2.5 py-1 text-sm text-center"
                                onClick={() => removePreference(pref.id)}
                                aria-label="Remove preference"
                              >
                                <i className="">×</i>
                              </button>
                            )}

                            {/* Add button - only show on the last row */}
                            {pref.id === preferences.length && (
                              <button
                                type="button"
                                className="bg-black hover:bg-black/80 text-white font-medium rounded-full border-gray-300 px-2.5 py-1 text-sm text-center"
                                onClick={addPreference}
                                aria-label="Add preference"
                              >
                                <i className="">+</i>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Relocation Preferences */}
            <div className="col-span-1 md:col-span-2 lg:col-span-3 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-12">
                {/* Outside District */}
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <label className="text-sm/6 font-medium text-gray-900">
                      Are you willing to go outside District?
                    </label>
                    <div className="flex gap-4 items-center">
                      <div className="flex gap-2 items-center">
                        <input
                          name="oDist"
                          type="radio"
                          className="box-content size-2.25 appearance-none rounded-full border-4 border-white bg-white bg-clip-padding ring-1 ring-gray-950/20 outline-none checked:border-emerald-400 checked:ring-emerald-400"
                          checked={goOutsideDistrict}
                          onChange={() => setGoOutsideDistrict(true)}
                        />
                        <label className="text-sm font-medium">Yes</label>
                      </div>
                      <div className="flex gap-2 items-center">
                        <input
                          name="oDist"
                          type="radio"
                          className="box-content size-2.25 appearance-none rounded-full border-4 border-white bg-white bg-clip-padding ring-1 ring-gray-950/20 outline-none checked:border-emerald-400 checked:ring-emerald-400"
                          checked={!goOutsideDistrict}
                          onChange={() => setGoOutsideDistrict(false)}
                        />
                        <label className="text-sm font-medium">No</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div></div>

                {/* Outside District Preferences */}
                {goOutsideDistrict && (
                  <div className="col-span-1 md:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="relative w-full has-[select:focus]:outline-2 has-[select:focus]:outline-emerald-400 has-[select:focus]:-outline-offset-2 outline outline-1 outline-gray-300 rounded-lg p-1 flex items-center">
                      <select
                        className="block w-full appearance-none px-3 py-1.5 pr-7 text-base text-gray-900 placeholder:text-gray-400 bg-transparent focus:outline-none sm:text-sm"
                        value={outsideDistrictPreferences[0]}
                        onChange={(e) =>
                          handleOutsideDistrictChange(0, e.target.value)
                        }
                      >
                        <option value="" disabled>
                          — Select State —
                        </option>
                        <option value="state1">State 1</option>
                        <option value="state2">State 2</option>
                      </select>
                      <span className="pointer-events-none absolute right-3 inset-y-0 flex items-center text-gray-500">
                        <i className="bi bi-chevron-down text-xs"></i>
                      </span>
                    </div>
                    <div className="relative w-full has-[select:focus]:outline-2 has-[select:focus]:outline-emerald-400 has-[select:focus]:-outline-offset-2 outline outline-1 outline-gray-300 rounded-lg p-1 flex items-center">
                      <select
                        className="block w-full appearance-none px-3 py-1.5 pr-7 text-base text-gray-900 placeholder:text-gray-400 bg-transparent focus:outline-none sm:text-sm"
                        value={outsideDistrictPreferences[1]}
                        onChange={(e) =>
                          handleOutsideDistrictChange(1, e.target.value)
                        }
                      >
                        <option value="" disabled>
                          — Select State —
                        </option>
                        <option value="state1">State 1</option>
                        <option value="state2">State 2</option>
                      </select>
                      <span className="pointer-events-none absolute right-3 inset-y-0 flex items-center text-gray-500">
                        <i className="bi bi-chevron-down text-xs"></i>
                      </span>
                    </div>
                    <div className="relative w-full has-[select:focus]:outline-2 has-[select:focus]:outline-emerald-400 has-[select:focus]:-outline-offset-2 outline outline-1 outline-gray-300 rounded-lg p-1 flex items-center">
                      <select
                        className="block w-full appearance-none px-3 py-1.5 pr-7 text-base text-gray-900 placeholder:text-gray-400 bg-transparent focus:outline-none sm:text-sm"
                        value={outsideDistrictPreferences[2]}
                        onChange={(e) =>
                          handleOutsideDistrictChange(2, e.target.value)
                        }
                      >
                        <option value="" disabled>
                          — Select State —
                        </option>
                        <option value="state1">State 1</option>
                        <option value="state2">State 2</option>
                      </select>
                      <span className="pointer-events-none absolute right-3 inset-y-0 flex items-center text-gray-500">
                        <i className="bi bi-chevron-down text-xs"></i>
                      </span>
                    </div>
                  </div>
                )}

                {/* Outside State */}
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <label className="text-sm/6 font-medium text-gray-900">
                      Are you willing to work outside your State?
                    </label>
                    <div className="flex gap-4 items-center">
                      <div className="flex gap-2 items-center">
                        <input
                          name="oState"
                          type="radio"
                          className="box-content size-2.25 appearance-none rounded-full border-4 border-white bg-white bg-clip-padding ring-1 ring-gray-950/20 outline-none checked:border-emerald-400 checked:ring-emerald-400"
                          checked={goOutsideState}
                          onChange={() => setGoOutsideState(true)}
                        />
                        <label className="text-sm font-medium">Yes</label>
                      </div>
                      <div className="flex gap-2 items-center">
                        <input
                          name="oState"
                          type="radio"
                          className="box-content size-2.25 appearance-none rounded-full border-4 border-white bg-white bg-clip-padding ring-1 ring-gray-950/20 outline-none checked:border-emerald-400 checked:ring-emerald-400"
                          checked={!goOutsideState}
                          onChange={() => setGoOutsideState(false)}
                        />
                        <label className="text-sm font-medium">No</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div></div>

                {/* Outside State Preferences */}
                {goOutsideState && (
                  <div className="col-span-1 md:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="relative w-full has-[select:focus]:outline-2 has-[select:focus]:outline-emerald-400 has-[select:focus]:-outline-offset-2 outline outline-1 outline-gray-300 rounded-lg p-1 flex items-center">
                      <select
                        className="block w-full appearance-none px-3 py-1.5 pr-7 text-base text-gray-900 placeholder:text-gray-400 bg-transparent focus:outline-none sm:text-sm"
                        value={outsideStatePreferences[0]}
                        onChange={(e) =>
                          handleOutsideStateChange(0, e.target.value)
                        }
                      >
                        <option value="" disabled>
                          — Select District —
                        </option>
                        <option value="district1">District 1</option>
                        <option value="district2">District 2</option>
                      </select>
                      <span className="pointer-events-none absolute right-3 inset-y-0 flex items-center text-gray-500">
                        <i className="bi bi-chevron-down text-xs"></i>
                      </span>
                    </div>
                    <div className="relative w-full has-[select:focus]:outline-2 has-[select:focus]:outline-emerald-400 has-[select:focus]:-outline-offset-2 outline outline-1 outline-gray-300 rounded-lg p-1 flex items-center">
                      <select
                        className="block w-full appearance-none px-3 py-1.5 pr-7 text-base text-gray-900 placeholder:text-gray-400 bg-transparent focus:outline-none sm:text-sm"
                        value={outsideStatePreferences[1]}
                        onChange={(e) =>
                          handleOutsideStateChange(1, e.target.value)
                        }
                      >
                        <option value="" disabled>
                          — Select District —
                        </option>
                        <option value="district1">District 1</option>
                        <option value="district2">District 2</option>
                      </select>
                      <span className="pointer-events-none absolute right-3 inset-y-0 flex items-center text-gray-500">
                        <i className="bi bi-chevron-down text-xs"></i>
                      </span>
                    </div>
                    <div className="relative w-full has-[select:focus]:outline-2 has-[select:focus]:outline-emerald-400 has-[select:focus]:-outline-offset-2 outline outline-1 outline-gray-300 rounded-lg p-1 flex items-center">
                      <select
                        className="block w-full appearance-none px-3 py-1.5 pr-7 text-base text-gray-900 placeholder:text-gray-400 bg-transparent focus:outline-none sm:text-sm"
                        value={outsideStatePreferences[2]}
                        onChange={(e) =>
                          handleOutsideStateChange(2, e.target.value)
                        }
                      >
                        <option value="" disabled>
                          — Select District —
                        </option>
                        <option value="district1">District 1</option>
                        <option value="district2">District 2</option>
                      </select>
                      <span className="pointer-events-none absolute right-3 inset-y-0 flex items-center text-gray-500">
                        <i className="bi bi-chevron-down text-xs"></i>
                      </span>
                    </div>
                  </div>
                )}

                {/* Outside India */}
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <label className="text-sm/6 font-medium text-gray-900">
                      Are you willing to go outside India?
                    </label>
                    <div className="flex gap-4 items-center">
                      <div className="flex gap-2 items-center">
                        <input
                          name="oInd"
                          type="radio"
                          className="box-content size-2.25 appearance-none rounded-full border-4 border-white bg-white bg-clip-padding ring-1 ring-gray-950/20 outline-none checked:border-emerald-400 checked:ring-emerald-400"
                          checked={goOutsideIndia}
                          onChange={() => setGoOutsideIndia(true)}
                        />
                        <label className="text-sm font-medium">Yes</label>
                      </div>
                      <div className="flex gap-2 items-center">
                        <input
                          name="oInd"
                          type="radio"
                          className="box-content size-2.25 appearance-none rounded-full border-4 border-white bg-white bg-clip-padding ring-1 ring-gray-950/20 outline-none checked:border-emerald-400 checked:ring-emerald-400"
                          checked={!goOutsideIndia}
                          onChange={() => setGoOutsideIndia(false)}
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
            to="/location-info/step3"
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
