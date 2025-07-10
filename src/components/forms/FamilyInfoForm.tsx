// src/components/forms/FamilyInfoForm.tsx
import React, { useState } from 'react'
import InputField from '@/components/ui/InputField'
import SelectField from '@/components/ui/SelectField'
import { useFamilyInfoForm } from '@/hooks/useBiodataForm'
import { User, Users, Home, Map, Heart, Plus, X } from 'lucide-react'
// import { sampleBiodata } from '@/lib/sampleData'

const familyTypeOptions = [
  { value: 'joint', label: 'Joint' },
  { value: 'nuclear', label: 'Nuclear' },
]

const familyValuesOptions = [
  { value: 'traditional', label: 'Traditional' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'liberal', label: 'Liberal' },
]

const familyStatusOptions = [
  { value: 'middle_class', label: 'Middle Class' },
  { value: 'upper_middle_class', label: 'Upper Middle Class' },
  { value: 'rich', label: 'Rich' },
  { value: 'affluent', label: 'Affluent' },
]

// Component for family member input
// const FamilyMemberInput: React.FC<{
//   index: number;
//   type: string;
//   member: { name: string; occupation?: string; education?: string; age?: number };
//   onUpdate: (index: number, field: string, value: string | number) => void;
//   onRemove: (index: number) => void;
// }> = ({ index, type, member, onUpdate, onRemove }) => {
//   return (
//     <div className="p-4 border border-gray-200 rounded-md space-y-4">
//       <div className="flex justify-between items-center">
//         <h4 className="font-medium text-gray-700 capitalize">{type} {index + 1}</h4>
//         <button
//           type="button"
//           className="text-red-500 text-sm"
//           onClick={() => onRemove(index)}
//         >
//           Remove
//         </button>
//       </div>

//       <InputField
//         id={`${type}_${index}_name`}
//         name={`${type}_${index}_name`}
//         label="Name"
//         placeholder="Enter name"
//         value={member.name}
//         onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUpdate(index, 'name', e.target.value)}
//         required
//         icon={<User className="h-5 w-5 text-gray-400" />}
//       />

//       <InputField
//         id={`${type}_${index}_occupation`}
//         name={`${type}_${index}_occupation`}
//         label="Occupation"
//         placeholder="Enter occupation"
//         value={member.occupation || ''}
//         onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUpdate(index, 'occupation', e.target.value)}
//         icon={<Briefcase className="h-5 w-5 text-gray-400" />}
//       />

//       <InputField
//         id={`${type}_${index}_education`}
//         name={`${type}_${index}_education`}
//         label="Education"
//         placeholder="Enter education"
//         value={member.education || ''}
//         onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUpdate(index, 'education', e.target.value)}
//         icon={<GraduationCap className="h-5 w-5 text-gray-400" />}
//       />

//       <InputField
//         id={`${type}_${index}_age`}
//         name={`${type}_${index}_age`}
//         type="number"
//         label="Age"
//         placeholder="Enter age"
//         value={member.age?.toString() || ''}
//         onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUpdate(index, 'age', parseInt(e.target.value) || 0)}
//         icon={<User className="h-5 w-5 text-gray-400" />}
//       />
//     </div>
//   );
// };

// Component for custom family member input
interface CustomFamilyMember {
  id: string
  relation: string
  details: string
}

const CustomFamilyMemberInput: React.FC<{
  member: CustomFamilyMember
  onUpdate: (member: CustomFamilyMember) => void
  onRemove: () => void
}> = ({ member, onUpdate, onRemove }) => {
  return (
    <div className="p-2 border border-gray-200 rounded-md bg-orange-50/30 relative">
      <div className="absolute top-1 right-1">
        {/* <h4 className="font-medium text-gray-700">Family Member</h4> */}
        <button
          type="button"
          className="text-red-500 hover:bg-red-50 p-1 rounded-full "
          onClick={onRemove}
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-2">
        <InputField
          id={`relation_${member.id}`}
          name={`relation_${member.id}`}
          label="Relationship"
          placeholder="e.g., Grandfather&GrandMother, NanaJi&NaniJi , Fufaji&Buaji, etc."
          value={member.relation}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onUpdate({ ...member, relation: e.target.value })
          }
          required
          icon={<Users className="h-5 w-5 text-gray-400" />}
        />

        <div>
          <label
            htmlFor={`details_${member.id}`}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Details
          </label>
          <div className="relative">
            <div className="absolute left-3 top-3">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <textarea
              id={`details_${member.id}`}
              name={`details_${member.id}`}
              rows={4}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#D40000]/30 focus:border-[#D40000] placeholder-gray-400"
              placeholder="Name, occupation, education, age, and any other relevant information..."
              value={member.details}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                onUpdate({ ...member, details: e.target.value })
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}


