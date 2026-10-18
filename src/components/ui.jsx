import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Heart, ShoppingCart } from 'lucide-react';
import { MOTION } from '../settings';
import { useStore } from './Store';
import { examBySlug, discounted, gst } from '../data';

export function Reveal({ children, delay = 0, className = '', x = 0 }) {
  const reduce = useReducedMotion();
  if (reduce || MOTION.off) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} initial={{ opacity: 0, y: MOTION.distance, x }} whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-60px' }} transition={{ duration: MOTION.duration, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
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
