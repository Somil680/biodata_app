// src/components/forms/SettingsForm.tsx
import React, { useState, useRef } from 'react'
import InputField from '@/components/ui/InputField'
import { useBiodataSettings } from '@/hooks/useBiodataForm'
import { Type, Plus, Trash2Icon } from 'lucide-react'
// import { sampleBiodata } from '@/lib/sampleData'
import Image from 'next/image'
import { idolImageArray } from '../constants/idolImages'

// Sample font options/

interface SettingsFormProps {
  initialValues?: unknown
  onSubmit?: (values: unknown) => void
  onNext?: () => void
}

const SettingsForm: React.FC<SettingsFormProps> = () => {
  const {
    settings,
    updateSettings,
    // uploadPhoto
  } = useBiodataSettings()
  console.log('🚀 ~ settings:', settings)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // For file uploads
  const fileInputRef = useRef<HTMLInputElement>(null)
  const idolFileInputRef = useRef<HTMLInputElement>(null)

  // Function to populate form with sample data
  // const fillWithSampleData = () => {
  //   const sampleData = sampleBiodata.settings
  //   updateSettings(sampleData)
  //   setErrors({})
  // }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    updateSettings({ [name]: value })

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleUploadIdolImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload this file to your server/cloud storage
      // Here we're creating a local object URL
      const imageUrl = URL.createObjectURL(file)
      updateSettings({ idolImage: imageUrl })
    }
  }

  const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload this file to your server/cloud storage
      // Here we're creating a local object URL
      const imageUrl = URL.createObjectURL(file)
      updateSettings({ profilePhoto: imageUrl })
    }
  }

  const taglineArray = [
    'ॐ श्री गणेशाय नमः:',
    'BIODATA',
    'ॐ नमः शिवाय',
    'ॐ जय श्री कृष्णा',
    'ॐ जय माता दी',
    'ॐ जय साईं राम',
    'ॐ जय हनुमान जी की',
    'ॐ जय गुरुदेव',
  ]
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Biodata Appearance</h2>
        {/* <button
          type="button"
          onClick={fillWithSampleData}
          className="text-sm px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
        >
          Fill with sample data
        </button> */}
      </div>

      {/* Idol Image Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Idol Image</h3>
        <p className="text-sm text-gray-500">
          Add an image of your deity or religious symbol that will appear at the
          top of your biodata.
        </p>

        <div className="flex flex-col  space-y-4">
          <div className="flex items-center space-x-4">
            <div
              className="relative group w-20 h-20 border border-dashed border-gray-300 rounded-md flex items-center justify-center bg-gray-50 overflow-hidden"
              onClick={() => idolFileInputRef.current?.click()}
              style={{ cursor: 'pointer' }}
            >
              {settings.idolImage ? (
                <>
                  <Image
                    src={settings.idolImage}
                    width={80}
                    height={80}
                    alt="Idol"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    className="absolute top-1 right-1 opacity-0 group-hover:opacity-80 transition-opacity px-2 py-1 bg-red-600  text-white text-xs rounded shadow z-10"
                    onClick={(e) => {
                      e.stopPropagation()
                      updateSettings({ idolImage: '' })
                    }}
                  >
                    <Trash2Icon size={15} />
                  </button>
                </>
              ) : (
                <Plus className="h-6 w-6 text-gray-400" />
              )}
            </div>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm"
                onClick={() => idolFileInputRef.current?.click()}
              >
                {settings.idolImage ? 'Change Idol Image' : 'Upload Idol Image'}
              </button>
              {settings.idolImage && (
                <button
                  type="button"
                  className="px-3 py-2 border border-red-400 text-red-600 rounded-md hover:bg-red-50 transition-colors text-sm"
                  onClick={() => updateSettings({ idolImage: '' })}
                >
                  <Trash2Icon size={20} />
                </button>
              )}
            </div>

            <input
              type="file"
              ref={idolFileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleUploadIdolImage}
            />
          </div>

          <div className=" flex items-center gap-4 p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
            {idolImageArray.map((img, index) => (
              <button
                key={index}
                onClick={() => updateSettings({ idolImage: img.src })}
                className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-gray-100 transition-colors"
              >
                <Image
                  src={img}
                  width={40}
                  height={40}
                  alt="Idol"
                  className=" object-contain hover:scale-110 transition-transform duration-200"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tagline Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Tagline</h3>
        <p className="text-sm text-gray-500">
          Add a short tagline that will appear at the top of your biodata.
        </p>

        <InputField
          id="tagline"
          name="tagline"
          placeholder="e.g. Seeking a life partner with traditional values"
          value={settings.tagline}
          onChange={handleInputChange}
          icon={<Type className="h-5 w-5 text-gray-400" />}
          error={errors.tagline}
        />
        <div className=" flex  overflow-x-scroll items-center gap-2 scrollbar ">
          {taglineArray.map((tag, index) => (
            <button
              key={index}
              onClick={() => updateSettings({ tagline: tag })}
              className="flex items-center justify-center w-fit text-xs border p-2  hover:bg-gray-100 transition-colors bg-[#fffbf5] rounded-full shrink-0  "
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Profile Image Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Profile Image</h3>

        <div className="flex items-start   space-x-4 ">
          <div
            className="w-40 h-52 border border-dashed border-gray-300 rounded-md flex items-center justify-center bg-gray-50 overflow-hidden"
            onClick={() => fileInputRef.current?.click()}
          >
            {settings.profilePhoto ? (
              <Image
                src={settings.profilePhoto}
                alt=""
                className="w-full h-full object-cover"
                width={300}
                height={300}
              />
            ) : (
              <p className="text-xs text-gray-500">Upload Profile Image</p>
            )}
          </div>
          <div className="flex  gap-2">
            <button
              type="button"
              className="px-4 w-fit py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm"
              onClick={() => fileInputRef.current?.click()}
            >
              {settings.profilePhoto
                ? 'Change Profile Image'
                : 'Upload Profile Image'}
            </button>
            {settings.profilePhoto && (
              <button
                type="button"
                className="px-3 py-2 border border-red-400 text-red-600 rounded-md hover:bg-red-50 transition-colors text-sm"
                onClick={() => updateSettings({ profilePhoto: '' })}
              >
                <Trash2Icon size={20} />
              </button>
            )}
          </div>

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleProfilePhotoChange}
          />
        </div>
      </div>
    </div>
  )
}

export default SettingsForm
