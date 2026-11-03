import pkg from '../../package.json';
import lock from '../../package-lock.json';

import { describe, expect, it } from 'vitest';

// Guards the CVE pins from the "bump dependency versions" change so the
// vulnerable versions named in the advisories do not silently return. Reads
// the manifests directly (the source of truth that ships with the repo)
// instead of relying on `node_modules`.

const allPins: Record<string, string> = {
  ...pkg.dependencies,
  ...pkg.devDependencies,
};

const lockfile = lock as unknown as { packages: Record<string, { version?: string }> };
const rootMirror: Record<string, string> = {
  ...(lockfile.packages[''] as unknown as { dependencies?: Record<string, string> })
    .dependencies,
  ...(lockfile.packages[''] as unknown as { devDependencies?: Record<string, string> })
    .devDependencies,
};

// The 14 packages named in the advisory bundle, with their fixed versions and
// the specific lockfile entries that must reflect them. `pin` is set only for
// the packages that are also direct dependencies of the app.
const FIXED: Array<{ pkg: string; version: string; lockKey: string; pin?: string }> = [
  { pkg: 'next', version: '15.5.24', lockKey: 'node_modules/next', pin: '15.5.24' },
  { pkg: 'storybook', version: '8.6.19', lockKey: 'node_modules/storybook', pin: '^8.6.19' },
  {
    pkg: '@storybook/addon-vitest',
    version: '9.1.21',
    lockKey: 'node_modules/@storybook/addon-vitest',
    pin: '^9.1.21',
  },
  { pkg: 'vite', version: '8.3.3', lockKey: 'node_modules/vite', pin: '^8.3.3' },
  { pkg: 'zod', version: '4.6.6', lockKey: 'node_modules/zod', pin: '^4.6.6' },
  {
    pkg: 'brace-expansion',
    version: '5.0.11',
    lockKey: 'node_modules/glob/node_modules/brace-expansion',
  },
  {
    pkg: 'brace-expansion',
    version: '5.0.11',
    lockKey: 'node_modules/eslint-plugin-storybook/node_modules/brace-expansion',
  },
  { pkg: 'browserslist', version: '4.28.7', lockKey: 'node_modules/browserslist' },
  { pkg: 'flatted', version: '3.4.2', lockKey: 'node_modules/flatted' },
  { pkg: 'image-size', version: '2.0.3', lockKey: 'node_modules/image-size' },
  { pkg: 'js-yaml', version: '3.15.0', lockKey: 'node_modules/js-yaml' },
  { pkg: 'minimatch', version: '10.2.3', lockKey: 'node_modules/minimatch' },
  { pkg: 'sharp', version: '0.35.5', lockKey: 'node_modules/sharp' },
  { pkg: 'source-map-js', version: '1.2.2', lockKey: 'node_modules/source-map-js' },
  { pkg: 'undici', version: '6.28.1', lockKey: 'node_modules/undici' },
];

// Versions explicitly named as vulnerable in the advisories — must not remain
// in the lockfile under the packages that were flagged.
const VULNERABLE: Array<{ name: string; version: string }> = [
  { name: 'next', version: '16.1.4' },
  { name: 'storybook', version: '10.5.3' },
  { name: '@storybook/addon-vitest', version: '10.5.3' },
  { name: 'vite', version: '8.1.5' },
  { name: 'zod', version: '4.3.6' },
  { name: 'brace-expansion', version: '5.0.8' },
  { name: 'browserslist', version: '4.28.1' },
  { name: 'flatted', version: '3.3.3' },
  { name: 'image-size', version: '2.0.2' },
  { name: 'js-yaml', version: '4.1.1' },
  { name: 'minimatch', version: '3.1.3' },
  { name: 'sharp', version: '0.34.5' },
  { name: 'source-map-js', version: '1.2.1' },
  { name: 'undici', version: '7.28.0' },
];

function packageNameFromKey(key: string): string | undefined {
  const idx = key.lastIndexOf('node_modules/');
  if (idx < 0) return undefined;
  const tail = key.slice(idx + 'node_modules/'.length);
  // Scoped packages keep their `@scope/` prefix in the directory path.
  return tail.startsWith('@') ? tail : tail.split('/')[0];
}

describe('CVE dependency updates', () => {
  it('pins each named direct dependency to its fixed version in package.json', () => {
    for (const { pkg: name, pin } of FIXED) {
      if (!pin) continue;
      expect(`${name}@${allPins[name]}`, 'package.json pin').toBe(`${name}@${pin}`);
    }
  });

  it('mirrors the same pins in the lockfile root entry', () => {
    for (const { pkg: name, pin } of FIXED) {
      if (!pin) continue;
      expect(`${name}@${rootMirror[name]}`, 'lockfile root pin').toBe(`${name}@${pin}`);
    }
  });

  it('resolves each named package to its fixed version in package-lock.json', () => {
    for (const { pkg: name, version, lockKey } of FIXED) {
      const entry = lockfile.packages[lockKey];
      expect(entry, `missing lock entry for ${lockKey}`).toBeDefined();
      expect(`${name}@${entry?.version}`, lockKey).toBe(`${name}@${version}`);
    }
  });

  it('does not leave any named package at its vulnerable version', () => {
    const offenders: string[] = [];
    for (const [key, entry] of Object.entries(lockfile.packages)) {
      if (!key.startsWith('node_modules/')) continue;
      const name = packageNameFromKey(key);
      if (!name || entry.version === undefined) continue;
      for (const { name: vulnName, version } of VULNERABLE) {
        if (name === vulnName && entry.version === version) {
          offenders.push(`${key}@${version}`);
        }
      }
    }
    expect(offenders).toEqual([]);
  });
});
