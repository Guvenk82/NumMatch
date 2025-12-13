/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          500: '#667eea',
          600: '#764ba2',
        }
      },
      animation: {
        'pop-in': 'popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'merge': 'merge 0.5s ease',
        'float-up': 'floatUp 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'screen-shake': 'screenShake 0.3s ease-in-out',
        'confetti-fall': 'confettiFall 0.8s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease',
        'slide-in': 'slideIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        popIn: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        merge: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.3)' },
          '100%': { transform: 'scale(1)' },
        },
        floatUp: {
          '0%': { transform: 'translate(-50%, -50%) scale(0)', opacity: '0' },
          '20%': { transform: 'translate(-50%, -50%) scale(1.2)', opacity: '1' },
          '40%': { transform: 'translate(-50%, -50%) scale(1)' },
          '100%': { transform: 'translate(-50%, -100px) scale(0.9)', opacity: '0' },
        },
        screenShake: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translate(-10px, -10px) rotate(-2deg)' },
          '20%, 40%, 60%, 80%': { transform: 'translate(10px, 10px) rotate(2deg)' },
        },
        confettiFall: {
          '0%': { transform: 'translate(0, 0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translate(var(--x, 0), var(--y, 150px)) rotate(180deg)', opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'scale(0.5) translateY(-50px)', opacity: '0' },
          '100%': { transform: 'scale(1) translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

