import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronDown, MapPin } from 'lucide-react';
import { BLOGS, CITIES, FAQS, TESTIMONIALS, STATS } from '../data';
import { Reveal, SectionTitle } from '../components/ui';
import { SETTINGS, MOTION } from '../settings';
import { useStore } from '../components/Store';
import NotFound from './NotFound';

const Page = ({ title, children }) => <div className="wrap py-12"><h1 className="mb-6 text-3xl font-extrabold text-brand">{title}</h1>{children}</div>;

export function About() {
  const { setCounselOpen } = useStore();
  return (
    <Page title={`About ${SETTINGS.brand}`}>
      <Reveal><p className="max-w-3xl text-slate-700">{SETTINGS.brand} is a demo coaching website that mirrors the structure of a large test-preparation institute: exam-wise programs, mock-test series, mentoring and admissions consulting. All stories, prices and centres are sample content.</p></Reveal>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{STATS.map(([n, l], i) => <Reveal key={l} delay={i * MOTION.stagger}><div className="rounded-lg bg-sand p-5 text-center"><div className="text-3xl font-extrabold text-accent">{n}</div><div className="text-sm text-slate-600">{l}</div></div></Reveal>)}</div>
      <div className="mt-8 flex gap-3"><button className="btn-accent" onClick={() => setCounselOpen(true)}>Talk to a mentor (demo)</button><Link to="/locate" className="btn-outline">Locate a centre</Link></div>
    </Page>
  );
}

export function Locate() {
  const [q, setQ] = useState('');
  const list = CITIES.filter((c) => c.toLowerCase().includes(q.toLowerCase()));
  return (
    <Page title="Locate a centre">
      <input className="input max-w-sm" placeholder="Search city" value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((c, i) => <Reveal key={c} delay={(i % 4) * MOTION.stagger}><div className="rounded-lg border p-4 transition hover:border-accent hover:shadow-md"><MapPin className="text-accent" size={20} /><h3 className="mt-2 font-bold text-brand">{c}</h3><p className="text-xs text-slate-500">Sample centre. No real address.</p></div></Reveal>)}
      </div>
      {!list.length && <p className="mt-6 text-slate-500">No demo centre in that city yet.</p>}
    </Page>
  );
}

export function Blog() {
  return <Page title="Blog"><div className="grid gap-5 md:grid-cols-3">{BLOGS.map((b, i) => <Reveal key={b.slug} delay={(i % 3) * MOTION.stagger}><Link to={`/blog/${b.slug}`} className="block h-full rounded-lg border p-5 transition hover:-translate-y-1 hover:border-accent hover:shadow-lg"><h2 className="font-semibold text-brand">{b.title}</h2><p className="mt-2 text-sm text-slate-600">{b.excerpt}</p><span className="mt-3 inline-block text-sm font-semibold text-accent">Read more</span></Link></Reveal>)}</div></Page>;
}
export function BlogPost() {
  const b = BLOGS.find((x) => x.slug === useParams().slug);
  if (!b) return <NotFound />;
  return <Page title={b.title}><p className="max-w-2xl text-slate-700">{b.body}</p><Link to="/blog" className="mt-6 inline-block text-accent underline">All articles</Link></Page>;
}

export function Faqs() {
  const [open, setOpen] = useState(0);
  return <Page title="Frequently asked questions"><div className="max-w-3xl divide-y rounded-lg border">{FAQS.map(([q, a], i) => <div key={q}><button className="flex w-full items-center justify-between p-4 text-left font-medium text-brand" onClick={() => setOpen(open === i ? -1 : i)}>{q}<ChevronDown size={18} className={`transition ${open === i ? 'rotate-180' : ''}`} /></button>{open === i && <p className="px-4 pb-4 text-sm text-slate-600">{a}</p>}</div>)}</div></Page>;
}

export function Alumni() {
  return <Page title="Our alumni (sample stories)"><div className="grid gap-5 md:grid-cols-2">{TESTIMONIALS.map(([n, t, s], i) => <Reveal key={n} delay={i * MOTION.stagger}><blockquote className="rounded-lg bg-sand p-5"><p className="text-slate-700">{s}</p><footer className="mt-3 text-sm font-semibold text-brand">{n} <span className="font-normal text-slate-500">· {t}</span></footer></blockquote></Reveal>)}</div></Page>;
}

const LEGAL = {
  privacy: ['Privacy', 'This demo stores preferences (cart, saved programs, searches, form drafts) in your browser’s localStorage only. No data is sent to a server and nothing is shared with third parties.'],
  terms: ['Terms of Use', 'This site is a non-commercial demo. Nothing here is an offer, and no purchase, enrolment or booking can be completed.'],
  disclaimer: ['Disclaimer', 'Names, prices, centres and stories are sample data created for demonstration purposes.'],
  csr: ['CSR Policy', 'Placeholder page. Replace with real policy text for a production site.'],
};
export function Legal() {
  const l = LEGAL[useParams().slug];
  if (!l) return <NotFound />;
  return <Page title={l[0]}><p className="max-w-2xl text-slate-700">{l[1]}</p></Page>;
}
