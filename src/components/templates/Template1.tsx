"use client"
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, PDFViewer } from '@react-pdf/renderer';
import { Biodata, FamilyMember, CustomFamilyMember } from '@/lib/type';
import { div } from 'framer-motion/client';

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
    backgroundColor: '#ffffff',
    // backgroundImage cannot use relative paths in react-pdf
    // backgroundImage: '/images/template-previews/bg.png',
    // backgroundSize: 'cover',
    // backgroundPosition: 'center',
    // backgroundRepeat: 'no-repeat'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
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
  },
  imageContainer: {
    border: '2px solid #D40000',
    width: 150,
    height: 200,
  },
  sectionTitle: {
    fontSize: 18,
    width: 'fit-content',
    fontWeight: 'bold',
    marginBottom: 15,
    paddingBottom: 8,
    borderBottom: '1px solid black' 
  },
  fieldContainer: {
    fontSize : 12,
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 3,
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
    marginBottom: 30,
  }
});

// The main Template component
const Template1: React.FC<TemplateProps> = ({ biodata }) => {
  const { personalInformation: personal, familyInformation: family, contactInformation: contact } = biodata;
   
  const TetemplateCode: React.FC<TemplateProps> = ({ biodata }) => {
    return (
      
    <Document >
      <Page size={'A4'}  style={styles.page}>
        <View style={styles.container}>
          <View style={styles.contentRow}>
            {/* Main content column */}
            <View style={styles.mainContent}>
              {/* Personal Information Section */}
              <View style={styles.sectionContainer}>
                <View>
                <Text style={styles.sectionTitle}>Personal Information</Text>
                <View>
                  {shouldDisplay(personal.fullName) && (
                    <View style={styles.fieldContainer}>
                      <Text style={styles.fieldLabel}>Full Name</Text>
                      <Text style={styles.fieldColon}>:</Text>
                      <Text style={styles.fieldValue}>{personal.fullName}</Text>
                    </View>
                  )}
                  
                  {shouldDisplay(personal.dateOfBirth) && (
                    <View style={styles.fieldContainer}>
                      <Text style={styles.fieldLabel}>Date of Birth</Text>
                      <Text style={styles.fieldColon}>:</Text>
                      <Text style={styles.fieldValue}>{personal.dateOfBirth}</Text>
                    </View>
                  )}
                  
                  {shouldDisplay(personal.age) && (
                    <View style={styles.fieldContainer}>
                      <Text style={styles.fieldLabel}>Age</Text>
                      <Text style={styles.fieldColon}>:</Text>
                      <Text style={styles.fieldValue}>{personal.age}</Text>
                    </View>
                  )}
                  
                  {shouldDisplay(personal.height) && (
                    <View style={styles.fieldContainer}>
                      <Text style={styles.fieldLabel}>Height</Text>
                      <Text style={styles.fieldColon}>:</Text>
                      <Text style={styles.fieldValue}>{personal.height}</Text>
                    </View>
                  )}
                  
                  {shouldDisplay(personal.weight) && (
                    <View style={styles.fieldContainer}>
                      <Text style={styles.fieldLabel}>Weight</Text>
                      <Text style={styles.fieldColon}>:</Text>
                      <Text style={styles.fieldValue}>{personal.weight}</Text>
                    </View>
                  )}
                  
                  {shouldDisplay(personal.bloodGroup) && (
                    <View style={styles.fieldContainer}>
                      <Text style={styles.fieldLabel}>Blood Group</Text>
                      <Text style={styles.fieldColon}>:</Text>
                      <Text style={styles.fieldValue}>{personal.bloodGroup}</Text>
                    </View>
                  )}
                  
                  {shouldDisplay(personal.maritalStatus) && (
                    <View style={styles.fieldContainer}>
                      <Text style={styles.fieldLabel}>Marital Status</Text>
                      <Text style={styles.fieldColon}>:</Text>
                      <Text style={styles.fieldValue}>{personal.maritalStatus}</Text>
                    </View>
                  )}
                  
                  {shouldDisplay(personal.religion) && (
                    <View style={styles.fieldContainer}>
                      <Text style={styles.fieldLabel}>Religion</Text>
                      <Text style={styles.fieldColon}>:</Text>
                      <Text style={styles.fieldValue}>{personal.religion}</Text>
                    </View>
                  )}
                  
                  {shouldDisplay(personal.education) && (
                    <View style={styles.fieldContainer}>
                      <Text style={styles.fieldLabel}>Education</Text>
                      <Text style={styles.fieldColon}>:</Text>
                      <Text style={styles.fieldValue}>{personal.education}</Text>
                    </View>
                  )}
                  
                  {shouldDisplay(personal.profession) && (
                    <View style={styles.fieldContainer}>
                      <Text style={styles.fieldLabel}>Profession</Text>
                      <Text style={styles.fieldColon}>:</Text>
                      <Text style={styles.fieldValue}>{personal.profession}</Text>
                    </View>
                  )}
                  
                  {shouldDisplay(personal.annualIncome) && (
                    <View style={styles.fieldContainer}>
                      <Text style={styles.fieldLabel}>Annual Income</Text>
                      <Text style={styles.fieldColon}>:</Text>
                      <Text style={styles.fieldValue}>{personal.annualIncome}</Text>
                    </View>
                  )}
                  
                  {/* Optional fields from the original type definition */}
                  {shouldDisplay(personal.timeOfBirth) && (
                    <View style={styles.fieldContainer}>
                      <Text style={styles.fieldLabel}>Time of Birth</Text>
                      <Text style={styles.fieldColon}>:</Text>
                      <Text style={styles.fieldValue}>{personal.timeOfBirth}</Text>
                    </View>
                  )}
                  
                  {shouldDisplay(personal.placeOfBirth) && (
                    <View style={styles.fieldContainer}>
                      <Text style={styles.fieldLabel}>Place of Birth</Text>
                      <Text style={styles.fieldColon}>:</Text>
                      <Text style={styles.fieldValue}>{personal.placeOfBirth}</Text>
                    </View>
                  )}
                  
                  {shouldDisplay(personal.caste) && (
                    <View style={styles.fieldContainer}>
                      <Text style={styles.fieldLabel}>Caste</Text>
                      <Text style={styles.fieldColon}>:</Text>
                      <Text style={styles.fieldValue}>{personal.caste}</Text>
                    </View>
                  )}
                  
                  {shouldDisplay(personal.subCaste) && (
                    <View style={styles.fieldContainer}>
                      <Text style={styles.fieldLabel}>Sub-Caste</Text>
                      <Text style={styles.fieldColon}>:</Text>
                      <Text style={styles.fieldValue}>{personal.subCaste}</Text>
                    </View>
                  )}
                  
                  {shouldDisplay(personal.gothra) && (
                    <View style={styles.fieldContainer}>
                      <Text style={styles.fieldLabel}>Gothra</Text>
                      <Text style={styles.fieldColon}>:</Text>
                      <Text style={styles.fieldValue}>{personal.gothra}</Text>
                    </View>
                  )}
                  
                  {shouldDisplay(personal.rashi) && (
                    <View style={styles.fieldContainer}>
                      <Text style={styles.fieldLabel}>Rashi</Text>
                      <Text style={styles.fieldColon}>:</Text>
                      <Text style={styles.fieldValue}>{personal.rashi}</Text>
                    </View>
                  )}
                  
                  {shouldDisplay(personal.nakshatra) && (
                    <View style={styles.fieldContainer}>
                      <Text style={styles.fieldLabel}>Nakshatra</Text>
                      <Text style={styles.fieldColon}>:</Text>
                      <Text style={styles.fieldValue}>{personal.nakshatra}</Text>
                    </View>
                  )}
                  
                  {shouldDisplay(personal.manglik) && (
                    <View style={styles.fieldContainer}>
                      <Text style={styles.fieldLabel}>Manglik</Text>
                      <Text style={styles.fieldColon}>:</Text>
                      <Text style={styles.fieldValue}>{personal.manglik}</Text>
                    </View>
                  )}
                  
                  {shouldDisplay(personal.aboutMe) && (
                    <View style={styles.fieldContainer}>
                      <Text style={styles.fieldLabel}>About Me</Text>
                      <Text style={styles.fieldColon}>:</Text>
                      <Text style={styles.fieldValue}>{personal.aboutMe}</Text>
                    </View>
                  )}
                </View>
                  
                </View>
                   <View style={styles.imageColumn}>
              <View style={styles.imageContainer}>
                {/* Image component in react-pdf needs a source that's either a URL or imported directly */}
                {/* <Image src="/placeholder.jpg" /> */}
              </View>
            </View>
              </View>
              
              {/* Family Information Section */}
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Family Information</Text>
                <View>
                  {shouldDisplay(family.fatherName) && (
                    <View style={styles.fieldContainer}>
                      <Text style={styles.fieldLabel}>Father's Name</Text>
                      <Text style={styles.fieldColon}>:</Text>
                      <Text style={styles.fieldValue}>{family.fatherName}</Text>
                    </View>
                  )}
                  
                  {shouldDisplay(family.fatherOccupation) && (
                    <View style={styles.fieldContainer}>
                      <Text style={styles.fieldLabel}>Father's Occupation</Text>
                      <Text style={styles.fieldColon}>:</Text>
                      <Text style={styles.fieldValue}>{family.fatherOccupation}</Text>
                    </View>
                  )}
                  
                  {shouldDisplay(family.motherName) && (
                    <View style={styles.fieldContainer}>
                      <Text style={styles.fieldLabel}>Mother's Name</Text>
                      <Text style={styles.fieldColon}>:</Text>
                      <Text style={styles.fieldValue}>{family.motherName}</Text>
                    </View>
                  )}
                  
                  {shouldDisplay(family.motherOccupation) && (
                    <View style={styles.fieldContainer}>
                      <Text style={styles.fieldLabel}>Mother's Occupation</Text>
                      <Text style={styles.fieldColon}>:</Text>
                      <Text style={styles.fieldValue}>{family.motherOccupation}</Text>
                    </View>
                  )}
                  
                  {shouldDisplay(family.brothers) && (
                    <View style={styles.fieldContainer}>
                      <Text style={styles.fieldLabel}>Brothers</Text>
                      <Text style={styles.fieldColon}>:</Text>
                      <Text style={styles.fieldValue}>{family.brothers}</Text>
                    </View>
                  )}
                  
                  {shouldDisplay(family.sisters) && (
                    <View style={styles.fieldContainer}>
                      <Text style={styles.fieldLabel}>Sisters</Text>
                      <Text style={styles.fieldColon}>:</Text>
                      <Text style={styles.fieldValue}>{family.sisters}</Text>
                    </View>
                  )}
                  
                  {shouldDisplay(family.brothersMarried) && (
                    <View style={styles.fieldContainer}>
                      <Text style={styles.fieldLabel}>Brothers Married</Text>
                      <Text style={styles.fieldColon}>:</Text>
                      <Text style={styles.fieldValue}>{family.brothersMarried}</Text>
                    </View>
                  )}
                  
                  {shouldDisplay(family.sistersMarried) && (
                    <View style={styles.fieldContainer}>
                      <Text style={styles.fieldLabel}>Sisters Married</Text>
                      <Text style={styles.fieldColon}>:</Text>
                      <Text style={styles.fieldValue}>{family.sistersMarried}</Text>
                    </View>
                  )}
                  
                  {shouldDisplay(family.familyType) && (
                    <View style={styles.fieldContainer}>
                      <Text style={styles.fieldLabel}>Family Type</Text>
                      <Text style={styles.fieldColon}>:</Text>
                      <Text style={styles.fieldValue}>{family.familyType}</Text>
                    </View>
                  )}
                  
                  {shouldDisplay(family.familyValues) && (
                    <View style={styles.fieldContainer}>
                      <Text style={styles.fieldLabel}>Family Values</Text>
                      <Text style={styles.fieldColon}>:</Text>
                      <Text style={styles.fieldValue}>{family.familyValues}</Text>
                    </View>
                  )}
                  
                  {shouldDisplay(family.familyStatus) && (
                    <View style={styles.fieldContainer}>
                      <Text style={styles.fieldLabel}>Family Status</Text>
                      <Text style={styles.fieldColon}>:</Text>
                      <Text style={styles.fieldValue}>{family.familyStatus}</Text>
                    </View>
                  )}
                  
                  {shouldDisplay(family.nativePlace) && (
                    <View style={styles.fieldContainer}>
                      <Text style={styles.fieldLabel}>Native Place</Text>
                      <Text style={styles.fieldColon}>:</Text>
                      <Text style={styles.fieldValue}>{family.nativePlace}</Text>
                    </View>
                  )}
                  
                  {shouldDisplay(family.aboutFamily) && (
                    <View style={styles.fieldContainer}>
                      <Text style={styles.fieldLabel}>About Family</Text>
                      <Text style={styles.fieldColon}>:</Text>
                      <Text style={styles.fieldValue}>{family.aboutFamily}</Text>
                    </View>
                  )}
                  
                  {/* Custom Family Members */}
                  {shouldDisplay(family.customMembers) && 
                    family.customMembers?.map((member, index) => (
                      <View key={`${member.id}-${index}`} style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>{member.relation}</Text>
                        <Text style={styles.fieldColon}>:</Text>
                        <Text style={styles.fieldValue}>
                          {member.details.split('\n').map((line, i) => (
                            line ? (
                              <React.Fragment key={i}>
                                {line}
                                {i < member.details.split('\n').length - 1 && '\n'}
                              </React.Fragment>
                            ) : null
                          ))}
                        </Text>
                      </View>
                    ))}
                </View>
              </View>
              
              {/* Contact Information Section */}
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Contact Information</Text>
                <View>
                  {shouldDisplay(contact.mobileNumber) && (
                    <View style={styles.fieldContainer}>
                      <Text style={styles.fieldLabel}>Mobile Number</Text>
                      <Text style={styles.fieldColon}>:</Text>
                      <Text style={styles.fieldValue}>{contact.mobileNumber}</Text>
                    </View>
                  )}
                  
                  {shouldDisplay(contact.alternateNumber) && (
                    <View style={styles.fieldContainer}>
                      <Text style={styles.fieldLabel}>Alternate Number</Text>
                      <Text style={styles.fieldColon}>:</Text>
                      <Text style={styles.fieldValue}>{contact.alternateNumber}</Text>
                    </View>
                  )}
                  
                  {shouldDisplay(contact.email) && (
                    <View style={styles.fieldContainer}>
                      <Text style={styles.fieldLabel}>Email</Text>
                      <Text style={styles.fieldColon}>:</Text>
                      <Text style={styles.fieldValue}>{contact.email}</Text>
                    </View>
                  )}
                  
                  {shouldDisplay(contact.address) && (
                    <View style={styles.fieldContainer}>
                      <Text style={styles.fieldLabel}>Address</Text>
                      <Text style={styles.fieldColon}>:</Text>
                      <Text style={styles.fieldValue}>{contact.address}</Text>
                    </View>
                  )}
                  
                  {shouldDisplay(contact.city) && (
                    <View style={styles.fieldContainer}>
                      <Text style={styles.fieldLabel}>City</Text>
                      <Text style={styles.fieldColon}>:</Text>
                      <Text style={styles.fieldValue}>{contact.city}</Text>
                    </View>
                  )}
                  
                  {shouldDisplay(contact.state) && (
                    <View style={styles.fieldContainer}>
                      <Text style={styles.fieldLabel}>State</Text>
                      <Text style={styles.fieldColon}>:</Text>
                      <Text style={styles.fieldValue}>{contact.state}</Text>
                    </View>
                  )}
                  
                  {shouldDisplay(contact.country) && (
                    <View style={styles.fieldContainer}>
                      <Text style={styles.fieldLabel}>Country</Text>
                      <Text style={styles.fieldColon}>:</Text>
                      <Text style={styles.fieldValue}>{contact.country}</Text>
                    </View>
                  )}
                  
                  {shouldDisplay(contact.pincode) && (
                    <View style={styles.fieldContainer}>
                      <Text style={styles.fieldLabel}>Pincode</Text>
                      <Text style={styles.fieldColon}>:</Text>
                      <Text style={styles.fieldValue}>{contact.pincode}</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
            
            {/* Image column */}
         
          </View>
        </View>
      </Page>
    </Document>
    )
  }





  return (
    <div className='max-w-2xl mx-auto border-2 border-red-500'>
    <div className='w-full h-[750px]'>
      <PDFViewer >
      <TetemplateCode biodata={biodata} />
      </PDFViewer>
    </div>
    </div>
  );
};

export default Template1;