// src/components/BiodataCard/index.tsx
import React from 'react';
import Image from 'next/image';
import { useBiodata } from '@/context/BiodataContext';
import { 
  User, 
  Calendar, 
  Ruler, 
  Briefcase, 
  GraduationCap, 
  DollarSign,
  Heart,
  Phone,
  Mail,
  MapPin,
  Users
} from 'lucide-react';

interface BiodataCardProps {
  previewMode?: boolean;
}

const BiodataCard: React.FC<BiodataCardProps> = ({ previewMode = false }) => {
  const { biodata } = useBiodata();
  const { 
    personalInformation, 
    familyInformation, 
    contactInformation,
    settings
  } = biodata;

  // Function to determine if a field should be shown based on privacy settings
  const shouldShowField = (field: string): boolean => {
    if (!previewMode) return true;
    
    if (!settings.shareEnabled) return false;
    
    switch (field) {
      case 'email':
        return !!settings.privacySettings?.showEmail;
      case 'income':
        return !!settings.privacySettings?.showIncome;
      case 'address':
        return !!settings.privacySettings?.showAddress;
      default:
        return true;
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden" style={{ 
      fontFamily: settings.fontFamily === 'geist' ? 'var(--font-geist-sans)' : settings.fontFamily 
    }}>
      {/* Header */}
      <div 
        className="relative py-6 px-8 text-center"
        style={{ 
          backgroundColor: settings.primaryColor || '#D40000',
          color: 'white'
        }}
      >
        {settings.background && (
          <div 
            className="absolute inset-0 opacity-10 bg-center bg-cover"
            style={{ backgroundImage: `url(${settings.background})` }}
          />
        )}
        
        <div className="relative z-10">
          {settings.idolImage && (
            <div className="flex justify-center mb-3">
              <div className="w-16 h-16 bg-white rounded-full p-1">
                {/* In a real app, this would be an Image component with proper optimization */}
                <Image
                  src={settings.idolImage} 
                  alt="Idol" 
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
            </div>
          )}
          
          <h1 className="text-2xl font-bold">{personalInformation.fullName}</h1>
          
          {settings.tagline && (
            <p className="mt-1 text-white text-opacity-90">{settings.tagline}</p>
          )}
        </div>
      </div>
      
      {/* Personal Information */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold mb-4" style={{ color: settings.primaryColor || '#D40000' }}>
          Personal Information
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-gray-400" />
            <div>
              <span className="text-sm text-gray-500">Date of Birth</span>
              <p>{personalInformation.dateOfBirth} {personalInformation.age && `(${personalInformation.age} years)`}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Ruler className="h-5 w-5 mr-2 text-gray-400" />
            <div>
              <span className="text-sm text-gray-500">Height</span>
              <p>{personalInformation.height}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Heart className="h-5 w-5 mr-2 text-gray-400" />
            <div>
              <span className="text-sm text-gray-500">Religion</span>
              <p>{personalInformation.religion} {personalInformation.caste && `(${personalInformation.caste})`}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <User className="h-5 w-5 mr-2 text-gray-400" />
            <div>
              <span className="text-sm text-gray-500">Marital Status</span>
              <p>{personalInformation.maritalStatus}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <GraduationCap className="h-5 w-5 mr-2 text-gray-400" />
            <div>
              <span className="text-sm text-gray-500">Education</span>
              <p>{personalInformation.education}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Briefcase className="h-5 w-5 mr-2 text-gray-400" />
            <div>
              <span className="text-sm text-gray-500">Profession</span>
              <p>{personalInformation.profession}</p>
            </div>
          </div>
          
          {shouldShowField('income') && (
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-gray-400" />
              <div>
                <span className="text-sm text-gray-500">Annual Income</span>
                <p>{personalInformation.annualIncome}</p>
              </div>
            </div>
          )}
          
          {personalInformation.languages && personalInformation.languages.length > 0 && (
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-2 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              <div>
                <span className="text-sm text-gray-500">Languages</span>
                <p>{personalInformation.languages.join(', ')}</p>
              </div>
            </div>
          )}
        </div>
        
        {personalInformation.aboutMe && (
          <div className="mt-4">
            <span className="text-sm text-gray-500 block mb-1">About</span>
            <p className="text-gray-700">{personalInformation.aboutMe}</p>
          </div>
        )}
      </div>
      
      {/* Family Information */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold mb-4" style={{ color: settings.primaryColor || '#D40000' }}>
          Family Information
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <User className="h-5 w-5 mr-2 text-gray-400" />
            <div>
              <span className="text-sm text-gray-500">Father`s Name</span>
              <p>{familyInformation.fatherName}</p>
            </div>
          </div>
          
          {familyInformation.fatherOccupation && (
            <div className="flex items-center">
              <Briefcase className="h-5 w-5 mr-2 text-gray-400" />
              <div>
                <span className="text-sm text-gray-500">Father`s Occupation</span>
                <p>{familyInformation.fatherOccupation}</p>
              </div>
            </div>
          )}
          
          <div className="flex items-center">
            <User className="h-5 w-5 mr-2 text-gray-400" />
            <div>
              <span className="text-sm text-gray-500">Mother`s Name</span>
              <p>{familyInformation.motherName}</p>
            </div>
          </div>
          
          {familyInformation.motherOccupation && (
            <div className="flex items-center">
              <Briefcase className="h-5 w-5 mr-2 text-gray-400" />
              <div>
                <span className="text-sm text-gray-500">Mother`s Occupation</span>
                <p>{familyInformation.motherOccupation}</p>
              </div>
            </div>
          )}
          
          <div className="flex items-center">
            <Users className="h-5 w-5 mr-2 text-gray-400" />
            <div>
              <span className="text-sm text-gray-500">Siblings</span>
              <p>
                {familyInformation.brothers ? `${familyInformation.brothers} Brother(s)` : 'No Brothers'}, 
                {familyInformation.sisters ? ` ${familyInformation.sisters} Sister(s)` : ' No Sisters'}
              </p>
            </div>
          </div>
          
          {familyInformation.familyType && (
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-gray-400" />
              <div>
                <span className="text-sm text-gray-500">Family Type</span>
                <p>{familyInformation.familyType}</p>
              </div>
            </div>
          )}
        </div>
        
        {familyInformation.aboutFamily && (
          <div className="mt-4">
            <span className="text-sm text-gray-500 block mb-1">About Family</span>
            <p className="text-gray-700">{familyInformation.aboutFamily}</p>
          </div>
        )}
      </div>
      
      {/* Contact Information */}
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4" style={{ color: settings.primaryColor || '#D40000' }}>
          Contact Information
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <Phone className="h-5 w-5 mr-2 text-gray-400" />
            <div>
              <span className="text-sm text-gray-500">Mobile Number</span>
              <p>{contactInformation.mobileNumber}</p>
            </div>
          </div>
          
          {shouldShowField('email') && contactInformation.email && (
            <div className="flex items-center">
              <Mail className="h-5 w-5 mr-2 text-gray-400" />
              <div>
                <span className="text-sm text-gray-500">Email</span>
                <p>{contactInformation.email}</p>
              </div>
            </div>
          )}
        </div>
        
        {shouldShowField('address') && (
          <div className="mt-4 flex">
            <MapPin className="h-5 w-5 mr-2 text-gray-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-sm text-gray-500 block mb-1">Address</span>
              <p className="text-gray-700">
                {contactInformation.address}, {contactInformation.city}, {contactInformation.state}, {contactInformation.country}
                {contactInformation.pincode && ` - ${contactInformation.pincode}`}
              </p>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="px-6 py-3 bg-gray-50 text-xs text-center text-gray-500">
        Created with BiodataMaker.com • {new Date().toLocaleDateString()}
      </div>
    </div>
  );
};

export default BiodataCard;