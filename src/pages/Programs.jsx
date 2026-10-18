import { useMemo } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { EXAMS, GROUPS, MODES, PROGRAMS, examBySlug, searchPrograms, discounted } from '../data';
import { ProgramCard } from '../components/ui';
import { useStore } from '../components/Store';
import { Search as SearchIcon } from 'lucide-react';

export function ProgramList({ title, base, forcedQuery }) {
  const { exam } = useParams();
  const [sp, setSp] = useSearchParams();
  const { favs } = useStore();
  const q = forcedQuery ?? sp.get('q') ?? '';
  const mode = sp.get('mode') || '';
  const sort = sp.get('sort') || 'relevance';
  const onlyFav = sp.get('saved') === '1';
  const upd = (k, v) => { const n = new URLSearchParams(sp); v ? n.set(k, v) : n.delete(k); setSp(n, { replace: true }); };
  const items = useMemo(() => {
    let l = q ? searchPrograms(q) : PROGRAMS;
    if (exam) l = l.filter((p) => p.exam === exam);
    if (mode) l = l.filter((p) => p.mode === mode);
    if (onlyFav) l = l.filter((p) => favs.includes(p.slug));
    const price = (p) => discounted(p) ?? Infinity;
    if (sort === 'low') l = [...l].sort((a, b) => price(a) - price(b));
    if (sort === 'high') l = [...l].sort((a, b) => (discounted(b) ?? -1) - (discounted(a) ?? -1));
    if (sort === 'az') l = [...l].sort((a, b) => a.title.localeCompare(b.title));
    return l;
  }, [q, exam, mode, sort, onlyFav, favs]);
  return (
    <div className="wrap py-10">
      <h1 className="text-3xl font-extrabold text-brand">{title}</h1>
      <div className="mt-6 grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="space-y-5 text-sm">
          {forcedQuery === undefined && (
            <div className="relative"><SearchIcon size={16} className="absolute left-3 top-3 text-slate-400" /><input className="input !pl-9" placeholder="Filter by keyword" value={q} onChange={(e) => upd('q', e.target.value)} /></div>
          )}
          <div><h4 className="mb-1 font-semibold text-brand">Mode</h4>{['', ...MODES].map((m) => <label key={m} className="flex items-center gap-2 py-0.5"><input type="radio" name="mode" checked={mode === m} onChange={() => upd('mode', m)} />{m || 'All'}</label>)}</div>
          <div><h4 className="mb-1 font-semibold text-brand">Sort</h4><select className="input" value={sort} onChange={(e) => upd('sort', e.target.value)}><option value="relevance">Relevance</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="az">Name A–Z</option></select></div>
          <label className="flex items-center gap-2"><input type="checkbox" checked={onlyFav} onChange={(e) => upd('saved', e.target.checked ? '1' : '')} />Saved only</label>
          {base && <div><h4 className="mb-1 font-semibold text-brand">Exams</h4>{GROUPS.map((g) => <div key={g} className="mb-2"><div className="text-[11px] uppercase text-slate-400">{g}</div>{EXAMS.filter((e) => e.group === g).map((e) => <Link key={e.slug} to={`/programs/${e.slug}`} className={`block py-0.5 hover:text-accent ${exam === e.slug ? 'font-bold text-accent' : ''}`}>{e.name}</Link>)}</div>)}</div>}
        </aside>
        <div>
          <p className="mb-4 text-sm text-slate-500">{items.length} result{items.length === 1 ? '' : 's'} (sample data)</p>
          {items.length ? <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{items.map((p, i) => <ProgramCard key={p.slug} p={p} i={i} />)}</div>
            : <div className="rounded-lg border border-dashed p-10 text-center text-slate-500">No programs match these filters. <button className="text-accent underline" onClick={() => setSp({})}>Reset filters</button></div>}
        </div>
      </div>
    </div>
  );
}

export function AllPrograms() {
  const { exam } = useParams();
  const e = examBySlug(exam);
  if (exam && !e) return <div className="wrap py-20 text-center">Unknown exam. <Link className="text-accent underline" to="/programs">See all programs</Link></div>;
  return <ProgramList base title={e ? `${e.name} programs` : 'All programs'} />;
}

export function SearchPage() {
  const [sp] = useSearchParams();
  const { pushHistory } = useStore();
  const q = sp.get('q') || '';
  return <ProgramList title={q ? `Search results for “${q}”` : 'Search'} forcedQuery={q} />;
}
