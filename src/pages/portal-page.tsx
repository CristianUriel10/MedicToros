import { useJournals } from '../hooks/use-journals'
import { ArticlesSection } from '../components/articles/articles-section'
import { ArchiveSection } from '../components/archive/archive-section'
import { EditorialTeamSection } from '../components/editorial-team/editorial-team-section'
import { FirebaseStatusBanner } from '../components/firebase-status/firebase-status-banner'
import { Footer } from '../components/footer/footer'
import { Header } from '../components/header/header'
import { HeroSection } from '../components/hero/hero-section'
import { SubmissionSection } from '../components/submission/submission-section'
import { SubscriptionSection } from '../components/subscription/subscription-section'

/**
 * Página principal del portal MedicToros
 * @returns {JSX.Element} Landing page completa
 */
export function PortalPage() {
  const {
    journals,
    isLoading,
    isUploading,
    error,
    isFirebaseEnabled,
    uploadJournal,
  } = useJournals()

  return (
    <div className="min-h-screen bg-navy-900">
      <Header />
      <FirebaseStatusBanner
        isFirebaseEnabled={isFirebaseEnabled}
        error={error}
      />
      <main>
        <HeroSection />
        <ArticlesSection journals={journals} isLoading={isLoading} />
        <ArchiveSection />
        <SubmissionSection
          onUpload={uploadJournal}
          isUploading={isUploading}
          isFirebaseEnabled={isFirebaseEnabled}
        />
        <EditorialTeamSection />
        <SubscriptionSection />
      </main>
      <Footer />
    </div>
  )
}
