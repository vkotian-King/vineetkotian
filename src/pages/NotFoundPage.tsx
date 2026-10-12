import { Link } from 'react-router-dom';
export function NotFoundPage() { return <main id="main" className="not-found"><span className="eyebrow">ERROR / 404</span><h1>Wrong<br/><em>turn.</em></h1><p>This page isn’t in the map yet.</p><Link className="button button-dark" to="/">Back to home <span>↗</span></Link></main>; }
