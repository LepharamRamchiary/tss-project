import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import PersonalContactForm from "./components/Form/PersonalContactForm";
import IdentityDemographicsForm from "./components/Form/IdentityDemographicsForm";
import LocationInformation from "./components/Form/LocationInformation";
import EmploymentPreferencesForm from "./components/Form/EmploymentPreferencesForm";
import DeclStep from "./components/Form/DeclStep";
import RegistrationLayout from "./components/RegistrationLayout";

function App() {
  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/personal-info/step1"
          element={
            <RegistrationLayout currentStep={1}>
              <PersonalContactForm />
            </RegistrationLayout>
          }
        />
        <Route
          path="/identity-demographics/step2"
          element={
            <RegistrationLayout currentStep={2}>
              <IdentityDemographicsForm />
            </RegistrationLayout>
          }
        />
        <Route
          path="/location-info/step3"
          element={
            <RegistrationLayout currentStep={3}>
              <LocationInformation />
            </RegistrationLayout>
          }
        />
        <Route
          path="/employment-pre/step4"
          element={
            <RegistrationLayout currentStep={4}>
              <EmploymentPreferencesForm />
            </RegistrationLayout>
          }
        />
        <Route
          path="/decl-step/step5"
          element={
            <RegistrationLayout currentStep={5}>
              <DeclStep />
            </RegistrationLayout>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
