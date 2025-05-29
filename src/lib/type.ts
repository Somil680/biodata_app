// src/types/biodata.ts

// Personal Information types
export interface PersonalInformation {
    fullName: string;
    dateOfBirth: string;
    timeOfBirth?: string;
    placeOfBirth?: string;
    age?: number;
    height?: string;
    weight?: string;
    bloodGroup?: string;
    complexion?: string;
    maritalStatus: string;
    religion: string;
    caste?: string;
    subCaste?: string;
    gothra?: string;
    gotra?: string;
    rashi?: string;
    nakshatra?: string;
    manglik?: string;
    education: string;
    profession: string;
    annualIncome: string;
    income?: string;
    hobbies?: string[];
    languages?: string[];
    diet?: string;
    aboutMe?: string;
}

// Family Information types
export interface FamilyMember {
    name: string;
    relation: string;
    age?: number;
    occupation?: string;
    maritalStatus?: string;
}

export interface CustomFamilyMember {
    id: string;
    relation: string;
    details: string;
}

export interface FamilyInformation {
    // fatherName: string;
    // fatherOccupation?: string;
    // motherName: string;
    // motherOccupation?: string;
    // brothers?: number;
    // brothersMarried?: number;
    // sisters?: number;
    // sistersMarried?: number;
    // brotherName?: string;
    // sisterName?: string;
    familyType?: string;
    familyValues?: string;
    familyStatus?: string;
    familyBackground?: string;
    nativePlace?: string;
    aboutFamily?: string;
    // dada?: string;
    // tauji?: string;
    // nanaji?: string;
    // fufa?: string;
    // mama?: string;
    // chacha?: string;
    // siblings?: FamilyMember[];
    // uncles?: FamilyMember[];
    // aunts?: FamilyMember[];
    customMembers?: CustomFamilyMember[];
}

// Contact Information types
export interface ContactInformation {
    mobileNumber: string;
    alternateNumber?: string;
    email?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    pincode?: string;
    contactPerson?: string;
}

// Partner Preferences types
export interface PartnerPreferences {
    ageRange?: string;
    heightRange?: string;
    education?: string[];
    profession?: string[];
    incomeRange?: string;
    religion?: string;
    caste?: string[];
    maritalStatus?: string[];
    location?: string[];
    additionalPreferences?: string;
}

// Biodata settings
export interface BiodataSettings {
    id?: string; // Added the 'id' property
    idolImage?: string;
    tagline?: string;
    background?: string;
    profilePhoto?: string;
    displayPreferences?: string[];
    templateId?: string;
    fontFamily?: string;
    primaryColor?: string;
    shareEnabled?: boolean;
    privacySettings?: {
        showContactDetails?: boolean;
        showEmail?: boolean;
        showAddress?: boolean;
        showIncome?: boolean;
    };
}

// Complete Biodata type
export interface Biodata {
    id: string;
    userId?: string;
    createdAt: string;
    updatedAt: string;
    settings: BiodataSettings;
    personalInformation: PersonalInformation;
    familyInformation: FamilyInformation;
    contactInformation: ContactInformation;
    partnerPreferences?: PartnerPreferences;
    horoscope?: {
        url?: string;
        showInBiodata?: boolean;
    };
    additionalPhotos?: string[];
}