const FamilyInfoForm: React.FC = () => {
  const { familyInfo, updateFamilyInfo } = useFamilyInfoForm()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [customMembers, setCustomMembers] = useState<CustomFamilyMember[]>(
    familyInfo.customMembers || []
  )

  // Function to populate form with sample data
  // const fillWithSampleData = () => {
  //   const sampleData = sampleBiodata.familyInformation
  //   updateFamilyInfo(sampleData)
  //   setCustomMembers(sampleData.customMembers || [])
  //   setErrors({})
  // }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    updateFamilyInfo({ [name]: value })

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
    updateFamilyInfo({ [name]: value })

    // Clear errors
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Handle custom family members
  const addCustomMember = () => {
    const newMember: CustomFamilyMember = {
      id: `custom_${Date.now()}`,
      relation: '',
      details: '',
    }
    const updatedMembers = [...customMembers, newMember]
    setCustomMembers(updatedMembers)
    updateFamilyInfo({ customMembers: updatedMembers })
  }

  const updateCustomMember = (updatedMember: CustomFamilyMember) => {
    const updatedMembers = customMembers.map((member) =>
      member.id === updatedMember.id ? updatedMember : member
    )
    setCustomMembers(updatedMembers)
    updateFamilyInfo({ customMembers: updatedMembers })
  }

  const removeCustomMember = (id: string) => {
    const updatedMembers = customMembers.filter((member) => member.id !== id)
    setCustomMembers(updatedMembers)
    updateFamilyInfo({ customMembers: updatedMembers })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Family Information</h2>
        {/* <button
          type="button"
          onClick={fillWithSampleData}
          className="text-sm px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
        >
          Fill with sample data
        </button> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
       
        <SelectField
          id="familyType"
          name="familyType"
          label="Family Type"
          options={familyTypeOptions}
          value={familyInfo.familyType}
          onChange={handleSelectChange('familyType')}
          icon={<Home className="h-5 w-5 text-gray-400" />}
          error={errors.familyType}
        />

        <SelectField
          id="familyValues"
          name="familyValues"
          label="Family Values"
          options={familyValuesOptions}
          value={familyInfo.familyValues}
          onChange={handleSelectChange('familyValues')}
          icon={<Heart className="h-5 w-5 text-gray-400" />}
          error={errors.familyValues}
        />

        <SelectField
          id="familyStatus"
          name="familyStatus"
          label="Family Status"
          options={familyStatusOptions}
          value={familyInfo.familyStatus}
          onChange={handleSelectChange('familyStatus')}
          icon={<Users className="h-5 w-5 text-gray-400" />}
          error={errors.familyStatus}
        />

        <InputField
          id="nativePlace"
          name="nativePlace"
          label="Native Place"
          placeholder="Enter your native place"
          value={familyInfo.nativePlace}
          onChange={handleInputChange}
          icon={<Map className="h-5 w-5 text-gray-400" />}
          error={errors.nativePlace}
        />
      </div>

   
      {/* Custom Family Members Section */}
      <div className="mt-8 border-t border-dashed border-gray-300 pt-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-medium"> Family Members</h3>
            {/* <p className="text-sm text-gray-500">Add other family members like grandfather, nana, fufa, etc.</p> */}
          </div>
          <button
            type="button"
            className="px-4 py-2 bg-[#D40000] text-white rounded-md hover:bg-[#b30000] transition-colors text-sm flex items-center"
            onClick={addCustomMember}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Field
          </button>
        </div>

        <div className="space-y-4">
          {customMembers.map((member) => (
            <CustomFamilyMemberInput
              key={member.id}
              member={member}
              onUpdate={updateCustomMember}
              onRemove={() => removeCustomMember(member.id)}
            />
          ))}

          {customMembers.length === 0 && (
            <div className="p-6 border border-dashed border-gray-300 rounded-md bg-gray-50 flex flex-col items-center justify-center">
              <p className="text-gray-500 text-center mb-3">
                No additional family members added yet
              </p>
              <button
                type="button"
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm flex items-center border border-gray-300"
                onClick={addCustomMember}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Family Member
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="w-full">
          <label
            htmlFor="familyBackground"
            className="block text-sm font-medium text-gray-700"
          >
            Family Background
          </label>
          <textarea
            id="familyBackground"
            name="familyBackground"
            rows={3}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#D40000]/30 focus:border-[#D40000]"
            placeholder="Describe your family background..."
            value={familyInfo.familyBackground}
            onChange={(e) =>
              updateFamilyInfo({ familyBackground: e.target.value })
            }
          />
        </div>

        <div className="w-full">
          <label
            htmlFor="aboutFamily"
            className="block text-sm font-medium text-gray-700"
          >
            About Family
          </label>
          <textarea
            id="aboutFamily"
            name="aboutFamily"
            rows={3}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#D40000]/30 focus:border-[#D40000]"
            placeholder="Additional information about your family..."
            value={familyInfo.aboutFamily}
            onChange={(e) => updateFamilyInfo({ aboutFamily: e.target.value })}
          />
        </div>
      </div>
    </div>
  )
}

export default FamilyInfoForm
