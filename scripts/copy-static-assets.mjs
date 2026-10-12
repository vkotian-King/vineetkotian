import { cp, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = process.cwd();
const dist = resolve(root, 'dist');
await mkdir(dist, { recursive: true });
await cp(resolve(root, 'workbench'), resolve(dist, 'workbench'), { recursive: true, force: true });
console.log('Copied the existing workbench site into dist/. The résumé is served from public/.');
