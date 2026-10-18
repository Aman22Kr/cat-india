import { Link } from 'react-router-dom';
export default function NotFound() {
  return <div className="wrap py-24 text-center"><div className="text-7xl font-extrabold text-accent">404</div><p className="mt-3 text-lg text-slate-600">We couldn’t find that page.</p><Link to="/" className="btn-accent mt-6">Back to home</Link></div>;
}
