import { Link } from 'react-router-dom';
import { SETTINGS } from '../settings';
import { useStore } from './Store';

export default function Footer() {
  const { clearAll } = useStore();
  const links = [['/blog', 'Blog'], ['/faqs', 'FAQs'], ['/about', 'About Us'], ['/testimonials', 'Alumni'], ['/legal/privacy', 'Privacy'], ['/legal/terms', 'Terms of Use'], ['/legal/disclaimer', 'Disclaimer'], ['/legal/csr', 'CSR Policy']];
  return (
    <footer className="bg-brand-dark text-slate-300">
      <div className="wrap py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="text-2xl font-extrabold text-white">{SETTINGS.brand}</div>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">{links.map(([to, l]) => <li key={to}><Link to={to} className="hover:text-accent">{l}</Link></li>)}</ul>
        </div>
        <p className="mt-6 text-xs text-slate-400">{SETTINGS.referenceNote} Saved items (cart, favourites, searches, form drafts) live only in this browser’s localStorage and do not sync across devices or form a real account.</p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
          <span>© 2026 {SETTINGS.brand}. Demo project.</span>
          <button onClick={() => window.confirm('Clear all saved data in this browser?') && clearAll()} className="underline hover:text-accent">Clear saved data</button>
        </div>
      </div>
    </footer>
  );
}
