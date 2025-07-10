import HeroSection from '@/components/Homepage/HeroSection'
import FeaturesGrid from '@/components/Homepage/FeaturesGrid'
import HowItWorksSection from '@/components/Homepage/HowItWorksSection'
import TemplatesSection from '@/components/Homepage/TemplatesSection'
import FAQSection from '@/components/Homepage/FAQSection'
import StatsSection from '@/components/Homepage/StatsSection'
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* <Navbar /> */}
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <FeaturesGrid />
        <HowItWorksSection />
        <TemplatesSection />
        <FAQSection />
      </main>
      {/* <Footer /> */}
    </div>
  )
}
