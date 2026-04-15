/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: { 50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd', 400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 800: '#1e40af', 900: '#1e3a8a', 950: '#172554' },
        secondary: { 50: '#faf5ff', 100: '#f3e8ff', 200: '#e9d5ff', 300: '#d8b4fe', 400: '#c084fc', 500: '#a855f7', 600: '#9333ea', 700: '#7e22ce', 800: '#6b21a8', 900: '#581c87', 950: '#3b0764' },
        success: { DEFAULT: '#22c55e', light: '#dcfce7', dark: '#166534' },
        warning: { DEFAULT: '#f59e0b', light: '#fef3c7', dark: '#92400e' },
        error: { DEFAULT: '#ef4444', light: '#fee2e2', dark: '#991b1b' },
        info: { DEFAULT: '#06b6d4', light: '#cffafe', dark: '#155e75' },
      },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'], heading: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'], mono: ['JetBrains Mono', 'Consolas', 'monospace'] },
      boxShadow: { card: '0 2px 8px 0 rgb(0 0 0 / 0.08)', 'card-hover': '0 8px 24px 0 rgb(0 0 0 / 0.12)' },
      zIndex: { dropdown: 1000, sticky: 1020, fixed: 1030, 'modal-backdrop': 1040, modal: 1050, popover: 1060, tooltip: 1070, toast: 1080 },
    },
  },
  plugins: [],
}
