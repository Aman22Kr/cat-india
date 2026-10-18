import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SETTINGS } from '../settings';

const ADS = [
  ['Scholarship Test this weekend', 'Register for the free demo scholarship test.', '/enroll'],
  ['Book a free counselling call', 'Talk to a demo mentor about the right program.', '/enroll'],
  ['GATE 2027/28 batches open', 'Browse self-paced and live online options.', '/programs/gate-da'],
];

// Small house-ad strip shown at the base of every page. Replace with a real ad slot later.
export default function AdBanner() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((x) => (x + 1) % ADS.length), 6000); return () => clearInterval(t); }, []);
  const [t, d, to] = ADS[i];
  return (
    <aside aria-label="Advertisement" className="border-t border-slate-200 bg-sand">
      <div className="wrap flex flex-wrap items-center justify-between gap-2 py-3 text-sm">
        <span className="rounded border border-slate-300 px-1.5 text-[10px] uppercase tracking-wider text-slate-500">Ad</span>
        <p className="flex-1 text-slate-700"><b className="text-brand">{t}.</b> {d}</p>
        <Link to={to} className="font-semibold text-accent hover:underline">Learn more</Link>
        <span className="w-full text-[10px] text-slate-400 sm:w-auto">{SETTINGS.brand} sample sponsor slot</span>
      </div>
    </aside>
  );
}
