import React from 'react';
import { Document, Page, Text, View, StyleSheet , Image} from '@react-pdf/renderer';
import { Biodata } from '@/lib/type';
import bgImage from '../../../public/images/template-previews/bg.png'; // adjust path

interface TemplateProps {
  biodata: Biodata;
}

// Helper function to check if a value should be displayed
const shouldDisplay = (value: any): boolean => {
  if (value === undefined || value === null || value === '') return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
};

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 20,
    backgroundImage: '../../../public/images/template-previews/bg.png',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    border : '1px solid black'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  contentRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  mainContent: {
    width: '100%',
    paddingRight: 15,
  },
  imageColumn: {
    position: 'absolute',
    right: 20,
    top: 64,
    width: 150,
    height: 200,
    border: '2px solid #D40000',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingBottom: 5,
    // width: 150,
    // borderBottom: '1px solid black',
  },
  fieldContainer: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: 12,
    marginBottom: 5,
  },
  fieldLabel: {
    width: 150,
    fontWeight: 'medium',
    color: '#4B5563',
  },
  fieldColon: {
    width: 10,
    fontWeight: 'medium',
    color: '#4B5563',
  },
  fieldValue: {
    flex: 1,
    color: '#111827',
  },
  sectionContainer: {
    marginBottom: 15,
  }
  ,
   backgroundImage: {
    position: 'absolute',
    minWidth: '100%',
    minHeight: '100%',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    opacity: 0.1, // For watermark effect
  },
});

