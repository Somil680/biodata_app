// src/hooks/useBiodataForm.ts
import { useBiodata, BiodataActionTypes } from '@/context/BiodataContext';
import { 
  PersonalInformation, 
  FamilyInformation, 
  ContactInformation, 
  PartnerPreferences,
  BiodataSettings
} from '@/lib/type';

// Hook for personal information section
export const usePersonalInfoForm = () => {
  const { biodata, dispatch } = useBiodata();

  const updatePersonalInfo = (data: Partial<PersonalInformation>) => {
    dispatch({
      type: BiodataActionTypes.UPDATE_PERSONAL_INFO,
      payload: data,
    });
  };

  return {
    personalInfo: biodata.personalInformation,
    updatePersonalInfo,
  };
};

// Hook for family information section
export const useFamilyInfoForm = () => {
  const { biodata, dispatch } = useBiodata();

  const updateFamilyInfo = (data: Partial<FamilyInformation>) => {
    dispatch({
      type: BiodataActionTypes.UPDATE_FAMILY_INFO,
      payload: data,
    });
  };

  return {
    familyInfo: biodata.familyInformation,
    updateFamilyInfo,
  };
};

// Hook for contact information section
export const useContactInfoForm = () => {
  const { biodata, dispatch } = useBiodata();

  const updateContactInfo = (data: Partial<ContactInformation>) => {
    dispatch({
      type: BiodataActionTypes.UPDATE_CONTACT_INFO,
      payload: data,
    });
  };

  return {
    contactInfo: biodata.contactInformation,
    updateContactInfo,
  };
};

// Hook for partner preferences section
export const usePartnerPreferencesForm = () => {
  const { biodata, dispatch } = useBiodata();

  const updatePartnerPreferences = (data: Partial<PartnerPreferences>) => {
    dispatch({
      type: BiodataActionTypes.UPDATE_PARTNER_PREFERENCES,
      payload: data,
    });
  };

  return {
    partnerPreferences: biodata.partnerPreferences,
    updatePartnerPreferences,
  };
};

// Hook for biodata settings
export const useBiodataSettings = () => {
  const { biodata, dispatch } = useBiodata();

  const updateSettings = (data: Partial<BiodataSettings>) => {
    dispatch({
      type: BiodataActionTypes.UPDATE_SETTINGS,
      payload: data,
    });
  };

  const uploadPhoto = (photoUrl: string) => {
    dispatch({
      type: BiodataActionTypes.UPLOAD_PHOTO,
      payload: photoUrl,
    });
  };

  const uploadHoroscope = (url: string, showInBiodata: boolean = true) => {
    dispatch({
      type: BiodataActionTypes.UPLOAD_HOROSCOPE,
      payload: {
        url,
        showInBiodata,
      },
    });
  };

  return {
    settings: biodata.settings,
    updateSettings,
    uploadPhoto,
    uploadHoroscope,
  };
};

// Hook for overall biodata management
export const useBiodataManager = () => {
  const { biodata, dispatch, saveBiodata, exportAsPDF, exportAsImage } = useBiodata();

  const resetBiodata = () => {
    dispatch({
      type: BiodataActionTypes.RESET_BIODATA,
    });
  };

  const loadBiodata = (biodataJson: string) => {
    try {
      const parsedBiodata = JSON.parse(biodataJson);
      dispatch({
        type: BiodataActionTypes.LOAD_BIODATA,
        payload: parsedBiodata,
      });
    } catch (error) {
      console.error('Failed to parse biodata JSON:', error);
    }
  };

  return {
    biodata,
    resetBiodata,
    loadBiodata,
    saveBiodata,
    exportAsPDF,
    exportAsImage,
  };
};