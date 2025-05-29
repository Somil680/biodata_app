import React, { useRef } from 'react'
import { StyleSheet } from '@react-pdf/renderer'
import { Biodata } from '@/lib/type'
import Image from 'next/image'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
interface TemplateProps {
  biodata: Biodata
}

// Helper function to check if a value should be displayed
const shouldDisplay = (value: unknown): boolean => {
  if (value === undefined || value === null || value === '') return false
  if (typeof value === 'string') return value.trim().length > 0
  if (Array.isArray(value)) return value.length > 0
  return true
}

// Create styles
const styles = StyleSheet.create({
  page: {
    // backgroundImage: '../bg.png',
    // backgroundSize: 'cover',
    // backgroundPosition: 'center',
    padding: 10,
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
    top: 34,
    width: 200,
    height: 250,
    // border: '2px solid #D40000',
  },
  sectionTitle: {
    fontSize: 20,
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
    // color: '#000',
    fontSize: 16,
  },
  fieldColon: {
    width: 50,
    fontWeight: 'medium',
    // color: '#000',
  },
  fieldValue: {
    flex: 1,
    // color: '#111827',
    fontSize: 16,
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
})

// The main Template component for PDF
const Template1PDF: React.FC<TemplateProps> = ({ biodata }) => {
  // Use optional chaining to handle potentially undefined values
  const personal = biodata?.personalInformation || {}
  const family = biodata?.familyInformation || {}
  const contact = biodata?.contactInformation || {}
  const previewRef = useRef<HTMLDivElement>(null)
  
  const handleDownloadPDF = async () => {
    console.log("🚀 ~ handleDownloadPDFtt ~ !previewRef.curren:", !previewRef.current)
    if (!previewRef.current) return

    const canvas = await html2canvas(previewRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
    })

    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'pt', 'a4')
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
    pdf.save('preview.pdf')
  }
  return (
    <>
      <button
        onClick={handleDownloadPDF}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Download PDF
      </button>

      <div ref={previewRef}>
        <main id="biodata">
          <section
            style={styles.page}
            className={`font-[${biodata.settings.fontFamily}] text-[${biodata.settings.primaryColor}]`}
          >
            <section style={styles.container}>
              <section className="flex flex-col gap-1 items-center justify-center mb-4">
                <Image
                  alt="Profile"
                  width={60}
                  height={6}
                  src={biodata.settings.idolImage || ''} // Use the correct path to your image or fallback
                  // style={styles.imageColumn}
                />
                <p className="font-semibold">{biodata.settings.tagline}</p>
              </section>

              {/* Personal Information Section */}
              <section style={styles.sectionContainer}>
                <div>
                  <p style={styles.sectionTitle}>Personal Information</p>

                  {shouldDisplay(personal.fullName) && (
                    <div style={styles.fieldContainer}>
                      <p style={styles.fieldLabel}>Full Name</p>
                      <p style={styles.fieldColon}>:</p>
                      <p style={styles.fieldValue}>
                        {String(personal.fullName)}
                      </p>
                    </div>
                  )}

                  {shouldDisplay(personal.dateOfBirth) && (
                    <div style={styles.fieldContainer}>
                      <p style={styles.fieldLabel}>Date of Birth</p>
                      <p style={styles.fieldColon}>:</p>
                      <p style={styles.fieldValue}>
                        {String(personal.dateOfBirth)}
                      </p>
                    </div>
                  )}

                  {shouldDisplay(personal.age) && (
                    <div style={styles.fieldContainer}>
                      <p style={styles.fieldLabel}>Age</p>
                      <p style={styles.fieldColon}>:</p>
                      <p style={styles.fieldValue}>{String(personal.age)}</p>
                    </div>
                  )}
                  {shouldDisplay(personal.timeOfBirth) && (
                    <div style={styles.fieldContainer}>
                      <p style={styles.fieldLabel}>Time of Birth</p>
                      <p style={styles.fieldColon}>:</p>
                      <p style={styles.fieldValue}>
                        {String(personal.timeOfBirth)}
                      </p>
                    </div>
                  )}

                  {shouldDisplay(personal.placeOfBirth) && (
                    <div style={styles.fieldContainer}>
                      <p style={styles.fieldLabel}>Place of Birth</p>
                      <p style={styles.fieldColon}>:</p>
                      <p style={styles.fieldValue}>
                        {String(personal.placeOfBirth)}
                      </p>
                    </div>
                  )}
                  {shouldDisplay(personal.height) && (
                    <div style={styles.fieldContainer}>
                      <p style={styles.fieldLabel}>Height</p>
                      <p style={styles.fieldColon}>:</p>
                      <p style={styles.fieldValue}>{String(personal.height)}</p>
                    </div>
                  )}

                  {shouldDisplay(personal.weight) && (
                    <div style={styles.fieldContainer}>
                      <p style={styles.fieldLabel}>Weight</p>
                      <p style={styles.fieldColon}>:</p>
                      <p style={styles.fieldValue}>{String(personal.weight)}</p>
                    </div>
                  )}

                  {shouldDisplay(personal.bloodGroup) && (
                    <div style={styles.fieldContainer}>
                      <p style={styles.fieldLabel}>Blood Group</p>
                      <p style={styles.fieldColon}>:</p>
                      <p style={styles.fieldValue}>
                        {String(personal.bloodGroup)}
                      </p>
                    </div>
                  )}

                  {shouldDisplay(personal.maritalStatus) && (
                    <div style={styles.fieldContainer}>
                      <p style={styles.fieldLabel}>Marital Status</p>
                      <p style={styles.fieldColon}>:</p>
                      <p style={styles.fieldValue}>
                        {String(personal.maritalStatus)}
                      </p>
                    </div>
                  )}

                  {shouldDisplay(personal.religion) && (
                    <div style={styles.fieldContainer}>
                      <p style={styles.fieldLabel}>Religion</p>
                      <p style={styles.fieldColon}>:</p>
                      <p style={styles.fieldValue}>
                        {String(personal.religion)}
                      </p>
                    </div>
                  )}

                  {shouldDisplay(personal.education) && (
                    <div style={styles.fieldContainer}>
                      <p style={styles.fieldLabel}>Education</p>
                      <p style={styles.fieldColon}>:</p>
                      <p style={styles.fieldValue}>
                        {String(personal.education)}
                      </p>
                    </div>
                  )}

                  {shouldDisplay(personal.profession) && (
                    <div style={styles.fieldContainer}>
                      <p style={styles.fieldLabel}>Profession</p>
                      <p style={styles.fieldColon}>:</p>
                      <p style={styles.fieldValue}>
                        {String(personal.profession)}
                      </p>
                    </div>
                  )}

                  {shouldDisplay(personal.annualIncome) && (
                    <div style={styles.fieldContainer}>
                      <p style={styles.fieldLabel}>Annual Income</p>
                      <p style={styles.fieldColon}>:</p>
                      <p style={styles.fieldValue}>
                        {String(personal.annualIncome)}
                      </p>
                    </div>
                  )}

                  {shouldDisplay(personal.caste) && (
                    <div style={styles.fieldContainer}>
                      <p style={styles.fieldLabel}>Caste</p>
                      <p style={styles.fieldColon}>:</p>
                      <p style={styles.fieldValue}>{String(personal.caste)}</p>
                    </div>
                  )}

                  {shouldDisplay(personal.subCaste) && (
                    <div style={styles.fieldContainer}>
                      <p style={styles.fieldLabel}>Sub-Caste</p>
                      <p style={styles.fieldColon}>:</p>
                      <p style={styles.fieldValue}>
                        {String(personal.subCaste)}
                      </p>
                    </div>
                  )}

                  {shouldDisplay(personal.gothra) && (
                    <div style={styles.fieldContainer}>
                      <p style={styles.fieldLabel}>Gothra</p>
                      <p style={styles.fieldColon}>:</p>
                      <p style={styles.fieldValue}>{String(personal.gothra)}</p>
                    </div>
                  )}

                  {shouldDisplay(personal.rashi) && (
                    <div style={styles.fieldContainer}>
                      <p style={styles.fieldLabel}>Rashi</p>
                      <p style={styles.fieldColon}>:</p>
                      <p style={styles.fieldValue}>{String(personal.rashi)}</p>
                    </div>
                  )}

                  {shouldDisplay(personal.nakshatra) && (
                    <div style={styles.fieldContainer}>
                      <p style={styles.fieldLabel}>Nakshatra</p>
                      <p style={styles.fieldColon}>:</p>
                      <p style={styles.fieldValue}>
                        {String(personal.nakshatra)}
                      </p>
                    </div>
                  )}

                  {shouldDisplay(personal.manglik) && (
                    <div style={styles.fieldContainer}>
                      <p style={styles.fieldLabel}>Manglik</p>
                      <p style={styles.fieldColon}>:</p>
                      <p style={styles.fieldValue}>
                        {String(personal.manglik)}
                      </p>
                    </div>
                  )}

                  {shouldDisplay(personal.diet) && (
                    <div style={styles.fieldContainer}>
                      <p style={styles.fieldLabel}>Diet</p>
                      <p style={styles.fieldColon}>:</p>
                      <p style={styles.fieldValue}>{String(personal.diet)}</p>
                    </div>
                  )}

                  {shouldDisplay(personal.hobbies) && (
                    <div style={styles.fieldContainer}>
                      <p style={styles.fieldLabel}>Hobbies</p>
                      <p style={styles.fieldColon}>:</p>
                      <p style={styles.fieldValue}>
                        {String(
                          Array.isArray(personal.hobbies)
                            ? personal.hobbies.join(', ')
                            : personal.hobbies
                        )}
                      </p>
                    </div>
                  )}

                  {shouldDisplay(personal.languages) && (
                    <div style={styles.fieldContainer}>
                      <p style={styles.fieldLabel}>Languages</p>
                      <p style={styles.fieldColon}>:</p>
                      <p style={styles.fieldValue}>
                        {String(
                          Array.isArray(personal.languages)
                            ? personal.languages.join(', ')
                            : personal.languages
                        )}
                      </p>
                    </div>
                  )}

                  {shouldDisplay(personal.aboutMe) && (
                    <div style={styles.fieldContainer}>
                      <p style={styles.fieldLabel}>About Me</p>
                      <p style={styles.fieldColon}>:</p>
                      <p style={styles.fieldValue}>
                        {String(personal.aboutMe)}
                      </p>
                    </div>
                  )}
                </div>

                <div style={styles.imageColumn}>
                  <Image
                    alt="Profile"
                    width={200}
                    height={250}
                    src={biodata.settings.profilePhoto || ''} // Use the correct path to your image or fallback
                    // style={styles.imageColumn}
                  />
                </div>
              </section>

              {/* Family Information Section */}
              <section style={styles.sectionContainer}>
                <p style={styles.sectionTitle}>Family Information</p>

                {shouldDisplay(family.familyType) && (
                  <div style={styles.fieldContainer}>
                    <p style={styles.fieldLabel}>Family Type</p>
                    <p style={styles.fieldColon}>:</p>
                    <p style={styles.fieldValue}>{String(family.familyType)}</p>
                  </div>
                )}

                {shouldDisplay(family.familyValues) && (
                  <div style={styles.fieldContainer}>
                    <p style={styles.fieldLabel}>Family Values</p>
                    <p style={styles.fieldColon}>:</p>
                    <p style={styles.fieldValue}>
                      {String(family.familyValues)}
                    </p>
                  </div>
                )}

                {shouldDisplay(family.familyStatus) && (
                  <div style={styles.fieldContainer}>
                    <p style={styles.fieldLabel}>Family Status</p>
                    <p style={styles.fieldColon}>:</p>
                    <p style={styles.fieldValue}>
                      {String(family.familyStatus)}
                    </p>
                  </div>
                )}

                {shouldDisplay(family.nativePlace) && (
                  <div style={styles.fieldContainer}>
                    <p style={styles.fieldLabel}>Native Place</p>
                    <p style={styles.fieldColon}>:</p>
                    <p style={styles.fieldValue}>
                      {String(family.nativePlace)}
                    </p>
                  </div>
                )}

                {shouldDisplay(family.aboutFamily) && (
                  <div style={styles.fieldContainer}>
                    <p style={styles.fieldLabel}>About Family</p>
                    <p style={styles.fieldColon}>:</p>
                    <p style={styles.fieldValue}>
                      {String(family.aboutFamily)}
                    </p>
                  </div>
                )}

                {/* Custom Family Members */}

                {/* {shouldDisplay(family.customMembers) && 
                family.customMembers?.map((member, index) => (
                  <div key={member.id} className={fieldStyles.container}>
                    <span className={fieldStyles.label}>{member.relation}</span>
                    <span className={fieldStyles.colon}>:</span>
                    <span className={fieldStyles.value}>
                      {member.details.split('\n').map((line, i) => (
                        line ? (
                          <React.Fragment key={i}>
                            {line}
                            {i < member.details.split('\n').length - 1 && <br />}
                          </React.Fragment>
                        ) : null
                      ))}
                    </span>
                  </div>
                ))} */}

                {shouldDisplay(family.customMembers) &&
                  family.customMembers?.map((member, index) => {
                    if (!member || !member.relation || !member.details)
                      return null
                    return (
                      <div
                        key={`${member.id || index}-${index}`}
                        style={styles.fieldContainer}
                      >
                        <p style={styles.fieldLabel}>
                          {String(member.relation)}
                        </p>
                        <p style={styles.fieldColon}>:</p>
                        <div style={styles.fieldValue}>
                          {member.details
                            .split('\n')
                            .map((line, lineIndex) =>
                              line.trim() ? <p key={lineIndex}>{line}</p> : null
                            )}
                        </div>
                      </div>
                    )
                  })}
                {/* {shouldDisplay(family.customMembers) && 
              family.customMembers?.map((member, index) => {
                if (!member || !member.relation || !member.details) return null;
                return (
                  <div key={`${member.id || index}-${index}`} style={styles.fieldContainer}>
                    <p style={styles.fieldLabel}>{String(member.relation)}</p>
                    <p style={styles.fieldColon}>:</p>
                    <p style={styles.fieldValue}>
                    {member.details.split('\n').map((line, i) => (
                        line ? (
                          <p key={i}>
                            {line}
                            {i < member.details.split('\n').length - 1 && <br />}
                          </p>
                        ) : null
                      ))}
                    </p>
                  </div>
                );
              })} */}
              </section>

              {/* Contact Information Section */}
              <section style={styles.sectionContainer}>
                <p style={styles.sectionTitle}>Contact Information</p>

                {shouldDisplay(contact.mobileNumber) && (
                  <div style={styles.fieldContainer}>
                    <p style={styles.fieldLabel}>Mobile Number</p>
                    <p style={styles.fieldColon}>:</p>
                    <p style={styles.fieldValue}>
                      {String(contact.mobileNumber)}
                    </p>
                  </div>
                )}

                {shouldDisplay(contact.alternateNumber) && (
                  <div style={styles.fieldContainer}>
                    <p style={styles.fieldLabel}>Alternate Number</p>
                    <p style={styles.fieldColon}>:</p>
                    <p style={styles.fieldValue}>
                      {String(contact.alternateNumber)}
                    </p>
                  </div>
                )}

                {shouldDisplay(contact.email) && (
                  <div style={styles.fieldContainer}>
                    <p style={styles.fieldLabel}>Email</p>
                    <p style={styles.fieldColon}>:</p>
                    <p style={styles.fieldValue}>{String(contact.email)}</p>
                  </div>
                )}

                {shouldDisplay(contact.address) && (
                  <div style={styles.fieldContainer}>
                    <p style={styles.fieldLabel}>Address</p>
                    <p style={styles.fieldColon}>:</p>
                    <p style={styles.fieldValue}>{String(contact.address)}</p>
                  </div>
                )}

                {shouldDisplay(contact.city) && (
                  <div style={styles.fieldContainer}>
                    <p style={styles.fieldLabel}>City</p>
                    <p style={styles.fieldColon}>:</p>
                    <p style={styles.fieldValue}>{String(contact.city)}</p>
                  </div>
                )}

                {shouldDisplay(contact.state) && (
                  <div style={styles.fieldContainer}>
                    <p style={styles.fieldLabel}>State</p>
                    <p style={styles.fieldColon}>:</p>
                    <p style={styles.fieldValue}>{String(contact.state)}</p>
                  </div>
                )}

                {shouldDisplay(contact.country) && (
                  <div style={styles.fieldContainer}>
                    <p style={styles.fieldLabel}>Country</p>
                    <p style={styles.fieldColon}>:</p>
                    <p style={styles.fieldValue}>{String(contact.country)}</p>
                  </div>
                )}

                {shouldDisplay(contact.pincode) && (
                  <div style={styles.fieldContainer}>
                    <p style={styles.fieldLabel}>Pincode</p>
                    <p style={styles.fieldColon}>:</p>
                    <p style={styles.fieldValue}>{String(contact.pincode)}</p>
                  </div>
                )}
              </section>
            </section>
          </section>
        </main>
      </div>
    </>
  )
}

export default Template1PDF
