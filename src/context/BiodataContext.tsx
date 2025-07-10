// src/context/BiodataContext.tsx
'use client'
import React, { createContext, useContext, useReducer, ReactNode } from 'react'
import { v4 as uuidv4 } from 'uuid'
import {
  Biodata,
  PersonalInformation,
  FamilyInformation,
  ContactInformation,
  PartnerPreferences,
  BiodataSettings,
} from '@/lib/type'
import html2canvas from 'html2canvas-pro'
import jsPDF from 'jspdf'
import { StaticImageData } from 'next/image'
import { toBase64 } from '@/lib/utils'
import { db } from '@/lib/db'
import { templates } from '@/components/templates/templates'
console.log("🚀 ~ templates:", templates)
// import { templates } from '@/components/templates/templates'

// Action Types
export enum BiodataActionTypes {
  UPDATE_PERSONAL_INFO = 'UPDATE_PERSONAL_INFO',
  UPDATE_FAMILY_INFO = 'UPDATE_FAMILY_INFO',
  UPDATE_CONTACT_INFO = 'UPDATE_CONTACT_INFO',
  UPDATE_PARTNER_PREFERENCES = 'UPDATE_PARTNER_PREFERENCES',
  UPDATE_SETTINGS = 'UPDATE_SETTINGS',
  UPLOAD_PHOTO = 'UPLOAD_PHOTO',
  UPLOAD_HOROSCOPE = 'UPLOAD_HOROSCOPE',
  RESET_BIODATA = 'RESET_BIODATA',
  LOAD_BIODATA = 'LOAD_BIODATA',
}

// Action Interfaces
interface UpdatePersonalInfoAction {
  type: BiodataActionTypes.UPDATE_PERSONAL_INFO
  payload: Partial<PersonalInformation>
}

interface UpdateFamilyInfoAction {
  type: BiodataActionTypes.UPDATE_FAMILY_INFO
  payload: Partial<FamilyInformation>
}

interface UpdateContactInfoAction {
  type: BiodataActionTypes.UPDATE_CONTACT_INFO
  payload: Partial<ContactInformation>
}

interface UpdatePartnerPreferencesAction {
  type: BiodataActionTypes.UPDATE_PARTNER_PREFERENCES
  payload: Partial<PartnerPreferences>
}

interface UpdateSettingsAction {
  type: BiodataActionTypes.UPDATE_SETTINGS
  payload: Partial<BiodataSettings>
}

interface UploadPhotoAction {
  type: BiodataActionTypes.UPLOAD_PHOTO
  payload: string
}

interface UploadHoroscopeAction {
  type: BiodataActionTypes.UPLOAD_HOROSCOPE
  payload: {
    url: string
    showInBiodata?: boolean
  }
}

interface ResetBiodataAction {
  type: BiodataActionTypes.RESET_BIODATA
}

interface LoadBiodataAction {
  type: BiodataActionTypes.LOAD_BIODATA
  payload: Biodata
}

type BiodataAction =
  | UpdatePersonalInfoAction
  | UpdateFamilyInfoAction
  | UpdateContactInfoAction
  | UpdatePartnerPreferencesAction
  | UpdateSettingsAction
  | UploadPhotoAction
  | UploadHoroscopeAction
  | ResetBiodataAction
  | LoadBiodataAction

// Initial State
export const initialPersonalInfo: PersonalInformation = {
  fullName: '',
  dateOfBirth: '',
  timeOfBirth: '',
  placeOfBirth: '',
  age: 0,
  height: '',
  weight: '',
  bloodGroup: '',
  maritalStatus: '',
  religion: '',
  caste: '',
  subCaste: '',
  gothra: '',
  rashi: '',
  nakshatra: '',
  manglik: '',
  education: '',
  profession: '',
  annualIncome: '',
  hobbies: [],
  languages: [],
  diet: '',
  aboutMe: '',
}

export const initialFamilyInfo: FamilyInformation = {
  // fatherName: '',
  // fatherOccupation: '',
  // motherName: '',
  // motherOccupation: '',
  // brothers: 0,
  // brothersMarried: 0,
  // sisters: 0,
  // sistersMarried: 0,
  familyType: '',
  familyValues: '',
  familyStatus: '',
  familyBackground: '',
  aboutFamily: '',
  nativePlace: '',
  // siblings: [],
  // uncles: [],
  // aunts: [],
  customMembers: [
    { id: '1', details: '', relation: 'Dadaji & Dadiji' },
    { id: '2', details: '', relation: 'Papaji & Mummyji' },
  ],
}

export const initialContactInfo: ContactInformation = {
  mobileNumber: '',
  alternateNumber: '',
  email: '',
  address: '',
  city: '',
  state: '',
  country: '',
  pincode: '',
}

