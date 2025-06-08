import React from 'react'
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from '@react-pdf/renderer'
import { Biodata } from '@/lib/type'

// Convert your background image to base64 or use a public URL
// Option 1: Use a public URL instead of local import
const BACKGROUND_IMAGE_URL = '/images/template-previews/template_2.png'

// Option 2: Base64 encoded image (recommended for consistent loading)
// const BACKGROUND_IMAGE_BASE64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...' // Your base64 string here

// Helper function
const shouldDisplay = (value: unknown): boolean => {
  if (value === undefined || value === null || value === '') return false
  if (typeof value === 'string') return value.trim().length > 0
  if (Array.isArray(value)) return value.length > 0
  return true
}

// Styles for PDF
const styles = StyleSheet.create({
  page: {
    position: 'relative',
    padding: 0,
    margin: 0,
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  contentContainer: {
    position: 'relative',
    zIndex: 1,
    padding: 40,
    backgroundColor: 'transparent',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  idolImage: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  tagline: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sectionContainer: {
    marginBottom: 20,
    position: 'relative',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    borderBottom: '2px solid #000',
    paddingBottom: 5,
  },
  fieldContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 6,
  },
  fieldLabel: {
    width: 150,
    fontSize: 12,
    fontWeight: 'medium',
  },
  fieldColon: {
    width: 20,
    fontSize: 12,
  },
  fieldValue: {
    flex: 1,
    fontSize: 12,
  },
  profileImageContainer: {
    position: 'absolute',
    right: 20,
    top: 0,
    width: 150,
    height: 200,
    border: '2px solid #D40000',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
})

// PDF Document Component
const BiodataPDFDocument: React.FC<{ biodata: Biodata }> = ({ biodata }) => {
  console.log('🚀 ~ biodata:', biodata)
  const personal = biodata?.personalInformation || {}
  const family = biodata?.familyInformation || {}
  const contact = biodata?.contactInformation || {}

  // Function to get background image source
  const getBackgroundImageSrc = () => {
    // Option 1: Use public URL
    return BACKGROUND_IMAGE_URL

    // Option 2: Use base64 (uncomment if using base64)
    // return BACKGROUND_IMAGE_BASE64

    // Option 3: Use the original approach with error handling
    // try {
    //   return bg?.src || bg || BACKGROUND_IMAGE_URL
    // } catch (error) {
    //   console.warn('Background image not found, using fallback')
    //   return BACKGROUND_IMAGE_URL
    // }
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Background Image - Fixed positioning */}
        {biodata.settings.background && (
          <View style={styles.backgroundContainer}>
            <Image
              src={getBackgroundImageSrc()}
              style={styles.backgroundImage}
              cache={false} // Disable caching to ensure fresh load
            />
          </View>
        )}

        {/* Content Container with proper z-index */}
        <View style={styles.contentContainer}>
          <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
              {biodata.settings.idolImage && (
                <Image
                  src={biodata.settings.idolImage}
                  style={styles.idolImage}
                />
              )}
              <Text style={styles.tagline}>
                {biodata.settings.tagline ?? ''}
              </Text>
            </View>

            {/* Personal Information Section */}
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Personal Information</Text>

              {/* Profile Image - Positioned Absolutely */}
              {biodata.settings.profilePhoto && (
                <View style={styles.profileImageContainer}>
                  <Image
                    src={biodata.settings.profilePhoto}
                    style={styles.profileImage}
                  />
                </View>
              )}

              {shouldDisplay(personal.fullName) && (
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>Full Name</Text>
                  <Text style={styles.fieldColon}>:</Text>
                  <Text style={styles.fieldValue}>
                    {String(personal.fullName)}
                  </Text>
                </View>
              )}

              {shouldDisplay(personal.dateOfBirth) && (
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>Date of Birth</Text>
                  <Text style={styles.fieldColon}>:</Text>
                  <Text style={styles.fieldValue}>
                    {String(personal.dateOfBirth)}
                  </Text>
                </View>
              )}

              {shouldDisplay(personal.age) && (
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>Age</Text>
                  <Text style={styles.fieldColon}>:</Text>
                  <Text style={styles.fieldValue}>{String(personal.age)}</Text>
                </View>
              )}

              {shouldDisplay(personal.timeOfBirth) && (
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>Time of Birth</Text>
                  <Text style={styles.fieldColon}>:</Text>
                  <Text style={styles.fieldValue}>
                    {String(personal.timeOfBirth)}
                  </Text>
                </View>
              )}

              {shouldDisplay(personal.placeOfBirth) && (
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>Place of Birth</Text>
                  <Text style={styles.fieldColon}>:</Text>
                  <Text style={styles.fieldValue}>
                    {String(personal.placeOfBirth)}
                  </Text>
                </View>
              )}

              {shouldDisplay(personal.height) && (
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>Height</Text>
                  <Text style={styles.fieldColon}>:</Text>
                  <Text style={styles.fieldValue}>
                    {String(personal.height)}
                  </Text>
                </View>
              )}

              {shouldDisplay(personal.weight) && (
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>Weight</Text>
                  <Text style={styles.fieldColon}>:</Text>
                  <Text style={styles.fieldValue}>
                    {String(personal.weight)}
                  </Text>
                </View>
              )}

              {shouldDisplay(personal.bloodGroup) && (
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>Blood Group</Text>
                  <Text style={styles.fieldColon}>:</Text>
                  <Text style={styles.fieldValue}>
                    {String(personal.bloodGroup)}
                  </Text>
                </View>
              )}

              {shouldDisplay(personal.maritalStatus) && (
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>Marital Status</Text>
                  <Text style={styles.fieldColon}>:</Text>
                  <Text style={styles.fieldValue}>
                    {String(personal.maritalStatus)}
                  </Text>
                </View>
              )}

              {shouldDisplay(personal.religion) && (
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>Religion</Text>
                  <Text style={styles.fieldColon}>:</Text>
                  <Text style={styles.fieldValue}>
                    {String(personal.religion)}
                  </Text>
                </View>
              )}

              {shouldDisplay(personal.education) && (
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>Education</Text>
                  <Text style={styles.fieldColon}>:</Text>
                  <Text style={styles.fieldValue}>
                    {String(personal.education)}
                  </Text>
                </View>
              )}

              {shouldDisplay(personal.profession) && (
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>Profession</Text>
                  <Text style={styles.fieldColon}>:</Text>
                  <Text style={styles.fieldValue}>
                    {String(personal.profession)}
                  </Text>
                </View>
              )}

              {shouldDisplay(personal.annualIncome) && (
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>Annual Income</Text>
                  <Text style={styles.fieldColon}>:</Text>
                  <Text style={styles.fieldValue}>
                    {String(personal.annualIncome)}
                  </Text>
                </View>
              )}

              {shouldDisplay(personal.caste) && (
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>Caste</Text>
                  <Text style={styles.fieldColon}>:</Text>
                  <Text style={styles.fieldValue}>
                    {String(personal.caste)}
                  </Text>
                </View>
              )}

              {shouldDisplay(personal.subCaste) && (
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>Sub-Caste</Text>
                  <Text style={styles.fieldColon}>:</Text>
                  <Text style={styles.fieldValue}>
                    {String(personal.subCaste)}
                  </Text>
                </View>
              )}

              {shouldDisplay(personal.gothra) && (
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>Gothra</Text>
                  <Text style={styles.fieldColon}>:</Text>
                  <Text style={styles.fieldValue}>
                    {String(personal.gothra)}
                  </Text>
                </View>
              )}

              {shouldDisplay(personal.hobbies) && (
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>Hobbies</Text>
                  <Text style={styles.fieldColon}>:</Text>
                  <Text style={styles.fieldValue}>
                    {Array.isArray(personal.hobbies)
                      ? personal.hobbies.join(', ')
                      : String(personal.hobbies)}
                  </Text>
                </View>
              )}

              {shouldDisplay(personal.languages) && (
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>Languages</Text>
                  <Text style={styles.fieldColon}>:</Text>
                  <Text style={styles.fieldValue}>
                    {Array.isArray(personal.languages)
                      ? personal.languages.join(', ')
                      : String(personal.languages)}
                  </Text>
                </View>
              )}
            </View>

            {/* Family Information Section */}
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Family Information</Text>

              {shouldDisplay(family.familyType) && (
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>Family Type</Text>
                  <Text style={styles.fieldColon}>:</Text>
                  <Text style={styles.fieldValue}>
                    {String(family.familyType)}
                  </Text>
                </View>
              )}

              {shouldDisplay(family.familyValues) && (
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>Family Values</Text>
                  <Text style={styles.fieldColon}>:</Text>
                  <Text style={styles.fieldValue}>
                    {String(family.familyValues)}
                  </Text>
                </View>
              )}

              {shouldDisplay(family.familyStatus) && (
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>Family Status</Text>
                  <Text style={styles.fieldColon}>:</Text>
                  <Text style={styles.fieldValue}>
                    {String(family.familyStatus)}
                  </Text>
                </View>
              )}

              {shouldDisplay(family.nativePlace) && (
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>Native Place</Text>
                  <Text style={styles.fieldColon}>:</Text>
                  <Text style={styles.fieldValue}>
                    {String(family.nativePlace)}
                  </Text>
                </View>
              )}

              {/* Custom Family Members */}
              {shouldDisplay(family.customMembers) &&
                family.customMembers?.map((member, index) => {
                  if (!member || !member.relation || !member.details)
                    return null
                  return (
                    <View
                      key={`${member.id || index}-${index}`}
                      style={styles.fieldContainer}
                    >
                      <Text style={styles.fieldLabel}>
                        {String(member.relation)}
                      </Text>
                      <Text style={styles.fieldColon}>:</Text>
                      <Text style={styles.fieldValue}>
                        {String(member.details)}
                      </Text>
                    </View>
                  )
                })}
            </View>

            {/* Contact Information Section */}
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Contact Information</Text>

              {shouldDisplay(contact.mobileNumber) && (
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>Mobile Number</Text>
                  <Text style={styles.fieldColon}>:</Text>
                  <Text style={styles.fieldValue}>
                    {String(contact.mobileNumber)}
                  </Text>
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
                  <Text style={styles.fieldValue}>
                    {String(contact.address)}
                  </Text>
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
                  <Text style={styles.fieldValue}>
                    {String(contact.country)}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}

export default BiodataPDFDocument

// import React from 'react'
// import {
//   Document,
//   Page,
//   Text,
//   View,
//   StyleSheet,
// //   PDFDownloadLink,
//   Image,
// //   Font,
// } from '@react-pdf/renderer'
// import { Biodata } from '@/lib/type'
// import bg from '../../../public/images/template-previews/template_2.png'

// // Register fonts if needed
// // Font.register({
// //   family: 'Roboto',
// //   src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf',
// // })

// // Helper function
// const shouldDisplay = (value: unknown): boolean => {
//   if (value === undefined || value === null || value === '') return false
//   if (typeof value === 'string') return value.trim().length > 0
//   if (Array.isArray(value)) return value.length > 0
//   return true
// }

// // Styles for PDF
// const styles = StyleSheet.create({
//   page: {
//     // padding: 40,
//     // backgroundColor: '#ffffff',
//     position: 'relative',
//   },
//   backgroundContainer: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: '100%',
//     height: '100%',
//     // opacity: 0.1,
//     zIndex: -1,
//   },
//   backgroundImage: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     width: '100%',
//     height: '100%',
//     // opacity: 0.1,
//     // zIndex: -1,
//     // width: '100%',
//     // height: '100%',
//   },
//   container: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: 10,
//   },
//   header: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   idolImage: {
//     width: 60,
//     height: 60,
//     marginBottom: 10,
//   },
//   tagline: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   sectionContainer: {
//     marginBottom: 20,
//     position: 'relative',
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     borderBottom: '2px solid #000',
//     paddingBottom: 5,
//   },
//   fieldContainer: {
//     display: 'flex',
//     flexDirection: 'row',
//     marginBottom: 6,
//   },
//   fieldLabel: {
//     width: 150,
//     fontSize: 12,
//     fontWeight: 'medium',
//   },
//   fieldColon: {
//     width: 20,
//     fontSize: 12,
//   },
//   fieldValue: {
//     flex: 1,
//     fontSize: 12,
//   },
//   profileImageContainer: {
//     position: 'absolute',
//     right: 20,
//     top: 0,
//     width: 150,
//     height: 200,
//     border: '2px solid #D40000',
//   },
//   profileImage: {
//     width: '100%',
//     height: '100%',
//     objectFit: 'cover',
//   },
// })

// // PDF Document Component
// const BiodataPDFDocument: React.FC<{ biodata: Biodata }> = ({ biodata }) => {
//   console.log("🚀 ~ biodjcv nyfdguymyata:", biodata)
//   const personal = biodata?.personalInformation || {}
//   const family = biodata?.familyInformation || {}
//   const contact = biodata?.contactInformation || {}

//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         {/* Background Image */}
//         {biodata.settings.background && (
//           <View fixed style={styles.backgroundContainer}>
//           <Image
//             fixed
//             src={bg.src}
//             style={styles.backgroundImage}
//           />
//           </View>
//         )}

//         {/* Header Section */}
//         <View style={styles.header}>
//           {biodata.settings.idolImage && (
//             <Image src={biodata.settings.idolImage} style={styles.idolImage} />
//           )}
//           {/* {biodata.settings.tagline && (
//           )} */}
//           <Text style={styles.tagline}>{biodata.settings.tagline  ?? ""}</Text>
//         </View>

//         {/* Personal Information Section */}
//         <View style={styles.sectionContainer}>
//           <Text style={styles.sectionTitle}>Personal Information</Text>

//           {/* Profile Image - Positioned Absolutely */}
//           {biodata.settings.profilePhoto && (
//             <View style={styles.profileImageContainer}>
//               <Image
//                 src={biodata.settings.profilePhoto}
//                 style={styles.profileImage}
//               />
//             </View>
//           )}

//           {shouldDisplay(personal.fullName) && (
//             <View style={styles.fieldContainer}>
//               <Text style={styles.fieldLabel}>Full Name</Text>
//               <Text style={styles.fieldColon}>:</Text>
//               <Text style={styles.fieldValue}>{String(personal.fullName)}</Text>
//             </View>
//           )}

//           {shouldDisplay(personal.dateOfBirth) && (
//             <View style={styles.fieldContainer}>
//               <Text style={styles.fieldLabel}>Date of Birth</Text>
//               <Text style={styles.fieldColon}>:</Text>
//               <Text style={styles.fieldValue}>
//                 {String(personal.dateOfBirth)}
//               </Text>
//             </View>
//           )}

//           {shouldDisplay(personal.age) && (
//             <View style={styles.fieldContainer}>
//               <Text style={styles.fieldLabel}>Age</Text>
//               <Text style={styles.fieldColon}>:</Text>
//               <Text style={styles.fieldValue}>{String(personal.age)}</Text>
//             </View>
//           )}

//           {shouldDisplay(personal.timeOfBirth) && (
//             <View style={styles.fieldContainer}>
//               <Text style={styles.fieldLabel}>Time of Birth</Text>
//               <Text style={styles.fieldColon}>:</Text>
//               <Text style={styles.fieldValue}>
//                 {String(personal.timeOfBirth)}
//               </Text>
//             </View>
//           )}

//           {shouldDisplay(personal.placeOfBirth) && (
//             <View style={styles.fieldContainer}>
//               <Text style={styles.fieldLabel}>Place of Birth</Text>
//               <Text style={styles.fieldColon}>:</Text>
//               <Text style={styles.fieldValue}>
//                 {String(personal.placeOfBirth)}
//               </Text>
//             </View>
//           )}

//           {shouldDisplay(personal.height) && (
//             <View style={styles.fieldContainer}>
//               <Text style={styles.fieldLabel}>Height</Text>
//               <Text style={styles.fieldColon}>:</Text>
//               <Text style={styles.fieldValue}>{String(personal.height)}</Text>
//             </View>
//           )}

//           {shouldDisplay(personal.weight) && (
//             <View style={styles.fieldContainer}>
//               <Text style={styles.fieldLabel}>Weight</Text>
//               <Text style={styles.fieldColon}>:</Text>
//               <Text style={styles.fieldValue}>{String(personal.weight)}</Text>
//             </View>
//           )}

//           {shouldDisplay(personal.bloodGroup) && (
//             <View style={styles.fieldContainer}>
//               <Text style={styles.fieldLabel}>Blood Group</Text>
//               <Text style={styles.fieldColon}>:</Text>
//               <Text style={styles.fieldValue}>
//                 {String(personal.bloodGroup)}
//               </Text>
//             </View>
//           )}

//           {shouldDisplay(personal.maritalStatus) && (
//             <View style={styles.fieldContainer}>
//               <Text style={styles.fieldLabel}>Marital Status</Text>
//               <Text style={styles.fieldColon}>:</Text>
//               <Text style={styles.fieldValue}>
//                 {String(personal.maritalStatus)}
//               </Text>
//             </View>
//           )}

//           {shouldDisplay(personal.religion) && (
//             <View style={styles.fieldContainer}>
//               <Text style={styles.fieldLabel}>Religion</Text>
//               <Text style={styles.fieldColon}>:</Text>
//               <Text style={styles.fieldValue}>{String(personal.religion)}</Text>
//             </View>
//           )}

//           {shouldDisplay(personal.education) && (
//             <View style={styles.fieldContainer}>
//               <Text style={styles.fieldLabel}>Education</Text>
//               <Text style={styles.fieldColon}>:</Text>
//               <Text style={styles.fieldValue}>
//                 {String(personal.education)}
//               </Text>
//             </View>
//           )}

//           {shouldDisplay(personal.profession) && (
//             <View style={styles.fieldContainer}>
//               <Text style={styles.fieldLabel}>Profession</Text>
//               <Text style={styles.fieldColon}>:</Text>
//               <Text style={styles.fieldValue}>
//                 {String(personal.profession)}
//               </Text>
//             </View>
//           )}

//           {shouldDisplay(personal.annualIncome) && (
//             <View style={styles.fieldContainer}>
//               <Text style={styles.fieldLabel}>Annual Income</Text>
//               <Text style={styles.fieldColon}>:</Text>
//               <Text style={styles.fieldValue}>
//                 {String(personal.annualIncome)}
//               </Text>
//             </View>
//           )}

//           {shouldDisplay(personal.caste) && (
//             <View style={styles.fieldContainer}>
//               <Text style={styles.fieldLabel}>Caste</Text>
//               <Text style={styles.fieldColon}>:</Text>
//               <Text style={styles.fieldValue}>{String(personal.caste)}</Text>
//             </View>
//           )}

//           {shouldDisplay(personal.subCaste) && (
//             <View style={styles.fieldContainer}>
//               <Text style={styles.fieldLabel}>Sub-Caste</Text>
//               <Text style={styles.fieldColon}>:</Text>
//               <Text style={styles.fieldValue}>{String(personal.subCaste)}</Text>
//             </View>
//           )}

//           {shouldDisplay(personal.gothra) && (
//             <View style={styles.fieldContainer}>
//               <Text style={styles.fieldLabel}>Gothra</Text>
//               <Text style={styles.fieldColon}>:</Text>
//               <Text style={styles.fieldValue}>{String(personal.gothra)}</Text>
//             </View>
//           )}

//           {shouldDisplay(personal.hobbies) && (
//             <View style={styles.fieldContainer}>
//               <Text style={styles.fieldLabel}>Hobbies</Text>
//               <Text style={styles.fieldColon}>:</Text>
//               <Text style={styles.fieldValue}>
//                 {Array.isArray(personal.hobbies)
//                   ? personal.hobbies.join(', ')
//                   : String(personal.hobbies)}
//               </Text>
//             </View>
//           )}

//           {shouldDisplay(personal.languages) && (
//             <View style={styles.fieldContainer}>
//               <Text style={styles.fieldLabel}>Languages</Text>
//               <Text style={styles.fieldColon}>:</Text>
//               <Text style={styles.fieldValue}>
//                 {Array.isArray(personal.languages)
//                   ? personal.languages.join(', ')
//                   : String(personal.languages)}
//               </Text>
//             </View>
//           )}
//         </View>

//         {/* Family Information Section */}
//         <View style={styles.sectionContainer}>
//           <Text style={styles.sectionTitle}>Family Information</Text>

//           {shouldDisplay(family.familyType) && (
//             <View style={styles.fieldContainer}>
//               <Text style={styles.fieldLabel}>Family Type</Text>
//               <Text style={styles.fieldColon}>:</Text>
//               <Text style={styles.fieldValue}>{String(family.familyType)}</Text>
//             </View>
//           )}

//           {shouldDisplay(family.familyValues) && (
//             <View style={styles.fieldContainer}>
//               <Text style={styles.fieldLabel}>Family Values</Text>
//               <Text style={styles.fieldColon}>:</Text>
//               <Text style={styles.fieldValue}>
//                 {String(family.familyValues)}
//               </Text>
//             </View>
//           )}

//           {shouldDisplay(family.familyStatus) && (
//             <View style={styles.fieldContainer}>
//               <Text style={styles.fieldLabel}>Family Status</Text>
//               <Text style={styles.fieldColon}>:</Text>
//               <Text style={styles.fieldValue}>
//                 {String(family.familyStatus)}
//               </Text>
//             </View>
//           )}

//           {shouldDisplay(family.nativePlace) && (
//             <View style={styles.fieldContainer}>
//               <Text style={styles.fieldLabel}>Native Place</Text>
//               <Text style={styles.fieldColon}>:</Text>
//               <Text style={styles.fieldValue}>
//                 {String(family.nativePlace)}
//               </Text>
//             </View>
//           )}

//           {/* Custom Family Members */}
//           {shouldDisplay(family.customMembers) &&
//             family.customMembers?.map((member, index) => {
//               if (!member || !member.relation || !member.details) return null
//               return (
//                 <View
//                   key={`${member.id || index}-${index}`}
//                   style={styles.fieldContainer}
//                 >
//                   <Text style={styles.fieldLabel}>
//                     {String(member.relation)}
//                   </Text>
//                   <Text style={styles.fieldColon}>:</Text>
//                   <Text style={styles.fieldValue}>
//                     {String(member.details)}
//                   </Text>
//                 </View>
//               )
//             })}
//         </View>

//         {/* Contact Information Section */}
//         <View style={styles.sectionContainer}>
//           <Text style={styles.sectionTitle}>Contact Information</Text>

//           {shouldDisplay(contact.mobileNumber) && (
//             <View style={styles.fieldContainer}>
//               <Text style={styles.fieldLabel}>Mobile Number</Text>
//               <Text style={styles.fieldColon}>:</Text>
//               <Text style={styles.fieldValue}>
//                 {String(contact.mobileNumber)}
//               </Text>
//             </View>
//           )}

//           {shouldDisplay(contact.email) && (
//             <View style={styles.fieldContainer}>
//               <Text style={styles.fieldLabel}>Email</Text>
//               <Text style={styles.fieldColon}>:</Text>
//               <Text style={styles.fieldValue}>{String(contact.email)}</Text>
//             </View>
//           )}

//           {shouldDisplay(contact.address) && (
//             <View style={styles.fieldContainer}>
//               <Text style={styles.fieldLabel}>Address</Text>
//               <Text style={styles.fieldColon}>:</Text>
//               <Text style={styles.fieldValue}>{String(contact.address)}</Text>
//             </View>
//           )}

//           {shouldDisplay(contact.city) && (
//             <View style={styles.fieldContainer}>
//               <Text style={styles.fieldLabel}>City</Text>
//               <Text style={styles.fieldColon}>:</Text>
//               <Text style={styles.fieldValue}>{String(contact.city)}</Text>
//             </View>
//           )}

//           {shouldDisplay(contact.state) && (
//             <View style={styles.fieldContainer}>
//               <Text style={styles.fieldLabel}>State</Text>
//               <Text style={styles.fieldColon}>:</Text>
//               <Text style={styles.fieldValue}>{String(contact.state)}</Text>
//             </View>
//           )}

//           {shouldDisplay(contact.country) && (
//             <View style={styles.fieldContainer}>
//               <Text style={styles.fieldLabel}>Country</Text>
//               <Text style={styles.fieldColon}>:</Text>
//               <Text style={styles.fieldValue}>{String(contact.country)}</Text>
//             </View>
//           )}
//         </View>
//       </Page>
//     </Document>
//   )
// }
// export default BiodataPDFDocument

// import jsPDF from 'jspdf'
// import { Biodata } from '@/lib/type'

// // ============================================================================
// // IMAGE UTILITIES
// // ============================================================================

// const loadImageAsBase64 = async (
//   imageSrc: string,
//   imageType: string
// ): Promise<string | null> => {
//   if (!imageSrc?.trim()) {
//     console.log(`❌ ${imageType}: No image source provided`)
//     return null
//   }

//   console.log(`🔄 ${imageType}: Loading image:`, imageSrc)

//   try {
//     return new Promise((resolve) => {
//       const img = new Image()
//       img.crossOrigin = 'anonymous'

//       img.onload = () => {
//         try {
//           const canvas = document.createElement('canvas')
//           const ctx = canvas.getContext('2d')

//           if (!ctx) {
//             console.log(`❌ ${imageType}: Canvas context failed`)
//             resolve(null)
//             return
//           }

//           canvas.width = img.width
//           canvas.height = img.height
//           ctx.drawImage(img, 0, 0)

//           const dataURL = canvas.toDataURL('image/jpeg', 0.8)
//           console.log(
//             `✅ ${imageType}: Successfully loaded (${img.width}x${img.height})`
//           )
//           resolve(dataURL)
//         } catch (error) {
//           console.error(`❌ ${imageType}: Canvas conversion failed:`, error)
//           resolve(null)
//         }
//       }

//       img.onerror = () => {
//         console.error(`❌ ${imageType}: Failed to load:`, imageSrc)
//         resolve(null)
//       }

//       img.src = imageSrc
//     })
//   } catch (error) {
//     console.error(`❌ ${imageType}: Loading error:`, error)
//     return null
//   }
// }

// // ============================================================================
// // LAYOUT CONFIGURATION
// // ============================================================================

// interface LayoutConfig {
//   page: {
//     width: number
//     height: number
//     margin: number
//   }
//   fonts: {
//     title: number
//     sectionTitle: number
//     fieldLabel: number
//     fieldValue: number
//   }
//   spacing: {
//     lineHeight: number
//     sectionSpacing: number
//     fieldSpacing: number
//   }
//   images: {
//     idol: { width: number; height: number }
//     profile: { width: number; height: number }
//   }
//   layout: {
//     maxTextWidth: number
//     labelWidth: number
//     colonWidth: number
//   }
// }

// const createLayoutConfig = (
//   pageWidth: number,
//   pageHeight: number
// ): LayoutConfig => ({
//   page: {
//     width: pageWidth,
//     height: pageHeight,
//     margin: 15,
//   },
//   fonts: {
//     title: 12,
//     sectionTitle: 14,
//     fieldLabel: 10,
//     fieldValue: 10,
//   },
//   spacing: {
//     lineHeight: 5,
//     sectionSpacing: 12,
//     fieldSpacing: 3,
//   },
//   images: {
//     idol: { width: 25, height: 25 },
//     profile: { width: 35, height: 45 },
//   },
//   layout: {
//     maxTextWidth: pageWidth - 15 * 2 - 50, // Reserve space for profile image
//     labelWidth: 50,
//     colonWidth: 5,
//   },
// })

// // ============================================================================
// // PDF LAYOUT FUNCTIONS
// // ============================================================================

// class PDFLayoutBuilder {
//   private doc: jsPDF
//   private config: LayoutConfig
//   private currentY: number
//   private backgroundImageData: string | null = null

//   constructor(doc: jsPDF, config: LayoutConfig) {
//     this.doc = doc
//     this.config = config
//     this.currentY = config.page.margin
//   }

//   // Background Management
//   setBackgroundImage(imageData: string | null) {
//     this.backgroundImageData = imageData
//   }

//   addBackgroundToCurrentPage() {
//     if (this.backgroundImageData) {
//       try {
//         console.log('🖼️ Adding background to page...')
//         this.doc.addImage(
//           this.backgroundImageData,
//           'JPEG',
//           0,
//           0,
//           this.config.page.width,
//           this.config.page.height,
//           undefined,
//           'SLOW'
//         )
//         console.log('✅ Background added successfully')
//       } catch (error) {
//         console.error('❌ Failed to add background:', error)
//       }
//     }
//   }

//   // Page Management
//   checkNewPage(requiredSpace: number) {
//     const availableSpace =
//       this.config.page.height - this.config.page.margin - 10
//     if (this.currentY + requiredSpace > availableSpace) {
//       console.log('📄 Creating new page...')
//       this.doc.addPage()
//       this.addBackgroundToCurrentPage()
//       this.currentY = this.config.page.margin
//     }
//   }

//   // Header Section Layout
//   addHeader(title: string, idolImageData: string | null) {
//     console.log('📝 Adding header section...')

//     // Add idol image
//     if (idolImageData) {
//       this.addIdolImage(idolImageData)
//     }

//     // Add title
//     this.addTitle(title)

//     // Add spacing after header
//     this.currentY += this.config.spacing.sectionSpacing
//   }

//   private addIdolImage(imageData: string) {
//     const { width, height } = this.config.images.idol
//     const x = (this.config.page.width - width) / 2
//     const y = this.currentY

//     console.log(`🔄 Adding idol image at (${x}, ${y})`)

//     this.doc.addImage(imageData, 'JPEG', x, y, width, height, undefined, 'SLOW')
//     this.currentY += height + 8

//     console.log('✅ Idol image added successfully')
//   }

//   private addTitle(title: string) {
//     this.doc.setFontSize(this.config.fonts.title)
//     this.doc.setFont('helvetica', 'bold')

//     const textWidth = this.doc.getTextWidth(title)
//     const x = (this.config.page.width - textWidth) / 2

//     this.doc.text(title, x, this.currentY)
//     this.currentY += this.config.spacing.lineHeight + 5
//   }

//   // Profile Image Layout
//   addProfileImage(imageData: string | null) {
//     if (!imageData) return

//     const { width, height } = this.config.images.profile
//     const x = this.config.page.width - this.config.page.margin - width
//     const y = this.currentY

//     console.log(`🔄 Adding profile image at (${x}, ${y})`)

//     this.doc.addImage(imageData, 'JPEG', x, y, width, height, undefined, 'SLOW')

//     // Add border
//     this.doc.setLineWidth(0.5)
//     this.doc.setDrawColor(0, 0, 0)
//     this.doc.rect(x, y, width, height)

//     console.log('✅ Profile image added successfully')
//   }

//   // Section Layout
//   addSectionTitle(title: string) {
//     this.checkNewPage(
//       this.config.spacing.sectionSpacing + this.config.spacing.lineHeight
//     )

//     this.currentY += this.config.spacing.sectionSpacing

//     this.doc.setFontSize(this.config.fonts.sectionTitle)
//     this.doc.setFont('helvetica', 'bold')
//     this.doc.text(title, this.config.page.margin, this.currentY)

//     // Optional: Add underline
//     // this.doc.setLineWidth(0.5)
//     // this.doc.line(this.config.page.margin, this.currentY + 2, this.config.page.margin + 80, this.currentY + 2)

//     this.currentY += this.config.spacing.lineHeight + 8
//   }

//   // Field Layout
//   addField(label: string, value: string) {
//     if (!value?.trim()) return

//     this.doc.setFontSize(this.config.fonts.fieldValue)
//     this.doc.setFont('helvetica', 'normal')

//     // Split long text into multiple lines
//     const valueLines = this.doc.splitTextToSize(
//       value,
//       this.config.layout.maxTextWidth
//     )
//     const requiredSpace =
//       this.config.spacing.lineHeight * (valueLines.length + 0.5)

//     this.checkNewPage(requiredSpace)

//     // Add label (bold)
//     this.doc.setFont('helvetica', 'bold')
//     this.doc.text(`${label}:`, this.config.page.margin, this.currentY)

//     // Add value (normal)
//     this.doc.setFont('helvetica', 'normal')
//     this.doc.text(
//       valueLines,
//       this.config.page.margin + this.config.layout.labelWidth,
//       this.currentY
//     )

//     this.currentY +=
//       this.config.spacing.lineHeight * valueLines.length +
//       this.config.spacing.fieldSpacing
//   }

//   // Get current Y position
//   getCurrentY(): number {
//     return this.currentY
//   }

//   // Set current Y position
//   setCurrentY(y: number) {
//     this.currentY = y
//   }
// }

// // ============================================================================
// // PDF LAYOUT MANAGER
// // ============================================================================

// const buildPDFLayout = async (
//   doc: jsPDF,
//   biodata: Biodata,
//   backgroundImageData: string | null,
//   idolImageData: string | null,
//   profileImageData: string | null
// ) => {
//   console.log('🎨 Building PDF layout...')

//   const config = createLayoutConfig(
//     doc.internal.pageSize.getWidth(),
//     doc.internal.pageSize.getHeight()
//   )

//   const layout = new PDFLayoutBuilder(doc, config)

//   // Set background
//   layout.setBackgroundImage(backgroundImageData)
//   layout.addBackgroundToCurrentPage()

//   // Build header section
//   const title = biodata.settings?.tagline || 'Biodata'
//   layout.addHeader(title, idolImageData)

//   // Add profile image
//   layout.addProfileImage(profileImageData)

//   // Build content sections
//   buildPersonalInformationSection(layout, biodata.personalInformation)
//   buildFamilyInformationSection(layout, biodata.familyInformation)
//   buildContactInformationSection(layout, biodata.contactInformation)

//   console.log('✅ PDF layout completed')
// }

// // ============================================================================
// // CONTENT SECTION BUILDERS
// // ============================================================================

// import { PersonalInformation } from '@/lib/type'

// const buildPersonalInformationSection = (
//   layout: PDFLayoutBuilder,
//   personal: PersonalInformation
// ) => {
//   if (!personal || Object.keys(personal).length === 0) return

//   console.log('📝 Building Personal Information section...')
//   layout.addSectionTitle('Personal Information')

//   // Define field order and labels
//   const personalFields = [
//     { key: 'fullName', label: 'Full Name' },
//     { key: 'dateOfBirth', label: 'Date of Birth' },
//     { key: 'age', label: 'Age' },
//     { key: 'timeOfBirth', label: 'Time of Birth' },
//     { key: 'placeOfBirth', label: 'Place of Birth' },
//     { key: 'height', label: 'Height' },
//     { key: 'weight', label: 'Weight' },
//     { key: 'bloodGroup', label: 'Blood Group' },
//     { key: 'maritalStatus', label: 'Marital Status' },
//     { key: 'religion', label: 'Religion' },
//     { key: 'education', label: 'Education' },
//     { key: 'profession', label: 'Profession' },
//     { key: 'annualIncome', label: 'Annual Income' },
//     { key: 'caste', label: 'Caste' },
//     { key: 'subCaste', label: 'Sub-Caste' },
//     { key: 'gothra', label: 'Gothra' },
//     { key: 'rashi', label: 'Rashi' },
//     { key: 'nakshatra', label: 'Nakshatra' },
//     { key: 'manglik', label: 'Manglik' },
//     { key: 'diet', label: 'Diet' },
//     { key: 'aboutMe', label: 'About Me' },
//   ]

//   // Add regular fields
//   personalFields.forEach(({ key, label }) => {
//     const value = personal[key as keyof typeof personal]
//     if (value !== undefined && value !== null) {
//       layout.addField(label, String(value))
//     }
//   })

//   // Handle arrays specially
//   if (personal.hobbies) {
//     const hobbiesValue = Array.isArray(personal.hobbies)
//       ? personal.hobbies.join(', ')
//       : String(personal.hobbies)
//     layout.addField('Hobbies', hobbiesValue)
//   }

//   if (personal.languages) {
//     const languagesValue = Array.isArray(personal.languages)
//       ? personal.languages.join(', ')
//       : String(personal.languages)
//     layout.addField('Languages', languagesValue)
//   }
// }

// import { FamilyInformation } from '@/lib/type'

// const buildFamilyInformationSection = (
//   layout: PDFLayoutBuilder,
//   family: FamilyInformation
// ) => {
//   if (!family || Object.keys(family).length === 0) return

//   console.log('📝 Building Family Information section...')
//   layout.addSectionTitle('Family Information')

//   const familyFields = [
//     { key: 'familyType', label: 'Family Type' },
//     { key: 'familyValues', label: 'Family Values' },
//     { key: 'familyStatus', label: 'Family Status' },
//     { key: 'nativePlace', label: 'Native Place' },
//     { key: 'aboutFamily', label: 'About Family' },
//   ]

//   familyFields.forEach(({ key, label }) => {
//     const value = family[key as keyof typeof family]
//     if (value) {
//       layout.addField(label, String(value))
//     }
//   })

//   // Handle custom family members
//   if (family.customMembers && Array.isArray(family.customMembers)) {
//     family.customMembers.forEach((member: { relation: string; details: string }) => {
//       if (member?.relation && member?.details) {
//         const details = member.details.replace(/\n/g, '. ').trim()
//         layout.addField(member.relation, details)
//       }
//     })
//   }
// }

// import { ContactInformation } from '@/lib/type'

// const buildContactInformationSection = (
//   layout: PDFLayoutBuilder,
//   contact: ContactInformation
// ) => {
//   if (!contact || Object.keys(contact).length === 0) return

//   console.log('📝 Building Contact Information section...')
//   layout.addSectionTitle('Contact Information')

//   const contactFields = [
//     { key: 'mobileNumber', label: 'Mobile Number' },
//     { key: 'alternateNumber', label: 'Alternate Number' },
//     { key: 'email', label: 'Email' },
//     { key: 'address', label: 'Address' },
//     { key: 'city', label: 'City' },
//     { key: 'state', label: 'State' },
//     { key: 'country', label: 'Country' },
//     { key: 'pincode', label: 'Pincode' },
//   ]

//   contactFields.forEach(({ key, label }) => {
//     const value = contact[key as keyof typeof contact]
//     if (value) {
//       layout.addField(label, String(value))
//     }
//   })
// }

// // ============================================================================
// // MAIN PDF GENERATOR
// // ============================================================================

// export const generateSimpleBiodataPDF = async (
//   biodata: Biodata,
//   backgroundImage?: string,
//   filename: string = 'biodata.pdf'
// ) => {
//   console.log('🚀 Starting PDF generation...')
//   console.log('📝 Biodata settings:', biodata.settings)
//   console.log('🖼️ Background image:', backgroundImage)

//   // Initialize PDF document
//   const doc = new jsPDF({
//     orientation: 'portrait',
//     unit: 'mm',
//     format: 'a4',
//   })

//   console.log('📄 PDF dimensions:', {
//     width: doc.internal.pageSize.getWidth(),
//     height: doc.internal.pageSize.getHeight(),
//   })

//   // Load all images
//   const [backgroundImageData, idolImageData, profileImageData] =
//     await Promise.all([
//       backgroundImage
//         ? loadImageAsBase64(backgroundImage, 'BACKGROUND')
//         : Promise.resolve(null),
//       biodata.settings?.idolImage
//         ? loadImageAsBase64(biodata.settings.idolImage, 'IDOL')
//         : Promise.resolve(null),
//       biodata.settings?.profilePhoto
//         ? loadImageAsBase64(biodata.settings.profilePhoto, 'PROFILE')
//         : Promise.resolve(null),
//     ])

//   // Build the PDF layout
//   await buildPDFLayout(
//     doc,
//     biodata,
//     backgroundImageData,
//     idolImageData,
//     profileImageData
//   )

//   // Save the PDF
//   console.log('💾 Saving PDF...')
//   doc.save(filename)
//   console.log('✅ PDF generation completed!')
// }

// // ============================================================================
// // PUBLIC API
// // ============================================================================

// export const handleSimpleDownload = async (
//   biodata: Biodata,
//   backgroundImage?: string,
//   filename?: string
// ) => {
//   try {
//     console.log('🚀 handleSimpleDownload called with:', {
//       hasBackgroundImage: !!backgroundImage,
//       backgroundImage,
//       idolImage: biodata.settings?.idolImage,
//       profilePhoto: biodata.settings?.profilePhoto,
//       filename,
//     })

//     await generateSimpleBiodataPDF(
//       biodata,
//       backgroundImage,
//       filename || `${biodata.personalInformation?.fullName || 'biodata'}.pdf`
//     )
//   } catch (error) {
//     console.error('❌ Error generating PDF:', error)
//     // alert('Failed to generate PDF. Please try again.')
//   }
// }

// export const handleQuickDownload = (biodata: Biodata) => {
//   handleSimpleDownload(biodata)
// }
