import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, ChevronDown, Clock } from 'lucide-react';
import { SETTINGS } from '../settings';
import { EXAMS, GROUPS, searchPrograms } from '../data';
import { useStore } from './Store';

function SearchOverlay({ onClose }) {
  const [q, setQ] = useState('');
  const nav = useNavigate();
  const { history, pushHistory, setHistory } = useStore();
  const ref = useRef();
  useEffect(() => { ref.current?.focus(); const k = (e) => e.key === 'Escape' && onClose(); window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k); }, [onClose]);
  const res = searchPrograms(q).slice(0, 6);
  const go = (e) => { e.preventDefault(); pushHistory(q); onClose(); nav(`/search?q=${encodeURIComponent(q)}`); };
  return (
    <div className="fixed inset-0 z-[60] bg-brand-dark/80 p-4 pt-24 backdrop-blur-sm" onClick={onClose}>
      <div className="mx-auto max-w-2xl rounded-lg bg-white p-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={go} className="flex gap-2">
          <input ref={ref} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search programs, exams, modes…" className="input !py-3" />
          <button className="btn-accent">Search</button>
        </form>
        {q ? (
          <ul className="mt-3 divide-y">
            {res.map((p) => <li key={p.slug}><Link onClick={onClose} to={`/program/${p.slug}`} className="block py-2 text-sm hover:text-accent">{p.title}<span className="ml-2 text-xs text-slate-400">{p.mode}</span></Link></li>)}
            {!res.length && <li className="py-3 text-sm text-slate-500">No programs match “{q}”.</li>}
          </ul>
        ) : history.length > 0 && (
          <div className="mt-3 text-sm">
            <div className="mb-1 flex justify-between text-xs text-slate-500"><span>Recent searches</span><button onClick={() => setHistory([])} className="hover:text-accent">Clear</button></div>
            {history.map((h) => <button key={h} onClick={() => setQ(h)} className="mr-2 mt-1 inline-flex items-center gap-1 rounded-full bg-sand px-3 py-1 hover:bg-brand/10"><Clock size={12} />{h}</button>)}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Header() {
  const [mega, setMega] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [search, setSearch] = useState(false);
  const { cart, profile } = useStore();
  const link = ({ isActive }) => `px-3 py-2 text-sm font-medium hover:text-accent ${isActive ? 'text-accent' : 'text-brand'}`;
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="wrap flex h-16 items-center gap-2">
        <button className="lg:hidden" aria-label="Menu" onClick={() => setDrawer(true)}><Menu /></button>
        <Link to="/" className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-brand">
          <span className="grid h-9 w-9 place-items-center rounded bg-brand text-sm text-accent">CI</span>{SETTINGS.brand}
        </Link>
        <nav className="ml-6 hidden items-center lg:flex">
          <div className="relative" onMouseEnter={() => setMega(true)} onMouseLeave={() => setMega(false)}>
            <NavLink to="/programs" className={(s) => link(s) + ' inline-flex items-center gap-1'}>All Programs <ChevronDown size={14} /></NavLink>
            {mega && (
              <div className="absolute left-0 top-full w-[760px] rounded-b-lg border bg-white p-6 shadow-2xl">
                <div className="grid grid-cols-3 gap-6">
                  {GROUPS.map((g) => (
                    <div key={g}>
                      <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-accent">{g}</h4>
                      {EXAMS.filter((e) => e.group === g).map((e) => <Link key={e.slug} onClick={() => setMega(false)} to={`/programs/${e.slug}`} className="block py-0.5 text-sm text-slate-700 hover:text-accent">{e.name}</Link>)}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <NavLink to="/locate" className={link}>Locate A Center</NavLink>
          <NavLink to="/about" className={link}>About</NavLink>
          <NavLink to="/blog" className={link}>Blog</NavLink>
        </nav>
        <div className="ml-auto flex items-center gap-1 sm:gap-3">
          <button aria-label="Search" onClick={() => setSearch(true)} className="p-2 text-brand hover:text-accent"><Search size={20} /></button>
          <Link to="/enroll" className="btn-accent hidden !py-2 sm:inline-flex">Enroll Free</Link>
          <Link to="/cart" aria-label="Cart" className="relative p-2 text-brand hover:text-accent"><ShoppingCart size={20} />{cart.length > 0 && <span className="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full bg-accent text-[10px] text-white">{cart.length}</span>}</Link>
          <Link to="/login" aria-label="Account" className="flex items-center gap-1 p-2 text-brand hover:text-accent"><User size={20} />{profile.name && <span className="hidden text-xs md:inline">{profile.name}</span>}</Link>
        </div>
      </div>
      {drawer && (
        <div className="fixed inset-0 z-[70] bg-black/50 lg:hidden" onClick={() => setDrawer(false)}>
          <div className="h-full w-80 max-w-[85%] overflow-y-auto bg-white p-5" onClick={(e) => e.stopPropagation()}>
            <button className="mb-4" onClick={() => setDrawer(false)} aria-label="Close"><X /></button>
            {GROUPS.map((g) => (
              <div key={g} className="mb-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-accent">{g}</h4>
                {EXAMS.filter((e) => e.group === g).map((e) => <Link key={e.slug} onClick={() => setDrawer(false)} to={`/programs/${e.slug}`} className="block py-1 text-sm">{e.name}</Link>)}
              </div>
            ))}
            {[['/locate', 'Locate A Center'], ['/about', 'About'], ['/blog', 'Blog'], ['/faqs', 'FAQs'], ['/enroll', 'Enroll Free']].map(([to, l]) => <Link key={to} to={to} onClick={() => setDrawer(false)} className="block border-t py-2 font-medium text-brand">{l}</Link>)}
          </div>
        </div>
      )}
      {search && <SearchOverlay onClose={() => setSearch(false)} />}
    </header>
  );
}
