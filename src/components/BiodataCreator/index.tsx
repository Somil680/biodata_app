// src/components/BiodataCreator/index.tsx
import React, { useState } from 'react'
import PersonalInfoForm from '../forms/PersonalInfoForm'
import FamilyInfoForm from '../forms/FamilyInfoForm'
import ContactInfoForm from '../forms/ContactInfoForm'
import SettingsForm from '../forms/SettingsForm'
import PreviewSection from '../forms/PreviewSection'
import { Check, ChevronsRight, FileText } from 'lucide-react'
import { motion } from 'framer-motion'

// Enum for form steps
enum BiodataFormStep {
  PERSONAL_INFO = 0,
  FAMILY_INFO = 1,
  CONTACT_INFO = 2,
  SETTINGS = 3,
  PREVIEW = 4,
}

// Internal component that has access to the BiodataContext
const BiodataCreatorInner: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<BiodataFormStep>(
    BiodataFormStep.PERSONAL_INFO
  )

  const goToNextStep = () => {
    setCurrentStep(
      (prev) => Math.min(prev + 1, BiodataFormStep.PREVIEW) as BiodataFormStep
    )
  }

  const goToPreviousStep = () => {
    setCurrentStep(
      (prev) =>
        Math.max(prev - 1, BiodataFormStep.PERSONAL_INFO) as BiodataFormStep
    )
  }

  const goToStep = (step: BiodataFormStep) => {
    setCurrentStep(step)
  }

  // const fillAllFormsWithSampleData = () => {
  //   if (dispatch) {
  //     // Update all data sections with sample data
  //     dispatch({
  //       type: BiodataActionTypes.UPDATE_PERSONAL_INFO,
  //       payload: sampleBiodata.personalInformation
  //     });

  //     dispatch({
  //       type: BiodataActionTypes.UPDATE_FAMILY_INFO,
  //       payload: sampleBiodata.familyInformation
  //     });

  //     dispatch({
  //       type: BiodataActionTypes.UPDATE_CONTACT_INFO,
  //       payload: sampleBiodata.contactInformation
  //     });

  //     dispatch({
  //       type: BiodataActionTypes.UPDATE_SETTINGS,
  //       payload: sampleBiodata.settings
  //     });

  //     alert('All forms have been populated with sample data!');
  //   }
  // };

  const steps = [
    {
      id: BiodataFormStep.PERSONAL_INFO,
      title: 'Personal',
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
    {
      id: BiodataFormStep.FAMILY_INFO,
      title: 'Family',
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
    {
      id: BiodataFormStep.CONTACT_INFO,
      title: 'Contact',
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
    },
    {
      id: BiodataFormStep.SETTINGS,
      title: 'Settings',
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
    {
      id: BiodataFormStep.PREVIEW,
      title: 'Preview',
      icon: <FileText className="w-5 h-5" />,
    },
  ]

  const renderStep = () => {
    switch (currentStep) {
      case BiodataFormStep.PERSONAL_INFO:
        return <PersonalInfoForm onNext={goToNextStep} />
      case BiodataFormStep.FAMILY_INFO:
        return <FamilyInfoForm onNext={goToNextStep} />
      case BiodataFormStep.CONTACT_INFO:
        return <ContactInfoForm onNext={goToNextStep} />
      case BiodataFormStep.SETTINGS:
        return <SettingsForm onNext={goToNextStep} />
      case BiodataFormStep.PREVIEW:
        // When preview step is reached, push to /preview route
        // router.push('/preview');
        return <PreviewSection />;
      default:
        return null
    }
  }

  return (
    <div className="max-w-5xl mx-auto  py-8">
      {/* Step Progress */}
      <div className="mb-8">
        <div className="flex items-center md:justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div
                className={`flex-shrink-0 ${
                  currentStep >= step.id ? 'text-[#D40000]' : 'text-gray-400'
                }`}
              >
                <div
                  className={`flex flex-col items-center justify-center cursor-pointer ${
                    currentStep >= step.id ? 'hover:opacity-80' : 'opacity-50'
                  }`}
                  onClick={() => {
                    // Only allow navigation to completed steps
                    if (currentStep >= step.id) {
                      goToStep(step.id)
                    }
                  }}
                >
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200 ${
                      currentStep === step.id
                        ? 'bg-[#D40000] text-white ring-4 ring-[#D40000]/20'
                        : currentStep > step.id
                        ? 'bg-[#D40000]/10 text-[#D40000] border-2 border-[#D40000]'
                        : 'bg-gray-100 text-gray-400 border border-gray-300'
                    }`}
                  >
                    {currentStep > step.id ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      step.icon
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <p
                      className={`text-sm font-medium ${
                        currentStep >= step.id
                          ? 'text-[#D40000]'
                          : 'text-gray-400'
                      }`}
                    >
                      {step.title}
                    </p>
                  </div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="flex-grow mx-1 md:mx-2">
                  <div
                    className={`h-1 ${
                      currentStep > index ? 'bg-[#D40000]' : 'bg-gray-200'
                    }`}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Form Container */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        {renderStep()}
      </motion.div>

      {/* Navigation Buttons */}
      {currentStep !== BiodataFormStep.PREVIEW && (
        <div className="mt-6 flex justify-between">
          <button
            type="button"
            onClick={goToPreviousStep}
            disabled={currentStep === BiodataFormStep.PERSONAL_INFO}
            className={`px-4 py-2 rounded ${
              currentStep === BiodataFormStep.PERSONAL_INFO
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Previous
          </button>
          <button
            type="button"
            id="form-submit-button"
            onClick={goToNextStep}
            className="px-4 py-2 bg-[#D40000] text-white rounded hover:bg-[#b30000] flex items-center"
          >
            Next
            <ChevronsRight className="ml-1 w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}

// Main component that's exported
const BiodataCreator: React.FC = () => {
  return <BiodataCreatorInner />
}

export default BiodataCreator