// The main Template component for PDF
const Template1PDF: React.FC<TemplateProps> = ({ biodata }) => {
  // Use optional chaining to handle potentially undefined values
  const personal = biodata?.personalInformation || {};
  const family = biodata?.familyInformation || {};
  const contact = biodata?.contactInformation || {};
  
  return (
    <Document>
      <Page size="A4" style={styles.page}>
         <View fixed style={styles.backgroundImage}>
    <Image src={bgImage} style={styles.backgroundImage} />
  </View>
        <View style={styles.container}>
          {/* Personal Information Section */}
          <View style={styles.sectionContainer}>
            <View>
              
            <Text style={styles.sectionTitle}>Personal Information</Text>
            
            {shouldDisplay(personal.fullName) && (
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Full Name</Text>
                <Text style={styles.fieldColon}>:</Text>
                <Text style={styles.fieldValue}>{String(personal.fullName)}</Text>
              </View>
            )}
            
            {shouldDisplay(personal.dateOfBirth) && (
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Date of Birth</Text>
                <Text style={styles.fieldColon}>:</Text>
                <Text style={styles.fieldValue}>{String(personal.dateOfBirth)}</Text>
              </View>
            )}
            
            {shouldDisplay(personal.age) && (
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Age</Text>
                <Text style={styles.fieldColon}>:</Text>
                <Text style={styles.fieldValue}>{String(personal.age)}</Text>
              </View>
            )}
            
            {shouldDisplay(personal.height) && (
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Height</Text>
                <Text style={styles.fieldColon}>:</Text>
                <Text style={styles.fieldValue}>{String(personal.height)}</Text>
              </View>
            )}
            
            {shouldDisplay(personal.weight) && (
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Weight</Text>
                <Text style={styles.fieldColon}>:</Text>
                <Text style={styles.fieldValue}>{String(personal.weight)}</Text>
              </View>
            )}
            
            {shouldDisplay(personal.bloodGroup) && (
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Blood Group</Text>
                <Text style={styles.fieldColon}>:</Text>
                <Text style={styles.fieldValue}>{String(personal.bloodGroup)}</Text>
              </View>
            )}
            
            {shouldDisplay(personal.maritalStatus) && (
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Marital Status</Text>
                <Text style={styles.fieldColon}>:</Text>
                <Text style={styles.fieldValue}>{String(personal.maritalStatus)}</Text>
              </View>
            )}
            
            {shouldDisplay(personal.religion) && (
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Religion</Text>
                <Text style={styles.fieldColon}>:</Text>
                <Text style={styles.fieldValue}>{String(personal.religion)}</Text>
              </View>
            )}
            
            {shouldDisplay(personal.education) && (
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Education</Text>
                <Text style={styles.fieldColon}>:</Text>
                <Text style={styles.fieldValue}>{String(personal.education)}</Text>
              </View>
            )}
            
            {shouldDisplay(personal.profession) && (
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Profession</Text>
                <Text style={styles.fieldColon}>:</Text>
                <Text style={styles.fieldValue}>{String(personal.profession)}</Text>
              </View>
            )}
            
            {shouldDisplay(personal.annualIncome) && (
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Annual Income</Text>
                <Text style={styles.fieldColon}>:</Text>
                <Text style={styles.fieldValue}>{String(personal.annualIncome)}</Text>
              </View>
            )}
            
            {shouldDisplay(personal.timeOfBirth) && (
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Time of Birth</Text>
                <Text style={styles.fieldColon}>:</Text>
                <Text style={styles.fieldValue}>{String(personal.timeOfBirth)}</Text>
              </View>
            )}
            
            {shouldDisplay(personal.placeOfBirth) && (
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Place of Birth</Text>
                <Text style={styles.fieldColon}>:</Text>
                <Text style={styles.fieldValue}>{String(personal.placeOfBirth)}</Text>
              </View>
            )}
            
            {shouldDisplay(personal.caste) && (
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Caste</Text>
                <Text style={styles.fieldColon}>:</Text>
                <Text style={styles.fieldValue}>{String(personal.caste)}</Text>
              </View>
            )}
            
            {shouldDisplay(personal.subCaste) && (
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Sub-Caste</Text>
                <Text style={styles.fieldColon}>:</Text>
                <Text style={styles.fieldValue}>{String(personal.subCaste)}</Text>
              </View>
            )}
            
            {shouldDisplay(personal.gothra) && (
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Gothra</Text>
                <Text style={styles.fieldColon}>:</Text>
                <Text style={styles.fieldValue}>{String(personal.gothra)}</Text>
              </View>
            )}
            
            {shouldDisplay(personal.rashi) && (
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Rashi</Text>
                <Text style={styles.fieldColon}>:</Text>
                <Text style={styles.fieldValue}>{String(personal.rashi)}</Text>
              </View>
            )}
            
            {shouldDisplay(personal.nakshatra) && (
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Nakshatra</Text>
                <Text style={styles.fieldColon}>:</Text>
                <Text style={styles.fieldValue}>{String(personal.nakshatra)}</Text>
              </View>
            )}
            
            {shouldDisplay(personal.manglik) && (
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Manglik</Text>
                <Text style={styles.fieldColon}>:</Text>
                <Text style={styles.fieldValue}>{String(personal.manglik)}</Text>
              </View>
            )}
            
            {shouldDisplay(personal.diet) && (
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Diet</Text>
                <Text style={styles.fieldColon}>:</Text>
                <Text style={styles.fieldValue}>{String(personal.diet)}</Text>
              </View>
            )}
            
            {shouldDisplay(personal.hobbies) && (
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Hobbies</Text>
                <Text style={styles.fieldColon}>:</Text>
                <Text style={styles.fieldValue}>{String(Array.isArray(personal.hobbies) ? personal.hobbies.join(', ') : personal.hobbies)}</Text>
              </View>
            )}
            
            {shouldDisplay(personal.languages) && (
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Languages</Text>
                <Text style={styles.fieldColon}>:</Text>
                <Text style={styles.fieldValue}>{String(Array.isArray(personal.languages) ? personal.languages.join(', ') : personal.languages)}</Text>
              </View>
            )}
            
            {shouldDisplay(personal.aboutMe) && (
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>About Me</Text>
                <Text style={styles.fieldColon}>:</Text>
                <Text style={styles.fieldValue}>{String(personal.aboutMe)}</Text>
              </View>
            )}
            </View>
            <View style ={styles.imageColumn}>

            <Image src={'../../../public/images/template-previews/bg.png'}  />
            </View>

            
          </View>
          
          {/* Family Information Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Family Information</Text>
            
            {shouldDisplay(family.fatherName) && (
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Father's Name</Text>
                <Text style={styles.fieldColon}>:</Text>
                <Text style={styles.fieldValue}>{String(family.fatherName)}</Text>
              </View>
            )}
            
            {shouldDisplay(family.fatherOccupation) && (
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Father's Occupation</Text>
                <Text style={styles.fieldColon}>:</Text>
                <Text style={styles.fieldValue}>{String(family.fatherOccupation)}</Text>
              </View>
            )}
            
            {shouldDisplay(family.motherName) && (
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Mother's Name</Text>
                <Text style={styles.fieldColon}>:</Text>
                <Text style={styles.fieldValue}>{String(family.motherName)}</Text>
              </View>
            )}
            
            {shouldDisplay(family.motherOccupation) && (
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Mother's Occupation</Text>
                <Text style={styles.fieldColon}>:</Text>
                <Text style={styles.fieldValue}>{String(family.motherOccupation)}</Text>
              </View>
            )}
            
            {shouldDisplay(family.brothers) && (
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Brothers</Text>
                <Text style={styles.fieldColon}>:</Text>
                <Text style={styles.fieldValue}>{String(family.brothers)}</Text>
              </View>
            )}
            
            {shouldDisplay(family.sisters) && (
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Sisters</Text>
                <Text style={styles.fieldColon}>:</Text>
                <Text style={styles.fieldValue}>{String(family.sisters)}</Text>
              </View>
            )}
            
            {shouldDisplay(family.brothersMarried) && (
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Brothers Married</Text>
                <Text style={styles.fieldColon}>:</Text>
                <Text style={styles.fieldValue}>{String(family.brothersMarried)}</Text>
              </View>
            )}
            
            {shouldDisplay(family.sistersMarried) && (
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Sisters Married</Text>
                <Text style={styles.fieldColon}>:</Text>
                <Text style={styles.fieldValue}>{String(family.sistersMarried)}</Text>
              </View>
            )}
            
            {shouldDisplay(family.familyType) && (
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Family Type</Text>
                <Text style={styles.fieldColon}>:</Text>
                <Text style={styles.fieldValue}>{String(family.familyType)}</Text>
              </View>
            )}
            
            {shouldDisplay(family.familyValues) && (
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Family Values</Text>
                <Text style={styles.fieldColon}>:</Text>
                <Text style={styles.fieldValue}>{String(family.familyValues)}</Text>
              </View>
            )}
            
            {shouldDisplay(family.familyStatus) && (
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Family Status</Text>
                <Text style={styles.fieldColon}>:</Text>
                <Text style={styles.fieldValue}>{String(family.familyStatus)}</Text>
              </View>
            )}
            
            {shouldDisplay(family.nativePlace) && (
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Native Place</Text>
                <Text style={styles.fieldColon}>:</Text>
                <Text style={styles.fieldValue}>{String(family.nativePlace)}</Text>
              </View>
            )}
            
            {shouldDisplay(family.aboutFamily) && (
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>About Family</Text>
                <Text style={styles.fieldColon}>:</Text>
                <Text style={styles.fieldValue}>{String(family.aboutFamily)}</Text>
              </View>
            )}
            
            {/* Custom Family Members */}
            {shouldDisplay(family.customMembers) && 
              family.customMembers?.map((member, index) => {
                if (!member || !member.relation || !member.details) return null;
                return (
                  <View key={`${member.id || index}-${index}`} style={styles.fieldContainer}>
                    <Text style={styles.fieldLabel}>{String(member.relation)}</Text>
                    <Text style={styles.fieldColon}>:</Text>
                    <Text style={styles.fieldValue}>
                      {String(member.details || "").split('\n').join(' ')}
                    </Text>
                  </View>
                );
              })}
          </View>
          
          {/* Contact Information Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Contact Information</Text>
            
            {shouldDisplay(contact.mobileNumber) && (
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Mobile Number</Text>
                <Text style={styles.fieldColon}>:</Text>
                <Text style={styles.fieldValue}>{String(contact.mobileNumber)}</Text>
              </View>
            )}
            
            {shouldDisplay(contact.alternateNumber) && (
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Alternate Number</Text>
                <Text style={styles.fieldColon}>:</Text>
                <Text style={styles.fieldValue}>{String(contact.alternateNumber)}</Text>
              </View>
            )}
            
            {shouldDisplay(contact.email) && (
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Email</Text>
                <Text style={styles.fieldColon}>:</Text>
                <Text style={styles.fieldValue}>{String(contact.email)}</Text>
              </View>
            )}
            
            {shouldDisplay(contact.address) && (
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Address</Text>
                <Text style={styles.fieldColon}>:</Text>
                <Text style={styles.fieldValue}>{String(contact.address)}</Text>
              </View>
            )}
            
            {shouldDisplay(contact.city) && (
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>City</Text>
                <Text style={styles.fieldColon}>:</Text>
                <Text style={styles.fieldValue}>{String(contact.city)}</Text>
              </View>
            )}
            
            {shouldDisplay(contact.state) && (
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>State</Text>
                <Text style={styles.fieldColon}>:</Text>
                <Text style={styles.fieldValue}>{String(contact.state)}</Text>
              </View>
            )}
            
            {shouldDisplay(contact.country) && (
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Country</Text>
                <Text style={styles.fieldColon}>:</Text>
                <Text style={styles.fieldValue}>{String(contact.country)}</Text>
              </View>
            )}
            
            {shouldDisplay(contact.pincode) && (
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Pincode</Text>
                <Text style={styles.fieldColon}>:</Text>
                <Text style={styles.fieldValue}>{String(contact.pincode)}</Text>
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Template1PDF; 