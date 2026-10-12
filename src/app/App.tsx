import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { HomePage } from '../pages/HomePage';
import { WorkPage } from '../pages/WorkPage';
import { ApproachPage } from '../pages/ApproachPage';
import { WritingPage } from '../pages/WritingPage';
import { DirectionPage } from '../pages/DirectionPage';
import { CredentialsPage } from '../pages/CredentialsPage';
import { ContactPage } from '../pages/ContactPage';
import { NotFoundPage } from '../pages/NotFoundPage';

export default function App() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return <><a className="skip-link" href="#main">Skip to content</a><SiteHeader /><Routes>
    <Route path="/" element={<HomePage />} /><Route path="/work" element={<WorkPage />} /><Route path="/projects" element={<WorkPage />} />
    <Route path="/approach" element={<ApproachPage />} /><Route path="/writing" element={<WritingPage />} />
    <Route path="/direction" element={<DirectionPage />} /><Route path="/credentials" element={<CredentialsPage />} />
    <Route path="/contact" element={<ContactPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes><SiteFooter /></>;
}
