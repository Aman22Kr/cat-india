import { useState } from 'react';
import { CITIES, EXAMS } from '../data';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useStore } from './Store';

const EMPTY = { first: '', last: '', email: '', phone: '', city: '', exam: '' };

// Demo form: nothing is sent anywhere. The draft and submission stay in this browser only.
export function LeadForm({ draftKey = 'enroll', defaultExam = '' }) {
  const [f, setF] = useLocalStorage('draft:' + draftKey, { ...EMPTY, exam: defaultExam });
  const [state, setState] = useState('idle');
  const [err, setErr] = useState('');
  const { saveLead } = useStore();
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    if (!f.first.trim() || !/^\S+@\S+\.\S+$/.test(f.email) || !/^\d{10}$/.test(f.phone)) { setErr('Enter a name, a valid email and a 10-digit mobile number.'); setState('error'); return; }
    setState('loading');
    setTimeout(() => { saveLead({ ...f, kind: draftKey }); setF({ ...EMPTY }); setErr(''); setState('success'); }, 500);
  };
  if (state === 'success') return <div className="rounded-md bg-green-50 p-4 text-sm text-green-800">Saved in this browser only. Nothing was sent to a server, and no one will call you. This is a demo form.</div>;
  return (
    <form onSubmit={submit} className="grid gap-3 sm:grid-cols-2">
      <input className="input" placeholder="First name" value={f.first} onChange={set('first')} />
      <input className="input" placeholder="Last name" value={f.last} onChange={set('last')} />
      <input className="input" type="email" placeholder="Email" value={f.email} onChange={set('email')} />
      <input className="input" inputMode="numeric" maxLength={10} placeholder="Mobile (10 digits)" value={f.phone} onChange={set('phone')} />
      <select className="input" value={f.city} onChange={set('city')}><option value="">Select city</option>{CITIES.map((c) => <option key={c}>{c}</option>)}</select>
      <select className="input" value={f.exam} onChange={set('exam')}><option value="">Program interest</option>{EXAMS.map((x) => <option key={x.slug} value={x.slug}>{x.name}</option>)}</select>
      {state === 'error' && <p className="text-sm text-red-600 sm:col-span-2">{err}</p>}
      <button disabled={state === 'loading'} className="btn-accent sm:col-span-2">{state === 'loading' ? 'Saving…' : 'Submit (demo)'}</button>
    </form>
  );
}
