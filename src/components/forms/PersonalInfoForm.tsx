// src/components/forms/PersonalInfoForm.tsx
import React, { useState, useEffect } from 'react'
import { format, parse } from 'date-fns'
import InputField from '@/components/ui/InputField'
import SelectField from '@/components/ui/SelectField'
import { usePersonalInfoForm } from '@/hooks/useBiodataForm'
import {
  User,
  Calendar,
  Clock,
  MapPin,
  Ruler,
  Heart,
  Activity,
  Briefcase,
  GraduationCap,
  DollarSign,
} from 'lucide-react'
// import { sampleBiodata } from '@/lib/sampleData'

const maritalStatusOptions = [
  { value: 'never_married', label: 'Never Married' },
  { value: 'divorced', label: 'Divorced' },
  { value: 'widowed', label: 'Widowed' },
  { value: 'awaiting_divorce', label: 'Awaiting Divorce' },
]

const religionOptions = [
  { value: 'hindu', label: 'Hindu' },
  { value: 'muslim', label: 'Muslim' },
  { value: 'christian', label: 'Christian' },
  { value: 'sikh', label: 'Sikh' },
  { value: 'jain', label: 'Jain' },
  { value: 'buddhist', label: 'Buddhist' },
  { value: 'parsi', label: 'Parsi' },
  { value: 'jewish', label: 'Jewish' },
  { value: 'other', label: 'Other' },
]

const dietOptions = [
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'non_vegetarian', label: 'Non-Vegetarian' },
  { value: 'eggetarian', label: 'Eggetarian' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'jain', label: 'Jain' },
]

const bloodGroupOptions = [
  { value: 'a_positive', label: 'A+' },
  { value: 'a_negative', label: 'A-' },
  { value: 'b_positive', label: 'B+' },
  { value: 'b_negative', label: 'B-' },
  { value: 'ab_positive', label: 'AB+' },
  { value: 'ab_negative', label: 'AB-' },
  { value: 'o_positive', label: 'O+' },
  { value: 'o_negative', label: 'O-' },
]

const rashiOptions = [
  { value: 'aries', label: 'Aries (Mesha)' },
  { value: 'taurus', label: 'Taurus (Vrishabha)' },
  { value: 'gemini', label: 'Gemini (Mithuna)' },
  { value: 'cancer', label: 'Cancer (Karka)' },
  { value: 'leo', label: 'Leo (Simha)' },
  { value: 'virgo', label: 'Virgo (Kanya)' },
  { value: 'libra', label: 'Libra (Tula)' },
  { value: 'scorpio', label: 'Scorpio (Vrishchika)' },
  { value: 'sagittarius', label: 'Sagittarius (Dhanu)' },
  { value: 'capricorn', label: 'Capricorn (Makara)' },
  { value: 'aquarius', label: 'Aquarius (Kumbha)' },
  { value: 'pisces', label: 'Pisces (Meena)' },
]

const manglikOptions = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'anshik', label: 'Anshik' },
  { value: 'dont_know', label: "Don't Know" },
]

