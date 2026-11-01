/**
 * All colours come from CSS variables declared in src/styles/global.css.
 * Change the palette there — never hard-code colours in components.
 */
const token = (name) => `rgb(var(--color-${name}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
      },
      colors: {
        background: token('background'),
        surface: token('surface'),
        subtle: token('subtle'),
        line: token('line'),
        foreground: token('foreground'),
        muted: token('muted'),
        accent: {
          DEFAULT: token('accent'),
          hover: token('accent-hover'),
          soft: token('accent-soft'),
          foreground: token('accent-foreground'),
        },
        danger: {
          DEFAULT: token('danger'),
          soft: token('danger-soft'),
        },
        success: {
          DEFAULT: token('success'),
          soft: token('success-soft'),
        },
      },
      borderRadius: {
        card: 'var(--radius-card)',
        control: 'var(--radius-control)',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        pop: 'var(--shadow-pop)',
      },
    },
  },
  plugins: [],
};
