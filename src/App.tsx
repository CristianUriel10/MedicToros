import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PublicationsProvider } from './context/publications-context'
import { PortalPage } from './pages/portal-page'
import { ReaderPage } from './pages/reader-page'

function App() {
  return (
    <BrowserRouter>
      <PublicationsProvider>
        <Routes>
          <Route path="/" element={<PortalPage />} />
          <Route path="/articulos/:id" element={<ReaderPage kind="articulos" />} />
          <Route path="/carteles/:id" element={<ReaderPage kind="carteles" />} />
        </Routes>
      </PublicationsProvider>
    </BrowserRouter>
  )
}

export default App
