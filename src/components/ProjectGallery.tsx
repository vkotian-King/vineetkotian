import { useMemo, useState } from 'react';
import { projects } from '../data/content';
import { ProjectCard } from './ProjectCard';
const categories = ['All', 'Operations', 'AI systems', 'Products', 'Quality'] as const;
export function ProjectGallery() {
  const [active, setActive] = useState<(typeof categories)[number]>('All');
  const shown = useMemo(() => active === 'All' ? projects : projects.filter(project => project.category === active), [active]);
  return <><div className="filter-bar" aria-label="Filter projects">{categories.map(category => <button key={category} type="button" className={active === category ? 'filter-button selected' : 'filter-button'} aria-pressed={active === category} onClick={() => setActive(category)}>{category}<span>{category === 'All' ? projects.length : projects.filter(project => project.category === category).length}</span></button>)}</div><div className="projects-grid" aria-live="polite">{shown.map(project => <ProjectCard key={project.id} project={project} index={projects.indexOf(project)} />)}</div></>;
}
