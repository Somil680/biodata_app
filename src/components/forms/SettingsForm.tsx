// src/components/forms/SettingsForm.tsx
import React, { useState, useRef } from 'react'
import InputField from '@/components/ui/InputField'
import { useBiodataSettings } from '@/hooks/useBiodataForm'
import { Image as Img, Type, Share, Lock, Plus } from 'lucide-react'
import { sampleBiodata } from '@/lib/sampleData'
import Image from 'next/image'
import img1 from '../../../public/images/idols/ganesha.png'
import img2 from '../../../public/images/idols/om (1).png'
import img3 from '../../../public/images/idols/om (2).png'
import img4 from '../../../public/images/idols/om.png'
import img5 from '../../../public/images/idols/christian.png'
import img6 from '../../../public/images/idols/light.png'

// Sample template options
const templates = [
  {
    id: '1',
    name: 'Classic',
    thumbnail: '/templates/classic.jpg',
    description: 'A traditional layout with elegant styling',
  },
  {
    id: '2',
    name: 'Modern',
    thumbnail: '/templates/modern.jpg',
    description: 'Clean and minimal design with contemporary styling',
  },
  {
    id: '3',
    name: 'Professional',
    thumbnail: '/templates/professional.jpg',
    description: 'Formal design ideal for career-focused individuals',
  },
  {
    id: '4',
    name: 'Elegant',
    thumbnail: '/templates/elegant.jpg',
    description: 'Sophisticated layout with decorative elements',
  },
]

// Sample font options


interface SettingsFormProps {
  initialValues?: unknown
  onSubmit?: (values: unknown) => void
  onNext?: () => void
}

