import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

const eslintConfig = [
  ...nextVitals,
  ...nextTypescript,
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'out/**',
      // Vendored agent skill scripts, not project source.
      '.agents/**',
      '.claude/**',
    ],
  },
];

export default eslintConfig;
