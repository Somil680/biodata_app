import React, { useRef } from 'react'
import { StyleSheet } from '@react-pdf/renderer'
import Image from 'next/image'
import { useBiodata } from '@/context/BiodataContext'

// Helper function to check if a value should be displayed
const shouldDisplay = (value: unknown): boolean => {
  if (value === undefined || value === null || value === '') return false
  if (typeof value === 'string') return value.trim().length > 0
  if (Array.isArray(value)) return value.length > 0
  return true
}

// Create styles

// The main Template component for PDF
const Template1PDF = ({}) => {
  const { biodata } = useBiodata()
  const contentFontSize = 16
  const headingFontSize = 24
  const styles = StyleSheet.create({
    page: {
      color: biodata.settings.primaryColor || '#000',
      fontFamily: biodata.settings.fontFamily || 'Arial',
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
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
      right: 0,
      top: 0,
      width: 200,
      height: 250,
    },
    sectionTitle: {
      fontSize: headingFontSize,
      fontWeight: 'bold',
      marginBottom: 5,
      paddingBottom: 5,
    },
    fieldContainer: {
      display: 'flex',
      flexDirection: 'row',
      fontSize: contentFontSize,
      marginBottom: 2,
      lineHeight: 1.5,
    },
    fieldLabel: {
      width: 130,
      fontWeight: 'medium',
      fontSize: contentFontSize,
      lineHeight: 1.5,
    },
    fieldColon: {
      width: 10,
      fontWeight: 'medium',
    },
    fieldValue: {
      flex: 1,
      fontSize: contentFontSize,
      lineHeight: 1.5,
    },
    sectionContainer: {
      marginBottom: 15,
      position: 'relative',
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      opacity: 0.1,
      zIndex: -1,
    },
    idolContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
    },
    tagline: {
      fontWeight: 'semibold',
      fontSize: 15,
    },
    idolimage: {
      width: 40,
    },
  })
  // Use optional chaining to handle potentially undefined values
  const personal = biodata?.personalInformation || {}
  const family = biodata?.familyInformation || {}
  const contact = biodata?.contactInformation || {}
  const previewRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <main
        id="biodata"
        ref={previewRef}
        className="bg-transparent"
        style={{
          backgroundColor: 'transparent',
          color: biodata.settings.primaryColor || '#000',
          fontFamily: biodata.settings.fontFamily || 'Arial',
        }} // fallback
      >
        <section style={styles.page}>
          <section style={styles.container}>
            <section style={styles.idolContainer}>
              <Image
                alt="idol"
                width={200}
                height={20}
                style={styles.idolimage}
                src={biodata.settings.idolImage || ''} // Use the correct path to your image or fallback
                // style={styles.imageColumn}
              />
              <span style={styles.tagline}>{biodata.settings.tagline}</span>
            </section>

            {/* Personal Information Section */}
            <section style={styles.sectionContainer}>
              <div>
                <span style={styles.sectionTitle}>Personal Information</span>

                {shouldDisplay(personal.fullName) && (
                  <div style={styles.fieldContainer}>
                    <span style={styles.fieldLabel}>Full Name</span>
                    <span style={styles.fieldColon}>:</span>
                    <span style={styles.fieldValue}>{String(personal.fullName)}</span>
                  </div>
                )}

                {shouldDisplay(personal.dateOfBirth) && (
                  <div style={styles.fieldContainer}>
                    <span style={styles.fieldLabel}>Date of Birth</span>
                    <span style={styles.fieldColon}>:</span>
                    <span style={styles.fieldValue}>
                      {String(personal.dateOfBirth)}
                    </span>
                  </div>
                )}

                {shouldDisplay(personal.age) && (
                  <div style={styles.fieldContainer}>
                    <span style={styles.fieldLabel}>Age</span>
                    <span style={styles.fieldColon}>:</span>
                    <span style={styles.fieldValue}>{String(personal.age)}</span>
                  </div>
                )}
                {shouldDisplay(personal.timeOfBirth) && (
                  <div style={styles.fieldContainer}>
                    <span style={styles.fieldLabel}>Time of Birth</span>
                    <span style={styles.fieldColon}>:</span>
                    <span style={styles.fieldValue}>
                      {String(personal.timeOfBirth)}
                    </span>
                  </div>
                )}

                {shouldDisplay(personal.placeOfBirth) && (
                  <div style={styles.fieldContainer}>
                    <span style={styles.fieldLabel}>Place of Birth</span>
                    <span style={styles.fieldColon}>:</span>
                    <span style={styles.fieldValue}>
                      {String(personal.placeOfBirth)}
                    </span>
                  </div>
                )}
                {shouldDisplay(personal.height) && (
                  <div style={styles.fieldContainer}>
                    <span style={styles.fieldLabel}>Height</span>
                    <span style={styles.fieldColon}>:</span>
                    <span style={styles.fieldValue}>{String(personal.height)}</span>
                  </div>
                )}

                {shouldDisplay(personal.weight) && (
                  <div style={styles.fieldContainer}>
                    <span style={styles.fieldLabel}>Weight</span>
                    <span style={styles.fieldColon}>:</span>
                    <span style={styles.fieldValue}>{String(personal.weight)}</span>
                  </div>
                )}

                {shouldDisplay(personal.bloodGroup) && (
                  <div style={styles.fieldContainer}>
                    <span style={styles.fieldLabel}>Blood Group</span>
                    <span style={styles.fieldColon}>:</span>
                    <span style={styles.fieldValue}>
                      {String(personal.bloodGroup)}
                    </span>
                  </div>
                )}

                {shouldDisplay(personal.maritalStatus) && (
                  <div style={styles.fieldContainer}>
                    <span style={styles.fieldLabel}>Marital Status</span>
                    <span style={styles.fieldColon}>:</span>
                    <span style={styles.fieldValue}>
                      {String(personal.maritalStatus)}
                    </span>
                  </div>
                )}

                {shouldDisplay(personal.religion) && (
                  <div style={styles.fieldContainer}>
                    <span style={styles.fieldLabel}>Religion</span>
                    <span style={styles.fieldColon}>:</span>
                    <span style={styles.fieldValue}>{String(personal.religion)}</span>
                  </div>
                )}

                {shouldDisplay(personal.education) && (
                  <div style={styles.fieldContainer}>
                    <span style={styles.fieldLabel}>Education</span>
                    <span style={styles.fieldColon}>:</span>
                    <span style={styles.fieldValue}>
                      {String(personal.education)}
                    </span>
                  </div>
                )}

                {shouldDisplay(personal.profession) && (
                  <div style={styles.fieldContainer}>
                    <span style={styles.fieldLabel}>Profession</span>
                    <span style={styles.fieldColon}>:</span>
                    <span style={styles.fieldValue}>
                      {String(personal.profession)}
                    </span>
                  </div>
                )}

                {shouldDisplay(personal.annualIncome) && (
                  <div style={styles.fieldContainer}>
                    <span style={styles.fieldLabel}>Annual Income</span>
                    <span style={styles.fieldColon}>:</span>
                    <span style={styles.fieldValue}>
                      {String(personal.annualIncome)}
                    </span>
                  </div>
                )}

                {shouldDisplay(personal.caste) && (
                  <div style={styles.fieldContainer}>
                    <span style={styles.fieldLabel}>Caste</span>
                    <span style={styles.fieldColon}>:</span>
                    <span style={styles.fieldValue}>{String(personal.caste)}</span>
                  </div>
                )}

                {shouldDisplay(personal.subCaste) && (
                  <div style={styles.fieldContainer}>
                    <span style={styles.fieldLabel}>Sub-Caste</span>
                    <span style={styles.fieldColon}>:</span>
                    <span style={styles.fieldValue}>{String(personal.subCaste)}</span>
                  </div>
                )}

                {shouldDisplay(personal.gothra) && (
                  <div style={styles.fieldContainer}>
                    <span style={styles.fieldLabel}>Gothra</span>
                    <span style={styles.fieldColon}>:</span>
                    <span style={styles.fieldValue}>{String(personal.gothra)}</span>
                  </div>
                )}

                {shouldDisplay(personal.rashi) && (
                  <div style={styles.fieldContainer}>
                    <span style={styles.fieldLabel}>Rashi</span>
                    <span style={styles.fieldColon}>:</span>
                    <span style={styles.fieldValue}>{String(personal.rashi)}</span>
                  </div>
                )}

                {shouldDisplay(personal.nakshatra) && (
                  <div style={styles.fieldContainer}>
                    <span style={styles.fieldLabel}>Nakshatra</span>
                    <span style={styles.fieldColon}>:</span>
                    <span style={styles.fieldValue}>
                      {String(personal.nakshatra)}
                    </span>
                  </div>
                )}

                {shouldDisplay(personal.manglik) && (
                  <div style={styles.fieldContainer}>
                    <span style={styles.fieldLabel}>Manglik</span>
                    <span style={styles.fieldColon}>:</span>
                    <span style={styles.fieldValue}>{String(personal.manglik)}</span>
                  </div>
                )}

                {shouldDisplay(personal.diet) && (
                  <div style={styles.fieldContainer}>
                    <span style={styles.fieldLabel}>Diet</span>
                    <span style={styles.fieldColon}>:</span>
                    <span style={styles.fieldValue}>{String(personal.diet)}</span>
                  </div>
                )}

                {shouldDisplay(personal.hobbies) && (
                  <div style={styles.fieldContainer}>
                    <span style={styles.fieldLabel}>Hobbies</span>
                    <span style={styles.fieldColon}>:</span>
                    <span style={styles.fieldValue}>
                      {String(
                        Array.isArray(personal.hobbies)
                          ? personal.hobbies.join(', ')
                          : personal.hobbies
                      )}
                    </span>
                  </div>
                )}

                {shouldDisplay(personal.languages) && (
                  <div style={styles.fieldContainer}>
                    <span style={styles.fieldLabel}>Languages</span>
                    <span style={styles.fieldColon}>:</span>
                    <span style={styles.fieldValue}>
                      {String(
                        Array.isArray(personal.languages)
                          ? personal.languages.join(', ')
                          : personal.languages
                      )}
                    </span>
                  </div>
                )}

                {shouldDisplay(personal.aboutMe) && (
                  <div style={styles.fieldContainer}>
                    <span style={styles.fieldLabel}>About Me</span>
                    <span style={styles.fieldColon}>:</span>
                    <span style={styles.fieldValue}>{String(personal.aboutMe)}</span>
                  </div>
                )}
              </div>
              {biodata.settings.profilePhoto &&
                biodata.settings.profilePhoto.trim() !== '' && (
                  <div style={styles.imageColumn}>
                    <Image
                      alt=""
                      width={200}
                    height={250}
                    quality={100}
                      src={biodata.settings.profilePhoto}
                    />
                  </div>
                )}
            </section>

            {/* Family Information Section */}
            <section style={styles.sectionContainer}>
              <span style={styles.sectionTitle}>Family Information</span>

              {shouldDisplay(family.familyType) && (
                <div style={styles.fieldContainer}>
                  <span style={styles.fieldLabel}>Family Type</span>
                  <span style={styles.fieldColon}>:</span>
                  <span style={styles.fieldValue}>{String(family.familyType)}</span>
                </div>
              )}

              {shouldDisplay(family.familyValues) && (
                <div style={styles.fieldContainer}>
                  <span style={styles.fieldLabel}>Family Values</span>
                  <span style={styles.fieldColon}>:</span>
                  <span style={styles.fieldValue}>{String(family.familyValues)}</span>
                </div>
              )}

              {shouldDisplay(family.familyStatus) && (
                <div style={styles.fieldContainer}>
                  <span style={styles.fieldLabel}>Family Status</span>
                  <span style={styles.fieldColon}>:</span>
                  <span style={styles.fieldValue}>{String(family.familyStatus)}</span>
                </div>
              )}

              {shouldDisplay(family.nativePlace) && (
                <div style={styles.fieldContainer}>
                  <span style={styles.fieldLabel}>Native Place</span>
                  <span style={styles.fieldColon}>:</span>
                  <span style={styles.fieldValue}>{String(family.nativePlace)}</span>
                </div>
              )}

              {shouldDisplay(family.aboutFamily) && (
                <div style={styles.fieldContainer}>
                  <span style={styles.fieldLabel}>About Family</span>
                  <span style={styles.fieldColon}>:</span>
                  <span style={styles.fieldValue}>{String(family.aboutFamily)}</span>
                </div>
              )}

              {shouldDisplay(family.customMembers) &&
                family.customMembers?.map((member, index) => {
                  if (!member || !member.relation || !member.details)
                    return null
                  return (
                    <div
                      key={`${member.id || index}-${index}`}
                      style={styles.fieldContainer}
                    >
                      <span style={styles.fieldLabel}>{String(member.relation)}</span>
                      <span style={styles.fieldColon}>:</span>
                      <div style={styles.fieldValue}>
                        {member.details
                          .split('\n')
                          .map((line, lineIndex) =>
                            line.trim() ? <div key={lineIndex}>{line}</div> : null
                          )}
                      </div>
                    </div>
                  )
                })}
            </section>

            {/* Contact Information Section */}
            <section style={styles.sectionContainer}>
              <span style={styles.sectionTitle}>Contact Information</span>

              {shouldDisplay(contact.mobileNumber) && (
                <div style={styles.fieldContainer}>
                  <span style={styles.fieldLabel}>Mobile Number</span>
                  <span style={styles.fieldColon}>:</span>
                  <span style={styles.fieldValue}>
                    {String(contact.mobileNumber)}
                  </span>
                </div>
              )}

              {shouldDisplay(contact.alternateNumber) && (
                <div style={styles.fieldContainer}>
                  <span style={styles.fieldLabel}>Alternate Number</span>
                  <span style={styles.fieldColon}>:</span>
                  <span style={styles.fieldValue}>
                    {String(contact.alternateNumber)}
                  </span>
                </div>
              )}

              {shouldDisplay(contact.email) && (
                <div style={styles.fieldContainer}>
                  <span style={styles.fieldLabel}>Email</span>
                  <span style={styles.fieldColon}>:</span>
                  <span style={styles.fieldValue}>{String(contact.email)}</span>
                </div>
              )}

              {shouldDisplay(contact.address) && (
                <div style={styles.fieldContainer}>
                  <span style={styles.fieldLabel}>Address</span>
                  <span style={styles.fieldColon}>:</span>
                  <span style={styles.fieldValue}>{String(contact.address)}</span>
                </div>
              )}

              {shouldDisplay(contact.city) && (
                <div style={styles.fieldContainer}>
                  <span style={styles.fieldLabel}>City</span>
                  <span style={styles.fieldColon}>:</span>
                  <span style={styles.fieldValue}>{String(contact.city)}</span>
                </div>
              )}

              {shouldDisplay(contact.state) && (
                <div style={styles.fieldContainer}>
                  <span style={styles.fieldLabel}>State</span>
                  <span style={styles.fieldColon}>:</span>
                  <span style={styles.fieldValue}>{String(contact.state)}</span>
                </div>
              )}

              {shouldDisplay(contact.country) && (
                <div style={styles.fieldContainer}>
                  <span style={styles.fieldLabel}>Country</span>
                  <span style={styles.fieldColon}>:</span>
                  <span style={styles.fieldValue}>{String(contact.country)}</span>
                </div>
              )}

              {shouldDisplay(contact.pincode) && (
                <div style={styles.fieldContainer}>
                  <span style={styles.fieldLabel}>Pincode</span>
                  <span style={styles.fieldColon}>:</span>
                  <span style={styles.fieldValue}>{String(contact.pincode)}</span>
                </div>
              )}
            </section>
          </section>
        </section>
      </main>
    </>
  )
}

export default Template1PDF