const SettingsForm: React.FC<SettingsFormProps> = ({ onSubmit, onNext }) => {
  const {
    settings,
    updateSettings,
    // uploadPhoto
  } = useBiodataSettings()
  const [errors, setErrors] = useState<Record<string, string>>({})

  // For file uploads
  const fileInputRef = useRef<HTMLInputElement>(null)
  const idolFileInputRef = useRef<HTMLInputElement>(null)

  // Function to populate form with sample data
  const fillWithSampleData = () => {
    const sampleData = sampleBiodata.settings
    updateSettings(sampleData)
    setErrors({})
  }

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Save settings
    console.log('Settings saved')
    if (onSubmit) {
      onSubmit(settings)
    }
    if (onNext) {
      onNext()
    }
  }

  const idolImageArray = [img1, img2, img3, img4, img5, img6]
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
        <button
          type="button"
          onClick={fillWithSampleData}
          className="text-sm px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
        >
          Fill with sample data
        </button>
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
              className="w-20 h-20 border border-dashed border-gray-300 rounded-md flex items-center justify-center bg-gray-50 overflow-hidden"
              onClick={() => idolFileInputRef.current?.click()}
            >
              {settings.idolImage ? (
                <Image
                  src={settings.idolImage}
                  width={80}
                  height={80}
                  alt="Idol"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Plus className="h-6 w-6 text-gray-400" />
              )}
            </div>

            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm"
              onClick={() => idolFileInputRef.current?.click()}
            >
              {settings.idolImage ? 'Change Idol Image' : 'Upload Idol Image'}
            </button>

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
        <div className=" flex flex-wrap items-center gap-2 ">
          {taglineArray.map((tag, index) => (
            <button
              key={index}
              onClick={() => updateSettings({ tagline: tag })}
              className="flex items-center justify-center w-fit text-xs border p-2  hover:bg-gray-100 transition-colors bg-[#fffbf5] rounded-full"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Background Image Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Profile Image</h3>

        <div className="flex flex-col space-y-4 ">
          <button
            type="button"
            className="px-4 w-fit py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm"
            onClick={() => fileInputRef.current?.click()}
          >
            {settings.profilePhoto
              ? 'Change Profile Image'
              : 'Upload Profile Image'}
          </button>
          <div
            className="w-40 h-52 border border-dashed border-gray-300 rounded-md flex items-center justify-center bg-gray-50 overflow-hidden"
            onClick={() => fileInputRef.current?.click()}
          >
            {settings.profilePhoto ? (
              <Image
                src={settings.profilePhoto}
                alt="Background"
                className="w-full h-full object-cover"
                width={300}
                height={300}
              />
            ) : (
              <Img className="h-6 w-6 text-gray-400" />
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

      {/* Template Selection */}
      {/* <div className="space-y-4">
        <h3 className="text-lg font-medium">Select Template</h3>
        <p className="text-sm text-gray-500">
          Choose a design template for your biodata.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`border rounded-md overflow-hidden cursor-pointer transition-all ${
                settings.templateId === template.id 
                  ? 'border-[#D40000] ring-2 ring-[#D40000]/30' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleSelectTemplate(template.id)}
            >
              <div className="h-32 bg-gray-100 relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  {template.name} Preview
                </div>
              </div>
              <div className="p-2">
                <h4 className="font-medium text-sm">{template.name}</h4>
                <p className="text-xs text-gray-500">{template.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div> */}

      {/* Font and Color Selection */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Font Family</h3>
          <p className="text-sm text-gray-500">
            Select a font style for your biodata.
          </p>
          
          <div className="relative">
            <select
              id="fontFamily"
              name="fontFamily"
              className="appearance-none w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#D40000]/30 focus:border-[#D40000]"
              value={settings.fontFamily}
              onChange={handleFontChange}
            >
              {fontOptions.map((font) => (
                <option key={font.value} value={font.value}>
                  {font.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Primary Color</h3>
          <p className="text-sm text-gray-500">
            Select a primary color for your biodata.
          </p>
          
          <div className="relative">
            <select
              id="primaryColor"
              name="primaryColor"
              className="appearance-none w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#D40000]/30 focus:border-[#D40000]"
              value={settings.primaryColor}
              onChange={handleColorChange}
            >
              {colorOptions.map((color) => (
                <option key={color.value} value={color.value}>
                  {color.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 mt-2">
            <div 
              className="w-6 h-6 rounded-full border border-gray-300"
              style={{ backgroundColor: settings.primaryColor }}
            ></div>
            <span className="text-sm">{settings.primaryColor}</span>
          </div>
        </div>
      </div> */}

      {/* Sharing Options */}
      {/* <div className="space-y-4">
        <h3 className="text-lg font-medium">Sharing Options</h3>
        
        <div className="flex items-center space-x-2">
          <input
            id="shareEnabled"
            type="checkbox"
            className="h-4 w-4 text-[#D40000] focus:ring-[#D40000]/30 border-gray-300 rounded"
            checked={settings.shareEnabled}
            onChange={handleShareEnableToggle}
          />
          <label htmlFor="shareEnabled" className="flex items-center text-sm text-gray-700">
            <Share className="h-4 w-4 mr-1" />
            Enable public sharing
          </label>
        </div>
        
        <p className="text-sm text-gray-500 pl-6">
          When enabled, your biodata will be available via a public link that you can share.
        </p>
        
        {settings.shareEnabled && (
          <div className="pl-6 space-y-4">
            <div className="p-4 bg-gray-50 rounded-md border border-gray-200 flex items-center justify-between">
              <div className="flex items-center">
                <Lock className="h-4 w-4 text-gray-500 mr-2" />
                <span className="text-sm text-gray-700">Your biodata link</span>
              </div>
              <button
                type="button"
                className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                onClick={() => {
                  // Copy to clipboard functionality
                  navigator.clipboard.writeText(`https://biodatamaker.com/share/${settings.id}`);
                  alert('Link copied to clipboard!');
                }}
              >
                Copy
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                id="showEmail"
                type="checkbox"
                className="h-4 w-4 text-[#D40000] focus:ring-[#D40000]/30 border-gray-300 rounded"
                checked={settings.privacySettings?.showEmail}
                onChange={(e) => {
                  updateSettings({
                    privacySettings: {
                      ...settings.privacySettings,
                      showEmail: e.target.checked
                    }
                  });
                }}
              />
              <label htmlFor="showEmail" className="text-sm text-gray-700">
                Show email in shared biodata
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                id="showIncome"
                type="checkbox"
                className="h-4 w-4 text-[#D40000] focus:ring-[#D40000]/30 border-gray-300 rounded"
                checked={settings.privacySettings?.showIncome}
                onChange={(e) => {
                  updateSettings({
                    privacySettings: {
                      ...settings.privacySettings,
                      showIncome: e.target.checked
                    }
                  });
                }}
              />
              <label htmlFor="showIncome" className="text-sm text-gray-700">
                Show income details in shared biodata
              </label>
            </div>
          </div>
        )}
      </div> */}

      {/* Buttons */}
      <div className="flex space-x-4">
        <button
          type="button"
          className="px-6 py-2 border border-[#D40000] text-[#D40000] rounded-md hover:bg-[#D40000]/10 transition-colors"
          onClick={() => {
            // Go back to previous step
            console.log('Go back to previous step')
          }}
        >
          Back
        </button>

        <button
          type="button"
          className="px-6 py-2 bg-[#D40000] text-white rounded-md hover:bg-[#b30000] transition-colors"
          onClick={handleSubmit}
        >
          Save Settings
        </button>
      </div>
    </div>
  )
}

export default SettingsForm
