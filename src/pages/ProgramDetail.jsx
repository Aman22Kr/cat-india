import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Heart, ShoppingCart, CheckCircle2 } from 'lucide-react';
import { programBySlug, examBySlug, discounted, gst, PROGRAMS } from '../data';
import { money, ProgramCard, Reveal } from '../components/ui';
import { useStore } from '../components/Store';
import { LeadForm } from '../components/LeadForm';
import NotFound from './NotFound';

export default function ProgramDetail() {
  const { slug } = useParams();
  const p = programBySlug(slug);
  const { favs, toggleFav, addCart, cart, pushRecent } = useStore();
  useEffect(() => { if (p) { pushRecent(p.slug); document.title = `${p.title} | CAT-INDIA`; } }, [p?.slug]);
  if (!p) return <NotFound />;
  const e = examBySlug(p.exam);
  const related = PROGRAMS.filter((x) => x.exam === p.exam && x.slug !== p.slug).slice(0, 3);
  return (
    <div className="wrap py-10">
      <nav className="mb-4 text-xs text-slate-500"><Link to="/" className="hover:text-accent">Home</Link> / <Link to="/programs" className="hover:text-accent">Programs</Link> / <Link to={`/programs/${p.exam}`} className="hover:text-accent">{e.name}</Link></nav>
      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <Reveal>
          <span className="rounded bg-brand/10 px-2 py-0.5 text-xs font-semibold text-brand">{p.mode}</span>
          <h1 className="mt-2 text-3xl font-extrabold text-brand">{p.title}</h1>
          <p className="mt-3 text-slate-700">{p.blurb}</p>
          <h2 className="mt-8 text-xl font-bold text-brand">What’s included (sample)</h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">{['Concept lessons', 'Practice question bank', 'Performance analytics', 'Mentor support sessions'].map((x) => <li key={x} className="flex gap-2 text-sm"><CheckCircle2 size={18} className="text-accent" />{x}</li>)}</ul>
          <p className="mt-6 rounded bg-sand p-3 text-xs text-slate-500">All details on this page are sample data for a demo site.</p>
        </Reveal>
        <aside className="h-fit rounded-lg border p-5 shadow-sm lg:sticky lg:top-24">
          {p.price ? (<>
            <div className="text-3xl font-extrabold text-brand">{money(discounted(p))}</div>
            {p.off > 0 && <div className="text-sm text-slate-500"><s>{money(p.price)}</s> · up to {p.off}% off</div>}
            <div className="text-xs text-slate-500">+ GST {money(gst(discounted(p)))}</div>
            <div className="mt-4 flex gap-2">
              <button className="btn-accent flex-1" disabled={cart.includes(p.slug)} onClick={() => addCart(p.slug)}><ShoppingCart size={16} />{cart.includes(p.slug) ? 'In cart' : 'Add to cart'}</button>
              <button aria-label="Save" className="btn-outline" onClick={() => toggleFav(p.slug)}><Heart size={16} className={favs.includes(p.slug) ? 'fill-red-500 text-red-500' : ''} /></button>
            </div>
          </>) : <p className="font-semibold text-brand">City-specific program. Request a callback below.</p>}
          <h3 className="mb-2 mt-6 font-bold text-brand">Request a callback (demo)</h3>
          <LeadForm draftKey={'detail-' + p.slug} defaultExam={p.exam} />
        </aside>
      </div>
      {related.length > 0 && <div className="mt-12"><h2 className="mb-4 text-xl font-bold text-brand">More {e.name} programs</h2><div className="grid gap-5 md:grid-cols-3">{related.map((r, i) => <ProgramCard key={r.slug} p={r} i={i} />)}</div></div>}
    </div>
  );
}
