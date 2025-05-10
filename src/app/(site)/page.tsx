// import {homeSvg as HomeSvg} from '@/lib/SVG/index'
// import Link from 'next/link'

// export default function Home() {
//   return (
//     <div className="min-h-screen">
//       {/* Header */}
//       <header className="fixed top-0 w-full bg-white shadow-sm z-50">
//         <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-[#D40000]">Biodata Maker</h1>
//           <Link href="/login" className="px-6 py-2 border border-[#D40000] text-[#D40000] rounded-full hover:bg-[#D40000] hover:text-white transition-colors">
//             Login
//           </Link>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="pt-24 pb-16 bg-gradient-to-b from-white to-gray-50">
//         <div className="container mx-auto px-4">
//           <div className="flex flex-col md:flex-row items-center justify-between gap-12">
//             <div className="flex-1 space-y-6">
//               <h2 className="text-4xl md:text-5xl font-bold leading-tight">
//                 Make a Biodata which people can read
//               </h2>
//               <p className="text-xl text-gray-600">1,440 Biodata created</p>
//               <div className="flex gap-4">
//                 <button className="px-8 py-3 bg-[#D40000] text-white rounded-full hover:bg-[#b30000] transition-colors">
//                   Start now
//                 </button>
//                 <button className="px-8 py-3 border border-[#D40000] text-[#D40000] rounded-full hover:bg-[#D40000] hover:text-white transition-colors">
//                   Create Biodata
//                 </button>
//               </div>
//             </div>
//             <div className="flex-1">
//               <HomeSvg />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-16 bg-white">
//         <div className="container mx-auto px-4">
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {/* Feature 1 */}
//             <div className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
//               <h3 className="text-xl font-semibold mb-3">Export in image or PDF</h3>
//               <p className="text-gray-600">Add your personal, family and contact information. Export images or PDF in high resolution.</p>
//             </div>

//             {/* Feature 2 */}
//             <div className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
//               <h3 className="text-xl font-semibold mb-3">Live preview</h3>
//               <p className="text-gray-600">See a preview of how your biodata looks. Choose from a variety of carefully crafted templates.</p>
//             </div>

//             {/* Feature 3 */}
//             <div className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
//               <h3 className="text-xl font-semibold mb-3">Share and save variants</h3>
//               <p className="text-gray-600">Login and save different variants to share at different platforms.</p>
//             </div>

//             {/* Feature 4 */}
//             <div className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
//               <h3 className="text-xl font-semibold mb-3">No data stored</h3>
//               <p className="text-gray-600">Worried about privacy? Biodata details never leave your device since we do all the work locally.</p>
//             </div>

//             {/* Feature 5 */}
//             <div className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
//               <h3 className="text-xl font-semibold mb-3">Select from multiple templates</h3>
//               <p className="text-gray-600">Choose from a variety of professionally designed templates to create your perfect biodata.</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Community Section */}
//       <section className="py-16 bg-gray-50">
//         <div className="container mx-auto px-4 text-center">
//           <h2 className="text-3xl font-bold mb-6">Join our community</h2>
//           <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
//             Join our community to find suitable matches and profiles.
//           </p>
//           <button className="px-8 py-3 bg-[#D40000] text-white rounded-full hover:bg-[#b30000] transition-colors">
//             Join community
//           </button>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white py-12">
//         <div className="container mx-auto px-4">
//           <div className="grid md:grid-cols-4 gap-8">
//             <div>
//               <h3 className="text-xl font-bold mb-4">Biodata Maker</h3>
//               <p className="text-gray-400">
//                 Welcome to our online matrimonial biodata maker! We are a team of dedicated professionals with a passion for making the process of creating a biodata simple, easy, and enjoyable.
//               </p>
//             </div>
//             <div>
//               <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
//               <ul className="space-y-2">
//                 <li><Link href="/about" className="text-gray-400 hover:text-white">About</Link></li>
//                 <li><Link href="/terms" className="text-gray-400 hover:text-white">Terms of service</Link></li>
//                 <li><Link href="/privacy" className="text-gray-400 hover:text-white">Privacy policy</Link></li>
//                 <li><Link href="/refund" className="text-gray-400 hover:text-white">Refund policy</Link></li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="text-lg font-semibold mb-4">Contact</h4>
//               <ul className="space-y-2">
//                 <li className="text-gray-400">Email: contact@biodatamaker.com</li>
//                 <li className="text-gray-400">Phone: +1 234 567 890</li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="text-lg font-semibold mb-4">Security</h4>
//               <p className="text-gray-400">This website is SSL Secured and Encrypted</p>
//             </div>
//           </div>
//           <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
//             <p>Copyright 2025 - biodatamaker.com</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }
import HeroSection from '@/components/Homepage/HeroSection'
import FeaturesGrid from '@/components/Homepage/FeaturesGrid'
import TemplatesSection from '@/components/Homepage/TemplatesSection'
import CommunitySection from '@/components/Homepage/CommunitySection'
import FAQSection from '@/components/Homepage/FAQSection'
import Footer from '@/components/Homepage/Footer'
import BiodataCard from '@/components/BiodataCard'

export default function Home() {
      const sampleData = {
  fullName: 'Mahesh Narayan',
  dateOfBirth: '15/08/1990',
  timeOfBirth: '10:00 AM',
  rashi: 'Leo',
  height: '5\'10"',
  education: 'B.Tech',
  occupation: 'Software Engineer',
  annualIncome: '12 LPA',
  passportName: 'Mahesh Narayan',
  careerObjective: 'To excel in software engineering.',
  religion: 'Hindu',
  caste: 'General',
  nakshatra: 'Rohini',
  motherTongue: 'Hindi',
  fatherName: 'Prakash Narayan',
  fatherOccupation: 'Businessman',
  motherName: 'Neeta Narayan',
  motherOccupation: 'Homemaker',
  siblingName: 'One Sister',
  contactNumber: '+91 9876543210',
  fatherContact: '+91 9876543211',
  familyAddress: 'A-42, Sector 16, Noida, UP',
  photoUrl: '/path/to/profile/image.jpg'
};

  return (
    <div className="bg-[#fafafa] min-h-screen flex flex-col">
      {/* <Header /> */}
      <main className="flex-1">
        <HeroSection />
        <FeaturesGrid />
        <TemplatesSection />
        <CommunitySection />
        <FAQSection />
      </main>
          <Footer />
           <main className="min-h-screen bg-gray-100 p-6">
        <BiodataCard data={sampleData} />
      </main>
    </div>
  )
}