import { createContext, useContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Ctx = createContext(null);
export const useStore = () => useContext(Ctx);

export function StoreProvider({ children }) {
  const [favs, setFavs] = useLocalStorage('favs', []);
  const [cart, setCart] = useLocalStorage('cart', []);
  const [recent, setRecent] = useLocalStorage('recent', []);
  const [history, setHistory] = useLocalStorage('searchHistory', []);
  const [leads, setLeads] = useLocalStorage('leads', []);
  const [profile, setProfile] = useLocalStorage('profile', { name: '' });
  const [counselOpen, setCounselOpen] = useState(false);

  const toggleFav = (slug) => setFavs((f) => (f.includes(slug) ? f.filter((x) => x !== slug) : [...f, slug]));
  const addCart = (slug) => setCart((c) => (c.includes(slug) ? c : [...c, slug]));
  const removeCart = (slug) => setCart((c) => c.filter((x) => x !== slug));
  const pushRecent = (slug) => setRecent((r) => [slug, ...r.filter((x) => x !== slug)].slice(0, 8));
  const pushHistory = (q) => q.trim() && setHistory((h) => [q.trim(), ...h.filter((x) => x !== q.trim())].slice(0, 8));
  // Demo leads: name/email/phone typed by the visitor are kept only in this browser.
  const saveLead = (lead) => setLeads((l) => [{ ...lead, at: new Date().toISOString() }, ...l].slice(0, 20));
  const clearAll = () => {
    Object.keys(localStorage).filter((k) => k.startsWith('catindia:')).forEach((k) => localStorage.removeItem(k));
    setFavs([]); setCart([]); setRecent([]); setHistory([]); setLeads([]); setProfile({ name: '' });
  };

  return (
    <Ctx.Provider value={{ favs, cart, recent, history, leads, profile, setProfile, toggleFav, addCart, removeCart, pushRecent, pushHistory, saveLead, clearAll, counselOpen, setCounselOpen, setHistory }}>
      {children}
    </Ctx.Provider>
  );
}
