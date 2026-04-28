/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          DEFAULT: '#3730A3',
          light: '#EEF2FF',
          dark: '#312E81',
        },
        amber: {
          DEFAULT: '#F59E0B',
          light: '#FFFBEB',
        },
        emerald: {
          DEFAULT: '#10B981',
        },
        danger: {
          DEFAULT: '#EF4444',
          light: '#FEF2F2',
        },
        slate: {
          900: '#1E293B',
          500: '#64748B',
          100: '#F1F5F9',
        },
        background: '#F8FAFC',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'xl': '0.75rem',
      }
    },
  },
  plugins: [],
}
