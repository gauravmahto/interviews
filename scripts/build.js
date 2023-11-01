import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import { build } from 'esbuild';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const ROOT_DIR = join(__dirname, '..');
export const SRC_DIR = join(ROOT_DIR, 'src');

export const DIST_DIR = join(ROOT_DIR, 'dist');

const commonOptions = {
  bundle: true,
  sourcemap: true,
  platform: 'node',
  packages: 'external'
};

export async function buildIndividualTsFiles() {

  const tsFiles = await glob(join(SRC_DIR, 'self', '**/*.ts'), {
    // ignore: '**/*.test.ts'
  });

  await build({
    ...commonOptions,
    entryPoints: tsFiles,
    format: 'esm',
    outdir: join(DIST_DIR, 'self')
  });

}