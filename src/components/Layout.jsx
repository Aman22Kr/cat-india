import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { X, ArrowUp } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import AdBanner from './AdBanner';
import { LeadForm } from './LeadForm';
import { useStore } from './Store';

export default function Layout() {
  const { pathname } = useLocation();
  const { counselOpen, setCounselOpen } = useStore();
  const [top, setTop] = useState(false);
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  useEffect(() => { const f = () => setTop(window.scrollY > 600); window.addEventListener('scroll', f); return () => window.removeEventListener('scroll', f); }, []);
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1"><Outlet /></main>
      <AdBanner />
      <Footer />
      {top && <button aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-5 right-5 z-40 rounded-full bg-accent p-3 text-white shadow-lg"><ArrowUp size={18} /></button>}
      {counselOpen && (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-black/60 p-4" onClick={() => setCounselOpen(false)}>
          <div className="w-full max-w-md rounded-lg bg-white p-6" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 flex justify-between"><h3 className="text-lg font-bold text-brand">Free counselling (demo)</h3><button onClick={() => setCounselOpen(false)} aria-label="Close"><X /></button></div>
            <LeadForm draftKey="counsel" />
          </div>
        </div>
      )}
    </div>
  );
}
