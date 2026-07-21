import { AboutSection } from '../components/about/about-section'
import { ContactSection } from '../components/contact/contact-section'
import { Footer } from '../components/footer/footer'
import { Header } from '../components/header/header'
import { HeroSection } from '../components/hero/hero-section'
import { ServicesSection } from '../components/services/services-section'

/**
 * Página principal de la landing de Medic Toro
 * @returns {JSX.Element} Landing page completa
 */
export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
