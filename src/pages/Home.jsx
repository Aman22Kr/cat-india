import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Award, Target, Users, Quote } from 'lucide-react';
import { SETTINGS, MOTION } from '../settings';
import { EXAMS, PROGRAMS, PROGRAM_TYPES, STATS, TESTIMONIALS, BLOGS } from '../data';
import { ProgramCard, Reveal, SectionTitle, SmartImg } from '../components/ui';
import { useStore } from '../components/Store';
import { LeadForm } from '../components/LeadForm';

const TABS = ['cat', 'cet', 'clat', 'ipm-bba', 'cuet', 'gmat', 'gre', 'gate-da'];
const TYPE_IMG = 'https://s3.ap-south-1.amazonaws.com/content.imsindia.com/ims-india/wp-content/uploads/2024/04/';
const TYPE_FILES = { Classroom: 'Classroom-Program.png', Online: 'Online-Program.png', 'Self-paced': 'Self-Learning-Program.png', 'Test Series': 'Test-Series-Program.png', Consulting: 'Admission-Consulting.png' };

export default function Home() {
  const [tab, setTab] = useState('cat');
  const [t, setT] = useState(0);
  const { recent, setCounselOpen } = useStore();
  const reduce = useReducedMotion();
  const list = PROGRAMS.filter((p) => p.exam === tab).slice(0, 6);
  const seen = recent.map((s) => PROGRAMS.find((p) => p.slug === s)).filter(Boolean).slice(0, 4);
  const hero = (d) => (reduce || MOTION.off ? {} : { initial: { opacity: 0, y: MOTION.distance }, animate: { opacity: 1, y: 0 }, transition: { duration: MOTION.duration, delay: d } });
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand to-brand-light text-white">
        <div className="wrap grid items-center gap-8 py-14 md:grid-cols-2 md:py-20">
          <div>
            <motion.p {...hero(0)} className="inline-block rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent">National Scholarship Test (demo)</motion.p>
            <motion.h1 {...hero(0.1)} className="mt-4 text-4xl font-extrabold leading-tight md:text-5xl">Open and free for every CAT aspirant</motion.h1>
            <motion.p {...hero(0.2)} className="mt-4 max-w-lg text-slate-200">Try a 45-minute scholarship test and see sample offers up to 75% on selected {SETTINGS.brand} programs.</motion.p>
            <motion.div {...hero(0.3)} className="mt-6 flex flex-wrap gap-3">
              <Link to="/enroll" className="btn-accent">Register now <ArrowRight size={16} /></Link>
              <button onClick={() => setCounselOpen(true)} className="btn border border-white/60 hover:bg-white hover:text-brand">Free counselling</button>
            </motion.div>
          </div>
          <motion.div {...hero(0.25)} className="grid grid-cols-2 gap-4">
            {STATS.map(([n, l]) => <div key={l} className="rounded-lg bg-white/10 p-5 backdrop-blur transition hover:-translate-y-1 hover:bg-white/20"><div className="text-3xl font-extrabold text-accent">{n}</div><div className="mt-1 text-sm text-slate-200">{l}</div></div>)}
          </motion.div>
        </div>
      </section>

      <section className="wrap py-14">
        <SectionTitle kicker="Programs" title="Popular programs" />
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          {TABS.map((s) => <button key={s} onClick={() => setTab(s)} className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-medium transition ${tab === s ? 'border-accent bg-accent text-white' : 'border-slate-300 text-slate-700 hover:border-accent'}`}>{EXAMS.find((e) => e.slug === s).name}</button>)}
        </div>
        <div key={tab} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{list.map((p, i) => <ProgramCard key={p.slug} p={p} i={i} />)}</div>
        <div className="mt-6 text-center"><Link to={`/programs/${tab}`} className="btn-outline">View all {EXAMS.find((e) => e.slug === tab).name} programs</Link></div>
      </section>

      {seen.length > 0 && (
        <section className="bg-sand py-12"><div className="wrap"><SectionTitle title="Recently viewed" /><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{seen.map((p, i) => <ProgramCard key={p.slug} p={p} i={i} />)}</div></div></section>
      )}

      <section className="bg-sand py-14">
        <div className="wrap">
          <SectionTitle kicker="Find your fit" title="Programs to meet every need" center />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PROGRAM_TYPES.map(([name, d], i) => (
              <Reveal key={name} delay={(i % 3) * MOTION.stagger}>
                <Link to={`/programs?mode=${encodeURIComponent(name)}`} className="flex h-full gap-4 rounded-lg bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <SmartImg src={TYPE_FILES[name] && TYPE_IMG + TYPE_FILES[name]} alt={name} label={name[0]} className="h-14 w-14 shrink-0 rounded object-contain" />
                  <div><h3 className="font-bold text-brand">{name} programs</h3><p className="mt-1 text-sm text-slate-600">{d}</p></div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap py-14">
        <SectionTitle kicker="Why us" title={`What sets ${SETTINGS.brand} apart`} center />
        <div className="grid gap-6 md:grid-cols-3">
          {[[Award, 'Well-designed programs', 'Content planned by people who have themselves cleared top exams.'], [Target, 'Realistic benchmarking', 'Simulated tests that show where you stand against a large cohort.'], [Users, 'Mentorship', 'Regular one-to-one planning sessions to keep you motivated.']].map(([I, h, d], i) => (
            <Reveal key={h} delay={i * MOTION.stagger}><div className="rounded-lg border border-slate-200 p-6 text-center transition hover:border-accent hover:shadow-lg"><I className="mx-auto text-accent" size={36} /><h3 className="mt-3 font-bold text-brand">{h}</h3><p className="mt-2 text-sm text-slate-600">{d}</p></div></Reveal>
          ))}
        </div>
      </section>

      <section className="bg-brand py-14 text-white">
        <div className="wrap">
          <SectionTitle title="What our alumni say (sample stories)" center />
          <div className="mx-auto max-w-2xl text-center">
            <Quote className="mx-auto text-accent" />
            <motion.p key={t} initial={MOTION.off ? false : { opacity: 0, x: MOTION.distance }} animate={{ opacity: 1, x: 0 }} transition={{ duration: MOTION.duration }} className="mt-4 text-lg">{TESTIMONIALS[t][2]}</motion.p>
            <p className="mt-3 font-semibold text-accent">{TESTIMONIALS[t][0]} <span className="text-slate-300">· {TESTIMONIALS[t][1]}</span></p>
            <div className="mt-4 flex justify-center gap-2">{TESTIMONIALS.map((_, i) => <button key={i} aria-label={`Story ${i + 1}`} onClick={() => setT(i)} className={`h-2.5 w-2.5 rounded-full ${i === t ? 'bg-accent' : 'bg-white/40'}`} />)}</div>
          </div>
        </div>
      </section>

      <section className="wrap grid gap-8 py-14 md:grid-cols-2">
        <Reveal><h2 className="text-2xl font-bold text-brand md:text-3xl">Experience programs at zero fees</h2><ul className="mt-4 space-y-2 text-slate-700">{['Concept videos', 'Question bank', 'Sectional tests', 'Full-length mocks', 'Career guidance sessions'].map((x) => <li key={x} className="flex gap-2"><span className="text-accent">✔</span>{x}</li>)}</ul></Reveal>
        <Reveal delay={0.1}><div className="rounded-lg border p-5 shadow-sm"><h3 className="mb-3 font-bold text-brand">Enroll free (demo form)</h3><LeadForm draftKey="home" /></div></Reveal>
      </section>

      <section className="bg-sand py-14">
        <div className="wrap">
          <SectionTitle kicker="Blog" title="Latest articles" />
          <div className="grid gap-5 md:grid-cols-3">{BLOGS.slice(0, 3).map((b, i) => <Reveal key={b.slug} delay={i * MOTION.stagger}><Link to={`/blog/${b.slug}`} className="block h-full rounded-lg bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><h3 className="font-semibold text-brand">{b.title}</h3><p className="mt-2 text-sm text-slate-600">{b.excerpt}</p></Link></Reveal>)}</div>
        </div>
      </section>
    </>
  );
}