const PersonalInfoForm: React.FC = () => {
  const { personalInfo, updatePersonalInfo } = usePersonalInfoForm()
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Format the date value to yyyy-MM-dd for the input field
  const formatDateForInput = (dateString: string | undefined): string => {
    if (!dateString) return ''

    try {
      // Check if the date is already in the correct format
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        return dateString
      }

      // Try to parse non-standard formats like "MM/dd/yyyy"
      const parsedDate = parse(dateString, 'MM/dd/yyyy', new Date())
      if (isNaN(parsedDate.getTime())) {
        return ''
      }

      return format(parsedDate, 'yyyy-MM-dd')
    } catch (error) {
      console.error('Error formatting date:', error)
      return ''
    }
  }

  // Format time value to 24-hour format (HH:mm)
  const formatTimeForInput = (timeString: string | undefined): string => {
    if (!timeString) return ''

    try {
      // Check if it's already in the correct 24-hour format
      if (/^\d{2}:\d{2}$/.test(timeString)) {
        return timeString
      }

      // Try to parse 12-hour format with AM/PM
      if (/^\d{1,2}:\d{2}\s?[APap][Mm]$/.test(timeString)) {
        const [timePart, amPm] = timeString.split(/\s/)
        const [hours, minutes] = timePart.split(':').map(Number)

        let hour24 = hours
        if (amPm.toLowerCase() === 'pm' && hours < 12) {
          hour24 = hours + 12
        } else if (amPm.toLowerCase() === 'am' && hours === 12) {
          hour24 = 0
        }

        return `${hour24.toString().padStart(2, '0')}:${minutes
          .toString()
          .padStart(2, '0')}`
      }

      return ''
    } catch (error) {
      console.error('Error formatting time:', error)
      return ''
    }
  }

  // Calculate age based on date of birth
  useEffect(() => {
    if (personalInfo.dateOfBirth) {
      const birthDate = new Date(personalInfo.dateOfBirth)
      if (!isNaN(birthDate.getTime())) {
        const today = new Date()
        let age = today.getFullYear() - birthDate.getFullYear()
        const m = today.getMonth() - birthDate.getMonth()

        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--
        }

        updatePersonalInfo({ age })
      }
    }
  }, [personalInfo.dateOfBirth, updatePersonalInfo])

  // Function to populate form with sample data
  // const fillWithSampleData = () => {
  //   const sampleData = sampleBiodata.personalInformation
  //   updatePersonalInfo(sampleData)
  //   setErrors({})
  // }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // Handle age field specifically to ensure it's properly converted to a number
    if (name === 'age') {
      const ageValue = value === '' ? undefined : parseInt(value, 10)
      updatePersonalInfo({ [name]: ageValue })
    } else {
      updatePersonalInfo({ [name]: value })
    }

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
    updatePersonalInfo({ [name]: value })

    // Clear errors
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleHobbiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const hobbies = value.split(',').map((hobby) => hobby.trim())
    updatePersonalInfo({ hobbies })
  }

  const handleLanguagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const languages = value.split(',').map((language) => language.trim())
    updatePersonalInfo({ languages })
  }

  //   const validateField = (name: string, value: string): string => {
  //     if (!value) {
  //       return 'This field is required';
  //     }
  //     return '';
  //   };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          Personal Information
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
          id="fullName"
          name="fullName"
          label="Full Name"
          placeholder="Enter your full name"
          value={personalInfo.fullName}
          onChange={handleInputChange}
          required
          icon={<User className="h-5 w-5 text-gray-400" />}
          error={errors.fullName}
        />

        <InputField
          id="dateOfBirth"
          name="dateOfBirth"
          type="date"
          label="Date of Birth"
          value={formatDateForInput(personalInfo.dateOfBirth)}
          onChange={handleInputChange}
          required
          icon={<Calendar className="h-5 w-5 text-gray-400" />}
          error={errors.dateOfBirth}
        />

        <InputField
          id="timeOfBirth"
          name="timeOfBirth"
          type="time"
          label="Time of Birth"
          value={formatTimeForInput(personalInfo.timeOfBirth)}
          onChange={handleInputChange}
          icon={<Clock className="h-5 w-5 text-gray-400" />}
          error={errors.timeOfBirth}
        />

        <InputField
          id="placeOfBirth"
          name="placeOfBirth"
          label="Place of Birth"
          placeholder="Enter your place of birth"
          value={personalInfo.placeOfBirth}
          onChange={handleInputChange}
          icon={<MapPin className="h-5 w-5 text-gray-400" />}
          error={errors.placeOfBirth}
        />

        <InputField
          id="age"
          name="age"
          label="Age"
          type="number"
          placeholder="e.g. 25"
          value={personalInfo.age || ''}
          onChange={handleInputChange}
          required
          icon={<Calendar className="h-5 w-5 text-gray-400" />}
          error={errors.age}
        />
        <InputField
          id="height"
          name="height"
          label="Height"
          placeholder={'e.g. 5\'10"'}
          value={personalInfo.height}
          onChange={handleInputChange}
          required
          icon={<Ruler className="h-5 w-5 text-gray-400" />}
          error={errors.height}
        />

        <InputField
          id="weight"
          name="weight"
          label="Weight (kg)"
          placeholder="e.g. 70"
          value={personalInfo.weight}
          onChange={handleInputChange}
          icon={<Activity className="h-5 w-5 text-gray-400" />}
          error={errors.weight}
        />

        <SelectField
          id="bloodGroup"
          name="bloodGroup"
          label="Blood Group"
          options={bloodGroupOptions}
          value={personalInfo.bloodGroup}
          onChange={handleSelectChange('bloodGroup')}
          icon={<Activity className="h-5 w-5 text-gray-400" />}
          error={errors.bloodGroup}
        />

        <SelectField
          id="maritalStatus"
          name="maritalStatus"
          label="Marital Status"
          options={maritalStatusOptions}
          value={personalInfo.maritalStatus}
          onChange={handleSelectChange('maritalStatus')}
          required
          icon={<Heart className="h-5 w-5 text-gray-400" />}
          error={errors.maritalStatus}
        />

        <SelectField
          id="religion"
          name="religion"
          label="Religion"
          options={religionOptions}
          value={personalInfo.religion}
          onChange={handleSelectChange('religion')}
          required
          icon={<Heart className="h-5 w-5 text-gray-400" />}
          error={errors.religion}
        />

        <InputField
          id="caste"
          name="caste"
          label="Caste"
          placeholder="Enter your caste"
          value={personalInfo.caste}
          onChange={handleInputChange}
          icon={<Heart className="h-5 w-5 text-gray-400" />}
          error={errors.caste}
        />

        <InputField
          id="subCaste"
          name="subCaste"
          label="Sub-caste"
          placeholder="Enter your sub-caste"
          value={personalInfo.subCaste}
          onChange={handleInputChange}
          icon={<Heart className="h-5 w-5 text-gray-400" />}
          error={errors.subCaste}
        />

        <InputField
          id="gothra"
          name="gothra"
          label="Gothra"
          placeholder="Enter your gothra"
          value={personalInfo.gothra}
          onChange={handleInputChange}
          icon={<Heart className="h-5 w-5 text-gray-400" />}
          error={errors.gothra}
        />

        <SelectField
          id="rashi"
          name="rashi"
          label="Rashi"
          options={rashiOptions}
          value={personalInfo.rashi}
          onChange={handleSelectChange('rashi')}
          icon={<Heart className="h-5 w-5 text-gray-400" />}
          error={errors.rashi}
        />

        <InputField
          id="nakshatra"
          name="nakshatra"
          label="Nakshatra"
          placeholder="Enter your nakshatra"
          value={personalInfo.nakshatra}
          onChange={handleInputChange}
          icon={<Heart className="h-5 w-5 text-gray-400" />}
          error={errors.nakshatra}
        />

        <SelectField
          id="manglik"
          name="manglik"
          label="Manglik"
          options={manglikOptions}
          value={personalInfo.manglik}
          onChange={handleSelectChange('manglik')}
          icon={<Heart className="h-5 w-5 text-gray-400" />}
          error={errors.manglik}
        />

        <InputField
          id="education"
          name="education"
          label="Education"
          placeholder="Your highest qualification"
          value={personalInfo.education}
          onChange={handleInputChange}
          required
          icon={<GraduationCap className="h-5 w-5 text-gray-400" />}
          error={errors.education}
        />

        <InputField
          id="profession"
          name="profession"
          label="Profession"
          placeholder="Your current job"
          value={personalInfo.profession}
          onChange={handleInputChange}
          required
          icon={<Briefcase className="h-5 w-5 text-gray-400" />}
          error={errors.profession}
        />

        <InputField
          id="annualIncome"
          name="annualIncome"
          label="Annual Income"
          placeholder="e.g. 12 LPA"
          value={personalInfo.annualIncome}
          onChange={handleInputChange}
          required
          icon={<DollarSign className="h-5 w-5 text-gray-400" />}
          error={errors.annualIncome}
        />

        <SelectField
          id="diet"
          name="diet"
          label="Diet Preference"
          options={dietOptions}
          value={personalInfo.diet}
          onChange={handleSelectChange('diet')}
          icon={<Activity className="h-5 w-5 text-gray-400" />}
          error={errors.diet}
        />
      </div>

      <div className="space-y-4">
        <InputField
          id="hobbies"
          name="hobbies"
          label="Hobbies & Interests"
          placeholder="e.g. Reading, Traveling, Music (comma separated)"
          value={personalInfo.hobbies?.join(', ')}
          onChange={handleHobbiesChange}
          error={errors.hobbies}
        />

        <InputField
          id="languages"
          name="languages"
          label="Languages Known"
          placeholder="e.g. English, Hindi, Marathi (comma separated)"
          value={personalInfo.languages?.join(', ')}
          onChange={handleLanguagesChange}
          error={errors.languages}
        />

        <div className="w-full">
          <label
            htmlFor="aboutMe"
            className="block text-sm font-medium text-gray-700"
          >
            About Me
          </label>
          <textarea
            id="aboutMe"
            name="aboutMe"
            rows={4}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#D40000]/30 focus:border-[#D40000]"
            placeholder="Write a short bio about yourself..."
            value={personalInfo.aboutMe}
            onChange={(e) => updatePersonalInfo({ aboutMe: e.target.value })}
          />
        </div>
      </div>
    </div>
  )
}

export default PersonalInfoForm
