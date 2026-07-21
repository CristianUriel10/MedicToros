import { usePublications } from '../context/publications-context'
import { ArticlesSection } from '../components/articles/articles-section'
import { ArchiveSection } from '../components/archive/archive-section'
import { EditorialTeamSection } from '../components/editorial-team/editorial-team-section'
import { FirebaseStatusBanner } from '../components/firebase-status/firebase-status-banner'
import { Footer } from '../components/footer/footer'
import { Header } from '../components/header/header'
import { HeroSection } from '../components/hero/hero-section'
import { PostersSection } from '../components/posters/posters-section'
import { SubmissionSection } from '../components/submission/submission-section'

/**
 * Página principal del portal MedicToros
 * @returns {JSX.Element} Landing page completa
 */
export function PortalPage() {
  const {
    articles,
    posters,
    isLoadingArticles,
    isLoadingPosters,
    isUploading,
    error,
    isFirebaseEnabled,
    uploadArticle,
  } = usePublications()

  return (
    <div className="min-h-screen bg-navy-900">
      <Header />
      <FirebaseStatusBanner
        isFirebaseEnabled={isFirebaseEnabled}
        error={error}
      />
      <main>
        <HeroSection />
        <ArticlesSection journals={articles} isLoading={isLoadingArticles} />
        <PostersSection posters={posters} isLoading={isLoadingPosters} />
        <ArchiveSection />
        <SubmissionSection
          onUpload={uploadArticle}
          isUploading={isUploading}
          isFirebaseEnabled={isFirebaseEnabled}
        />
        <EditorialTeamSection />
      </main>
      <Footer />
    </div>
  )
}
