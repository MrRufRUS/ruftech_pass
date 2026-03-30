import { useState } from 'react'
import { useDocumentMeta } from '@/shared/i18n'
import { LandingHeader } from '@/components/landing-header'
import { SignupModal } from '@/components/signup-modal'
import { HeroSection } from './sections/hero-section'
import { FeaturesSection } from './sections/features-section'
import { CtaSection } from './sections/cta-section'
import { AboutSection } from './sections/about-section'

export function HomePage() {
  useDocumentMeta('home')
  const [signupOpen, setSignupOpen] = useState(false)

  return (
    <>
      <LandingHeader />
      <HeroSection />
      <FeaturesSection />
      <CtaSection onSignupClick={() => setSignupOpen(true)} />
      <SignupModal open={signupOpen} onClose={() => setSignupOpen(false)} />
      <AboutSection />
    </>
  )
}
