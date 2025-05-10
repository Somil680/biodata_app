// app/page.tsx
import BiodataCard from '@/components/BiodataCard';

export default function Page() {
  const sampleData = {
    personalInfo: {
      fullName: 'Mahesh Narayan',
      dateOfBirth: '15/08/1990',
      height: '5\'10"',
      weight: '70 kg',
      qualification: 'B.Tech',
      occupation: 'Software Engineer',
      religion: 'Hindu',
      caste: 'General',
      motherTongue: 'Hindi'
    },
    familyInfo: {
      fatherName: 'Prakash Narayan',
      fatherOccupation: 'Businessman',
      motherName: 'Neeta Narayan',
      motherOccupation: 'Homemaker',
      siblings: 'One Sister'
    },
    contactInfo: {
      address: 'A-42, Sector 16, Noida, UP',
      mobileNumber: '+91 9876543210',
      email: 'mahesh.narayan@example.com'
    },
    profileImage: '/path/to/profile/image.jpg' // Replace with actual image path
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      {/* <BiodataCard 
        personalInfo={sampleData.personalInfo}
        familyInfo={sampleData.familyInfo}
        contactInfo={sampleData.contactInfo}
        profileImage={sampleData.profileImage}
      /> */}
    </main>
  );
}