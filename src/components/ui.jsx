import { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import { Heart, ShoppingCart } from 'lucide-react';
import { MOTION } from '../settings';
import { useStore } from './Store';
import { examBySlug, discounted, gst } from '../data';

// Content is visible by default. After mount it is briefly hidden and faded in, so a failure
// anywhere in this logic can never leave a page blank (a 4s safety timer also forces it visible).
export function Reveal({ children, delay = 0, className = '', x = 0 }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const [phase, setPhase] = useState('init');
  const skip = reduce || MOTION.off;
  useLayoutEffect(() => {
    if (skip) return undefined;
    const el = ref.current;
    if (!el) return undefined;
    setPhase('hide');
    const show = () => setPhase('show');
    const r = el.getBoundingClientRect();
    const inView = r.top < window.innerHeight && r.bottom > 0;
    let io; let raf;
    if (inView || !('IntersectionObserver' in window)) {
      raf = requestAnimationFrame(() => requestAnimationFrame(show));
    } else {
      io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { show(); io.disconnect(); } }, { rootMargin: '0px 0px -60px 0px' });
      io.observe(el);
    }
    const t = setTimeout(show, 4000);
    return () => { clearTimeout(t); if (io) io.disconnect(); if (raf) cancelAnimationFrame(raf); };
  }, [skip]);
  if (skip) return <div className={className}>{children}</div>;
  const style = phase === 'hide'
    ? { opacity: 0, transform: `translate(${x}px, ${MOTION.distance}px)`, transition: 'none' }
    : { opacity: 1, transform: 'none', transition: `opacity ${MOTION.duration}s ease ${delay}s, transform ${MOTION.duration}s cubic-bezier(0.22,1,0.36,1) ${delay}s` };
  return <div ref={ref} className={className} style={style}>{children}</div>;
}

// Image with a graceful fallback so no broken-image icons are ever shown.
export function SmartImg({ src, alt, className = '', label = '' }) {
  const [bad, setBad] = useState(!src);
  if (bad) return <div role="img" aria-label={alt} className={`grid place-items-center bg-gradient-to-br from-brand to-brand-light text-white font-bold ${className}`}>{label || alt?.[0]}</div>;
  return <img src={src} alt={alt} loading="lazy" onError={() => setBad(true)} className={className} />;
}

export function SectionTitle({ kicker, title, center }) {
  return (
    <div className={`mb-8 ${center ? 'text-center' : ''}`}>
      {kicker && <p className="text-xs font-semibold uppercase tracking-widest text-accent">{kicker}</p>}
      <h2 className="mt-1 text-2xl font-bold text-brand md:text-3xl">{title}</h2>
    </div>
  );
}

export const money = (n) => '₹' + n.toLocaleString('en-IN');

export function ProgramCard({ p, i = 0 }) {
  const { favs, toggleFav, addCart, cart } = useStore();
  const fav = favs.includes(p.slug);
  const inCart = cart.includes(p.slug);
  return (
    <Reveal delay={(i % 4) * MOTION.stagger} className="h-full">
      <div className="group flex h-full flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-xl">
        <div className="mb-3 flex items-start justify-between gap-2">
          <span className="rounded bg-brand/10 px-2 py-0.5 text-xs font-semibold text-brand">{p.mode}</span>
          <button aria-label="Save program" onClick={() => toggleFav(p.slug)} className="text-slate-400 hover:text-red-500">
            <Heart size={18} className={fav ? 'fill-red-500 text-red-500' : ''} />
          </button>
        </div>
        <Link to={`/program/${p.slug}`} className="text-lg font-semibold leading-snug text-brand hover:text-accent">{p.title}</Link>
        <p className="mt-2 flex-1 text-sm text-slate-600">{p.blurb}</p>
        <div className="mt-4 text-sm">
          {p.price ? (
            <>
              <span className="text-xl font-bold text-brand">{money(p.price)}</span>
              <span className="text-slate-500"> + GST {money(gst(p.price))}</span>
              {p.off > 0 && <div className="mt-1 inline-block rounded bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">Up to {p.off}% off</div>}
            </>
          ) : <span className="font-semibold text-slate-600">City specific. Check availability</span>}
        </div>
        <div className="mt-4 flex gap-2">
          <Link to={`/program/${p.slug}`} className="btn-outline flex-1 !py-2">Details</Link>
          {p.price && (
            <button onClick={() => addCart(p.slug)} disabled={inCart} className="btn-accent !py-2 disabled:opacity-60" aria-label="Add to cart">
              <ShoppingCart size={16} />{inCart ? 'Added' : 'Add'}
            </button>
          )}
        </div>
        <p className="mt-3 text-[11px] uppercase tracking-wide text-slate-400">{examBySlug(p.exam)?.name}. Sample data</p>
      </div>
    </Reveal>
  );
}
export { discounted };