export const initialPartnerPreferences: PartnerPreferences = {
  ageRange: '',
  heightRange: '',
  education: [],
  profession: [],
  incomeRange: '',
  religion: '',
  caste: [],
  maritalStatus: [],
  location: [],
  additionalPreferences: '',
}

export const initialSettings: BiodataSettings = {
  idolImage: '',
  tagline: '',
  background: '',
  profilePhoto: '',
  displayPreferences: [],
  template: {
    id: templates[12].id,
    background: (templates[12].background as StaticImageData).src, // Default to first template
    width: templates[12].width,
    height: templates[12].height,
  },
  fontFamily: 'Geist',
  primaryColor: '#000000',
  shareEnabled: false,
  privacySettings: {
    showContactDetails: true,
    showEmail: false,
    showAddress: true,
    showIncome: false,
  },
}

export const initialBiodata: Biodata = {
  id: uuidv4(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  settings: initialSettings,
  personalInformation: initialPersonalInfo,
  familyInformation: initialFamilyInfo,
  contactInformation: initialContactInfo,
  partnerPreferences: initialPartnerPreferences,
  horoscope: {
    url: '',
    showInBiodata: false,
  },
  additionalPhotos: [],
}

// Context Type
interface BiodataContextType {
  biodata: Biodata
  dispatch: React.Dispatch<BiodataAction>
  saveBiodata: () => Promise<void>
  exportAsPDF: () => Promise<void>
  exportAsImage: () => Promise<void>
  isDownloading: boolean // <-- add this
}

// Create Context
const BiodataContext = createContext<BiodataContextType | undefined>(undefined)

// Reducer
export const biodataReducer = (
  state: Biodata,
  action: BiodataAction
): Biodata => {
  switch (action.type) {
    case BiodataActionTypes.UPDATE_PERSONAL_INFO:
      return {
        ...state,
        updatedAt: new Date().toISOString(),
        personalInformation: {
          ...state.personalInformation,
          ...action.payload,
        },
      }

    case BiodataActionTypes.UPDATE_FAMILY_INFO:
      return {
        ...state,
        updatedAt: new Date().toISOString(),
        familyInformation: {
          ...state.familyInformation,
          ...action.payload,
        },
      }

    case BiodataActionTypes.UPDATE_CONTACT_INFO:
      return {
        ...state,
        updatedAt: new Date().toISOString(),
        contactInformation: {
          ...state.contactInformation,
          ...action.payload,
        },
      }

    case BiodataActionTypes.UPDATE_PARTNER_PREFERENCES:
      return {
        ...state,
        updatedAt: new Date().toISOString(),
        partnerPreferences: {
          ...state.partnerPreferences,
          ...action.payload,
        },
      }

    case BiodataActionTypes.UPDATE_SETTINGS:
      return {
        ...state,
        updatedAt: new Date().toISOString(),
        settings: {
          ...state.settings,
          ...action.payload,
        },
      }

    case BiodataActionTypes.UPLOAD_PHOTO:
      return {
        ...state,
        updatedAt: new Date().toISOString(),
        additionalPhotos: [...(state.additionalPhotos || []), action.payload],
      }

    case BiodataActionTypes.UPLOAD_HOROSCOPE:
      return {
        ...state,
        updatedAt: new Date().toISOString(),
        horoscope: {
          ...state.horoscope,
          ...action.payload,
        },
      }

    case BiodataActionTypes.RESET_BIODATA:
      return {
        ...initialBiodata,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

    case BiodataActionTypes.LOAD_BIODATA:
      return {
        ...action.payload,
        updatedAt: new Date().toISOString(),
      }

    default:
      return state
  }
}

// Provider Props
interface BiodataProviderProps {
  children: ReactNode
}

// Provider Component
export const BiodataProvider: React.FC<BiodataProviderProps> = ({
  children,
}) => {
  const [biodata, dispatch] = useReducer(biodataReducer, initialBiodata)
  const [isDownloading, setIsDownloading] = React.useState(false)

  // Load biodata from Dexie on initial load
  React.useEffect(() => {
    db.biodata.get(initialBiodata.id).then((savedBiodata) => {
      if (savedBiodata) {
        dispatch({
          type: BiodataActionTypes.LOAD_BIODATA,
          payload: savedBiodata,
        })
      }
    })
  }, [])

  // Save biodata to Dexie whenever it changes
  React.useEffect(() => {
    db.biodata.put(biodata)
  }, [biodata])

  // Function to save biodata (in a real app, this would make an API call)
  const saveBiodata = async (): Promise<void> => {
    try {
      await db.biodata.put(biodata)
      console.log('Biodata saved successfully')
      return Promise.resolve()
    } catch (error) {
      console.error('Failed to save biodata:', error)
      return Promise.reject(error)
    }
  }

  // Function to export biodata as PDF
  const exportAsPDF = async (): Promise<void> => {
    try {
      setIsDownloading(true)
      const resume = document.getElementById('biodata')
      if (!resume) {
        console.error('Element with id "biodata" not found.')
        setIsDownloading(false)
        return
      }
      const scale = 2
      // Render the resume to a high-res canvas
      const fullCanvas = await html2canvas(resume, {
        scale,
        useCORS: true,
        backgroundColor: null,

      })

      // Background image base64
      const bgSrc =
        typeof biodata.settings.template?.background === 'string'
          ? biodata.settings.template?.background
          : (
              biodata.settings.template
                ?.background as unknown as StaticImageData
            )?.src || ''

      if (!bgSrc) {
        console.error('Background image not found or invalid.')
        setIsDownloading(false)
        return
      }

      const base64Bg = await toBase64(bgSrc)

      // Create jsPDF instance
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pdfWidthMM = pdf.internal.pageSize.getWidth() // 210mm
      const pdfHeightMM = pdf.internal.pageSize.getHeight() // 297mm

      const dpi = 96
      const mmToPx = (dpi / 25.4) * scale // 1 mm ≈ 3.78 * scale px

      const pdfHeightPx = pdfHeightMM * mmToPx

      // === CUSTOMIZABLE PADDING (IN MM) ===
      const paddingTopMM =  10 // 0mm padding for top
      const paddingBottomMM = 10 // 0mm padding for top? 0
      const paddingLeftMM =  10 // 0mm padding for top0
      const paddingRightMM =10 // 0mm padding for top 01

      const paddingTopPx = paddingTopMM * mmToPx
      const paddingBottomPx = paddingBottomMM * mmToPx
      const paddingLeftPx = paddingLeftMM * mmToPx
      const paddingRightPx = paddingRightMM * mmToPx
      const usableHeightPx = pdfHeightPx - paddingTopPx - paddingBottomPx
      const totalCanvasHeight = fullCanvas.height
      const totalPages = Math.ceil(totalCanvasHeight / usableHeightPx)
      console.log('🚀 ~ downloadPDFWithBackground ~ totalPages:', totalPages)

      for (let i = 0; i < totalPages; i++) {
        const sliceCanvas = document.createElement('canvas')
        sliceCanvas.width = fullCanvas.width
        sliceCanvas.height = pdfHeightPx

        const ctx = sliceCanvas.getContext('2d')!

        // Draw the portion of fullCanvas into this slice with vertical offset
        ctx.drawImage(
          fullCanvas,
          0,
          i * usableHeightPx, // source crop
          fullCanvas.width,
          usableHeightPx,
          paddingLeftPx, // destination start
          paddingTopPx, // destination start
          fullCanvas.width - paddingLeftPx - paddingRightPx,
          usableHeightPx
        )

        const sliceImage = sliceCanvas.toDataURL('image/png')
        console.log("🚀 ~ exportAsPDF ~ sliceImage:", sliceImage)

        if (i > 0) pdf.addPage()

        // Add background
        pdf.addImage(base64Bg, 'PNG', 0, 0, pdfWidthMM, pdfHeightMM)

        // Add slice image content with scaled size & offset (MM version of padding)
        pdf.addImage(
          sliceImage,
          'PNG',
          paddingLeftMM,
          paddingTopMM,
          pdfWidthMM - paddingLeftMM - paddingRightMM,
          pdfHeightMM - paddingTopMM - paddingBottomMM
        )
      }

      pdf.save('resume-with-bg.pdf')
    } catch (error) {
      console.error('PDF generation failed:', error)
    } finally {
      setIsDownloading(false)
    }
  }

  // Function to export biodata as Image (placeholder implementation)
  const exportAsImage = async (): Promise<void> => {
    // In a real app, you would implement image generation logic here
    console.log('Exporting biodata as Image...')
    return Promise.resolve()
  }

  return (
    <BiodataContext.Provider
      value={{
        biodata,
        dispatch,
        saveBiodata,
        exportAsPDF,
        exportAsImage,
        isDownloading, // <-- expose in context
      }}
    >
      {children}
    </BiodataContext.Provider>
  )
}

// Custom hook to use the biodata context
export const useBiodata = (): BiodataContextType => {
  const context = useContext(BiodataContext)
  if (context === undefined) {
    throw new Error('useBiodata must be used within a BiodataProvider')
  }
  return context
}
