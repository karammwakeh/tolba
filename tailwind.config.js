/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          bg:        '#050A14',
          surface:   '#0B1120',
          card:      '#0F1A2B',
          elevated:  '#1C2A3A',
          border:    '#1E3048',
          muted:     '#8899AA',
          primary:   '#F0F4F8',
          accent:    '#00E5FF',
          accentDim: '#00B8CC',
          accentBg:  'rgba(0,229,255,0.08)',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1', letterSpacing: '0.06em' }],
      },
      screens: { xs: '480px' },
      borderRadius: {
        '4xl': '2rem',
      },
      transitionTimingFunction: {
        'page':  'cubic-bezier(0.16, 1, 0.3, 1)',
        'enter': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'exit':  'cubic-bezier(0.45, 0, 0.55, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '550': '550ms',
        '700': '700ms',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%':      { transform: 'translateY(-18px) rotate(1.5deg)' },
          '66%':      { transform: 'translateY(-8px) rotate(-1deg)' },
        },
        floatB: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%':      { transform: 'translateY(-22px) rotate(-2deg)' },
        },
        pulse_slow: {
          '0%, 100%': { opacity: '0.35' },
          '50%':      { opacity: '0.8' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.5' },
          '50%':      { transform: 'scale(1.04)', opacity: '0.9' },
        },
        ticker: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        stepLine: {
          '0%':   { scaleY: 0, transformOrigin: 'top center' },
          '100%': { scaleY: 1, transformOrigin: 'top center' },
        },
        wipeIn: {
          '0%':   { clipPath: 'inset(0 100% 0 0)' },
          '100%': { clipPath: 'inset(0 0% 0 0)' },
        },
        // Page transition wipe
        pageWipeDown: {
          '0%':   { transform: 'scaleY(0)', transformOrigin: 'top' },
          '50%':  { transform: 'scaleY(1)', transformOrigin: 'top' },
          '50.01%': { transformOrigin: 'bottom' },
          '100%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
        },
      },
      animation: {
        'float':       'float 9s ease-in-out infinite',
        'floatB':      'floatB 12s ease-in-out infinite',
        'floatC':      'float 7s ease-in-out infinite 2s',
        'pulse_slow':  'pulse_slow 4s ease-in-out infinite',
        'breathe':     'breathe 5s ease-in-out infinite',
        'ticker':      'ticker 28s linear infinite',
        'shimmer':     'shimmer 2.5s linear infinite',
        'wipe-in':     'wipeIn 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
      },
      boxShadow: {
        'glow-sm':  '0 0 14px rgba(0,229,255,0.14), 0 0 28px rgba(0,229,255,0.06)',
        'glow-md':  '0 0 24px rgba(0,229,255,0.2),  0 0 48px rgba(0,229,255,0.08)',
        'card':     '0 4px 24px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.03)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,229,255,0.12)',
        'form-focus': '0 0 0 3px rgba(0,229,255,0.1)',
      },
      backgroundImage: {
        'grid-dots': 'radial-gradient(circle, rgba(0,229,255,0.08) 1px, transparent 1px)',
        'grid-lines': `
          linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px)
        `,
        'shimmer-gradient': 'linear-gradient(90deg, transparent 0%, rgba(0,229,255,0.08) 50%, transparent 100%)',
      },
      backgroundSize: {
        'grid-dots':  '32px 32px',
        'grid-lines': '64px 64px',
      },
    },
  },
  plugins: [],
}
