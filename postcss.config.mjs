// postcss.config.mjs
export default {
  plugins: {
    // Tailwind CSS v4
    '@tailwindcss/postcss': {},
    
    // Autoprefixer for vendor prefixes
    'autoprefixer': {},
    
    // CSS nano for production minification (optional)
    ...(process.env.NODE_ENV === 'production' ? {
      'cssnano': {
        preset: ['default', {
          discardComments: { removeAll: true },
          normalizeWhitespace: true,
          cssDeclarationSorter: true,
          reduceIdents: false // Important for Tailwind
        }]
      }
    } : {})
  }
}