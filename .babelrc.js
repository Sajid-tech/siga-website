// @ts-nocheck
/* eslint-disable no-undef */
/* eslint-env node */
export const presets = [
  [
    '@babel/preset-react',
    {
      runtime: 'automatic',
      development: process.env.NODE_ENV === 'development'
    }
  ]
];
export const plugins = [
  process.env.NODE_ENV === 'production' && [
    'transform-react-remove-prop-types',
    { removeImport: true }
  ]
].filter(Boolean);