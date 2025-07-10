// src/components/forms/ContactInfoForm.tsx
import React, { useState } from 'react'
import InputField from '@/components/ui/InputField'
import SelectField from '@/components/ui/SelectField'
import { useContactInfoForm } from '@/hooks/useBiodataForm'
import { Phone, Mail, Home, MapPin, Flag, BookOpen } from 'lucide-react'
// import { sampleBiodata } from '@/lib/sampleData'

// Sample country options
const countryOptions = [
  { value: 'india', label: 'India' },
  { value: 'usa', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'canada', label: 'Canada' },
  { value: 'australia', label: 'Australia' },
  { value: 'uae', label: 'UAE' },
  { value: 'singapore', label: 'Singapore' },
  { value: 'other', label: 'Other' },
]

// Sample state options for India
const indiaStateOptions = [
  { value: 'andhra_pradesh', label: 'Andhra Pradesh' },
  { value: 'assam', label: 'Assam' },
  { value: 'bihar', label: 'Bihar' },
  { value: 'delhi', label: 'Delhi' },
  { value: 'gujarat', label: 'Gujarat' },
  { value: 'haryana', label: 'Haryana' },
  { value: 'karnataka', label: 'Karnataka' },
  { value: 'kerala', label: 'Kerala' },
  { value: 'madhya_pradesh', label: 'Madhya Pradesh' },
  { value: 'maharashtra', label: 'Maharashtra' },
  { value: 'punjab', label: 'Punjab' },
  { value: 'rajasthan', label: 'Rajasthan' },
  { value: 'tamil_nadu', label: 'Tamil Nadu' },
  { value: 'telangana', label: 'Telangana' },
  { value: 'uttar_pradesh', label: 'Uttar Pradesh' },
  { value: 'west_bengal', label: 'West Bengal' },
  { value: 'other', label: 'Other' },
]


const ContactInfoForm: React.FC = () => {
  const { contactInfo, updateContactInfo } = useContactInfoForm()
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Use state for dynamic options
  const [stateOptions, setStateOptions] = useState(indiaStateOptions)

  // Function to populate form with sample data
  // const fillWithSampleData = () => {
  //   const sampleData = sampleBiodata.contactInformation
  //   updateContactInfo(sampleData)
  //   setErrors({})
  // }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    updateContactInfo({ [name]: value })

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSelectChange = (name: string) => (value: string) => {
    updateContactInfo({ [name]: value })

    // Clear errors
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }

    // If country changes, update state options
    if (name === 'country') {
      // In a real app, you would have different state options for each country
      // Here we just use the India states for simplicity
      setStateOptions(indiaStateOptions)
    }
  }


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          Contact Information
        </h2>
        {/* <button
          type="button"
          onClick={fillWithSampleData}
          className="text-sm px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
        >
          Fill with sample data
        </button> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <InputField
          id="mobileNumber"
          name="mobileNumber"
          label="Mobile Number"
          placeholder="e.g. +91 99999 99999"
          value={contactInfo.mobileNumber}
          onChange={handleInputChange}
          required
          icon={<Phone className="h-5 w-5 text-gray-400" />}
          error={errors.mobileNumber}
        />

        <InputField
          id="alternateNumber"
          name="alternateNumber"
          label="Alternate Number"
          placeholder="e.g. +91 88888 88888"
          value={contactInfo.alternateNumber}
          onChange={handleInputChange}
          icon={<Phone className="h-5 w-5 text-gray-400" />}
          error={errors.alternateNumber}
        />

        <InputField
          id="email"
          name="email"
          label="Email Address"
          type="email"
          placeholder="e.g. yourname@example.com"
          value={contactInfo.email}
          onChange={handleInputChange}
          icon={<Mail className="h-5 w-5 text-gray-400" />}
          error={errors.email}
        />

        <SelectField
          id="country"
          name="country"
          label="Country"
          options={countryOptions}
          value={contactInfo.country}
          onChange={handleSelectChange('country')}
          required
          icon={<Flag className="h-5 w-5 text-gray-400" />}
          error={errors.country}
        />

        <SelectField
          id="state"
          name="state"
          label="State"
          options={stateOptions}
          value={contactInfo.state}
          onChange={handleSelectChange('state')}
          required
          icon={<Flag className="h-5 w-5 text-gray-400" />}
          error={errors.state}
        />

        <InputField
          id="city"
          name="city"
          label="City"
          placeholder="Enter your city"
          value={contactInfo.city}
          onChange={handleInputChange}
          required
          icon={<Home className="h-5 w-5 text-gray-400" />}
          error={errors.city}
        />

        <InputField
          id="pincode"
          name="pincode"
          label="Pincode / Zip"
          placeholder="Enter your pincode/zip"
          value={contactInfo.pincode}
          onChange={handleInputChange}
          icon={<BookOpen className="h-5 w-5 text-gray-400" />}
          error={errors.pincode}
        />
      </div>

      <div className="w-full">
        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-700"
        >
          Complete Address
          <span className="text-[#D40000] ml-1">*</span>
        </label>
        <div className="mt-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
            <MapPin className="h-5 w-5 text-gray-400" />
          </div>
          <textarea
            id="address"
            name="address"
            rows={3}
            className={`
              w-full px-4 py-2 pl-10 border rounded-md text-gray-800
              focus:outline-none focus:ring-2 focus:ring-[#D40000]/30 focus:border-[#D40000]
              ${errors.address ? 'border-red-500' : 'border-gray-300'}
            `}
            placeholder="Enter your complete address"
            value={contactInfo.address}
            onChange={(e) => {
              updateContactInfo({ address: e.target.value })
              if (errors.address) {
                setErrors((prev) => {
                  const newErrors = { ...prev }
                  delete newErrors.address
                  return newErrors
                })
              }
            }}
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <h3 className="text-lg font-medium mb-4">Privacy Settings</h3>

        <div className="space-y-3">
          <div className="flex items-center">
            <input
              id="showContactDetails"
              type="checkbox"
              className="h-4 w-4 text-[#D40000] focus:ring-[#D40000]/30 border-gray-300 rounded"
              checked={true}
              onChange={() => {}}
              disabled
            />
            <label
              htmlFor="showContactDetails"
              className="ml-2 block text-sm text-gray-700"
            >
              Show primary contact number (required for communication)
            </label>
          </div>

          <div className="flex items-center">
            <input
              id="showEmail"
              type="checkbox"
              className="h-4 w-4 text-[#D40000] focus:ring-[#D40000]/30 border-gray-300 rounded"
              checked={contactInfo.email ? true : false}
              onChange={(e) => {
                // This would normally update privacy settings in the context
                console.log('Show email:', e.target.checked)
              }}
            />
            <label
              htmlFor="showEmail"
              className="ml-2 block text-sm text-gray-700"
            >
              Show email address in biodata
            </label>
          </div>

          <div className="flex items-center">
            <input
              id="showAddress"
              type="checkbox"
              className="h-4 w-4 text-[#D40000] focus:ring-[#D40000]/30 border-gray-300 rounded"
              checked={true}
              onChange={(e) => {
                // This would normally update privacy settings in the context
                console.log('Show address:', e.target.checked)
              }}
            />
            <label
              htmlFor="showAddress"
              className="ml-2 block text-sm text-gray-700"
            >
              Show complete address in biodata
            </label>
          </div>
        </div>
      </div>

  
    </div>
  )
}

export default ContactInfoForm
