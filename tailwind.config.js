module.exports = {
  purge: [
    'src/**/*.js',
    'src/**/*.jsx',
    'src/**/*.ts',
    'src/**/*.tsx',
    'public/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        'floral-white': '#FFF9F0',
        'gold-crayola': '#FFCA80',
        'light-orange': '#FFB040',
        'yellow-orange': '#FF9500',
        'neon-orange': '#FF6600'
      }
    },
  },
  variants: {},
  plugins: [],
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
}
