import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { programBySlug, discounted, gst } from '../data';
import { money } from '../components/ui';
import { useStore } from '../components/Store';
import { LeadForm } from '../components/LeadForm';

export function Cart() {
  const { cart, removeCart } = useStore();
  const [done, setDone] = useState(false);
  const items = cart.map(programBySlug).filter(Boolean);
  const sub = items.reduce((s, p) => s + discounted(p), 0);
  return (
    <div className="wrap py-12">
      <h1 className="mb-6 text-3xl font-extrabold text-brand">Your cart</h1>
      {!items.length ? <p className="text-slate-600">Your cart is empty. <Link to="/programs" className="text-accent underline">Browse programs</Link></p> : (
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <ul className="divide-y rounded-lg border">{items.map((p) => <li key={p.slug} className="flex items-center justify-between gap-3 p-4"><div><Link className="font-semibold text-brand hover:text-accent" to={`/program/${p.slug}`}>{p.title}</Link><div className="text-sm text-slate-500">{money(discounted(p))} + GST</div></div><button aria-label="Remove" onClick={() => removeCart(p.slug)} className="text-slate-400 hover:text-red-500"><Trash2 size={18} /></button></li>)}</ul>
          <div className="h-fit rounded-lg bg-sand p-5">
            <div className="flex justify-between"><span>Subtotal</span><b>{money(sub)}</b></div>
            <div className="flex justify-between text-sm text-slate-500"><span>GST (18%)</span><span>{money(gst(sub))}</span></div>
            <button className="btn-accent mt-4 w-full" onClick={() => setDone(true)}>Mock checkout</button>
            {done && <p className="mt-3 rounded bg-yellow-50 p-3 text-xs text-yellow-800">Demo only. No payment was taken and no order was placed.</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export function Login() {
  const { profile, setProfile, favs, leads } = useStore();
  const [n, setN] = useState(profile.name);
  return (
    <div className="wrap max-w-lg py-12">
      <h1 className="mb-2 text-3xl font-extrabold text-brand">Demo profile</h1>
      <p className="mb-5 text-sm text-slate-500">There are no real accounts. This only saves a display name in your browser. Do not enter passwords.</p>
      <input className="input" placeholder="Display name" value={n} onChange={(e) => setN(e.target.value)} />
      <button className="btn-accent mt-3" onClick={() => setProfile({ name: n.trim().slice(0, 30) })}>Save name</button>
      <div className="mt-8 grid grid-cols-2 gap-3 text-center text-sm"><Link to="/programs?saved=1" className="rounded-lg bg-sand p-4"><b className="text-2xl text-accent">{favs.length}</b><div>Saved programs</div></Link><div className="rounded-lg bg-sand p-4"><b className="text-2xl text-accent">{leads.length}</b><div>Demo form entries</div></div></div>
    </div>
  );
}

export function Enroll() {
  return <div className="wrap max-w-2xl py-12"><h1 className="mb-2 text-3xl font-extrabold text-brand">Enroll free (demo)</h1><p className="mb-5 text-sm text-slate-500">Your draft is kept in this browser. Nothing is submitted anywhere.</p><LeadForm draftKey="enroll" /></div>;
}
