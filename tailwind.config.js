/** Hotel 52 — «Old Odesa, new vibe» */
export default {
  content: ['./src/**/*.{mjs,js,html}'],
  theme: {
    screens: { sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1440px' },
    extend: {
      colors: {
        sand: { DEFAULT: '#F4EDE3', 50: '#FBF8F3', 100: '#F8F2EA', 200: '#EFE5D7', 300: '#E4D6C2', 400: '#D2BFA4' },
        moss: { DEFAULT: '#3F5A3C', 50: '#EEF2EC', 100: '#DCE5D8', 300: '#93A98C', 400: '#5D7A58', 600: '#344B32', 700: '#2A3D28', 800: '#21301F', 900: '#182317' },
        sun: { DEFAULT: '#D9643A', ink: '#A8441F', soft: '#F2C9B5' },
        mustard: { DEFAULT: '#E3A82B', soft: '#F3DCA3' },
        wood: { DEFAULT: '#C9A77C', light: '#E6D3B6' },
        ink: { DEFAULT: '#1B1C17', soft: '#3A3B34', muted: '#5E5D55' },
      },
      fontFamily: {
        display: ['Unbounded', 'system-ui', 'sans-serif'],
        sans: ['Manrope', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.6rem, 7.2vw, 7rem)', { lineHeight: '0.95', letterSpacing: '-0.035em' }],
        'display-lg': ['clamp(2.1rem, 5vw, 4.6rem)', { lineHeight: '1', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(1.7rem, 3.4vw, 3rem)', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
        'display-sm': ['clamp(1.25rem, 2vw, 1.6rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
      },
      borderRadius: { '4xl': '2rem', card: '1.5rem', tile: '1rem' },
      maxWidth: { site: '84rem', prose: '38rem' },
      zIndex: { header: '40', mobilebar: '45', overlay: '60', dialog: '70' },
      transitionTimingFunction: { out: 'cubic-bezier(.16,1,.3,1)', spring: 'cubic-bezier(.34,1.56,.64,1)' },
      boxShadow: {
        soft: '0 1px 2px rgba(63,46,20,.06), 0 12px 32px -12px rgba(63,46,20,.18)',
        lift: '0 2px 4px rgba(63,46,20,.06), 0 28px 60px -24px rgba(63,46,20,.35)',
        float: '0 30px 80px -30px rgba(24,35,23,.55)',
      },
    },
  },
  plugins: [],
};
