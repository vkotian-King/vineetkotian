import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';


const nav = [{ to: '/work', label: 'Work' }, { to: '/approach', label: 'Approach' }, { to: '/writing', label: 'Writing' }, { to: '/direction', label: 'Direction' }, { to: '/credentials', label: 'Credentials' }];
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  useEffect(() => { const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); }; window.addEventListener('keydown', onKeyDown); return () => window.removeEventListener('keydown', onKeyDown); }, []);
  return <header className="site-header" id="top"><div className="nav-inner"><Link className="wordmark" to="/" aria-label="Vineet Kotian home" onClick={() => setOpen(false)}><span className="brand-mark">VK<span>.</span></span><span className="brand-name">Vineet Kotian<small>PRODUCT · SYSTEMS · AI</small></span></Link>
    <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="primary-nav" onClick={() => setOpen(v => !v)}><span>{open ? 'Close' : 'Menu'}</span><span aria-hidden="true">{open ? '×' : '☰'}</span></button>
    <nav className={`primary-nav ${open ? 'is-open' : ''}`} id="primary-nav" aria-label="Main navigation">{nav.map(item => <NavLink key={item.to} to={item.to} onClick={() => setOpen(false)} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>{item.label}</NavLink>)}</nav>
  </div></header>;
}
