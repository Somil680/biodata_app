// src/context/BiodataContext.tsx
'use client'
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { 
  Biodata, 
  PersonalInformation, 
  FamilyInformation, 
  ContactInformation, 
  PartnerPreferences,
  BiodataSettings
} from '@/lib/type';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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
  type: BiodataActionTypes.UPDATE_PERSONAL_INFO;
  payload: Partial<PersonalInformation>;
}

interface UpdateFamilyInfoAction {
  type: BiodataActionTypes.UPDATE_FAMILY_INFO;
  payload: Partial<FamilyInformation>;
}

interface UpdateContactInfoAction {
  type: BiodataActionTypes.UPDATE_CONTACT_INFO;
  payload: Partial<ContactInformation>;
}

interface UpdatePartnerPreferencesAction {
  type: BiodataActionTypes.UPDATE_PARTNER_PREFERENCES;
  payload: Partial<PartnerPreferences>;
}

interface UpdateSettingsAction {
  type: BiodataActionTypes.UPDATE_SETTINGS;
  payload: Partial<BiodataSettings>;
}

interface UploadPhotoAction {
  type: BiodataActionTypes.UPLOAD_PHOTO;
  payload: string;
}

interface UploadHoroscopeAction {
  type: BiodataActionTypes.UPLOAD_HOROSCOPE;
  payload: {
    url: string;
    showInBiodata?: boolean;
  };
}

interface ResetBiodataAction {
  type: BiodataActionTypes.RESET_BIODATA;
}

interface LoadBiodataAction {
  type: BiodataActionTypes.LOAD_BIODATA;
  payload: Biodata;
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
  | LoadBiodataAction;

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
};

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
  customMembers: [{id: "1", details: '', relation: 'Dadaji & Dadiji'}, {id: "2", details: '', relation: 'Papaji & Mummyji'}],
};

export const initialContactInfo: ContactInformation = {
  mobileNumber: '',
  alternateNumber: '',
  email: '',
  address: '',
  city: '',
  state: '',
  country: '',
  pincode: '',
};

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
};

export const initialSettings: BiodataSettings = {
  idolImage: '',
  tagline: '',
  background: '',
  profilePhoto: '',
  displayPreferences: [],
  templateId: '1', // Default template
  fontFamily: 'Geist',
  primaryColor: '#D40000',
  shareEnabled: false,
  privacySettings: {
    showContactDetails: true,
    showEmail: false,
    showAddress: true,
    showIncome: false,
  },
};

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
};

// Context Type
interface BiodataContextType {
  biodata: Biodata;
  dispatch: React.Dispatch<BiodataAction>;
  saveBiodata: () => Promise<void>;
  exportAsPDF: () => Promise<void>;
  exportAsImage: () => Promise<void>;
}

// Create Context
const BiodataContext = createContext<BiodataContextType | undefined>(undefined);

// Reducer
export const biodataReducer = (state: Biodata, action: BiodataAction): Biodata => {
  switch (action.type) {
    case BiodataActionTypes.UPDATE_PERSONAL_INFO:
      return {
        ...state,
        updatedAt: new Date().toISOString(),
        personalInformation: {
          ...state.personalInformation,
          ...action.payload,
        },
      };

    case BiodataActionTypes.UPDATE_FAMILY_INFO:
      return {
        ...state,
        updatedAt: new Date().toISOString(),
        familyInformation: {
          ...state.familyInformation,
          ...action.payload,
        },
      };

    case BiodataActionTypes.UPDATE_CONTACT_INFO:
      return {
        ...state,
        updatedAt: new Date().toISOString(),
        contactInformation: {
          ...state.contactInformation,
          ...action.payload,
        },
      };

    case BiodataActionTypes.UPDATE_PARTNER_PREFERENCES:
      return {
        ...state,
        updatedAt: new Date().toISOString(),
        partnerPreferences: {
          ...state.partnerPreferences,
          ...action.payload,
        },
      };

    case BiodataActionTypes.UPDATE_SETTINGS:
      return {
        ...state,
        updatedAt: new Date().toISOString(),
        settings: {
          ...state.settings,
          ...action.payload,
        },
      };

    case BiodataActionTypes.UPLOAD_PHOTO:
      return {
        ...state,
        updatedAt: new Date().toISOString(),
        additionalPhotos: [...(state.additionalPhotos || []), action.payload],
      };

    case BiodataActionTypes.UPLOAD_HOROSCOPE:
      return {
        ...state,
        updatedAt: new Date().toISOString(),
        horoscope: {
          ...state.horoscope,
          ...action.payload,
        },
      };

    case BiodataActionTypes.RESET_BIODATA:
      return {
        ...initialBiodata,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

    case BiodataActionTypes.LOAD_BIODATA:
      return {
        ...action.payload,
        updatedAt: new Date().toISOString(),
      };

    default:
      return state;
  }
};

// Provider Props
interface BiodataProviderProps {
  children: ReactNode;
}

// Provider Component
export const BiodataProvider: React.FC<BiodataProviderProps> = ({ children }) => {
  const [biodata, dispatch] = useReducer(biodataReducer, initialBiodata);

  // Load biodata from localStorage on initial load
  React.useEffect(() => {
    const savedBiodata = localStorage.getItem('biodata');
    if (savedBiodata) {
      try {
        const parsedBiodata = JSON.parse(savedBiodata);
        dispatch({
          type: BiodataActionTypes.LOAD_BIODATA,
          payload: parsedBiodata,
        });
      } catch (error) {
        console.error('Failed to parse saved biodata:', error);
      }
    }
  }, []);

  // Save biodata to localStorage whenever it changes
  React.useEffect(() => {
    localStorage.setItem('biodata', JSON.stringify(biodata));
  }, [biodata]);

  // Function to save biodata (in a real app, this would make an API call)
  const saveBiodata = async (): Promise<void> => {
    try {
      // In a real app, you would save to your backend here
      localStorage.setItem('biodata', JSON.stringify(biodata));
      console.log('Biodata saved successfully');
      return Promise.resolve();
    } catch (error) {
      console.error('Failed to save biodata:', error);
      return Promise.reject(error);
    }
  };

  // Function to export biodata as PDF
  const exportAsPDF = async (): Promise<void> => {
    const element = document.getElementById('biodata-preview-pdf');
    if (!element) {
      console.error('Preview element not found');
      return;
    }
    const canvas = await html2canvas(element, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'pt', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('biodata.pdf');
  };

  // Function to export biodata as Image (placeholder implementation)
  const exportAsImage = async (): Promise<void> => {
    // In a real app, you would implement image generation logic here
    console.log('Exporting biodata as Image...');
    return Promise.resolve();
  };

  return (
    <BiodataContext.Provider
      value={{
        biodata,
        dispatch,
        saveBiodata,
        exportAsPDF,
        exportAsImage,
      }}
    >
      {children}
    </BiodataContext.Provider>
  );
};

// Custom hook to use the biodata context
export const useBiodata = (): BiodataContextType => {
  const context = useContext(BiodataContext);
  if (context === undefined) {
    throw new Error('useBiodata must be used within a BiodataProvider');
  }
  return context;
};


