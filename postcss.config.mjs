const config = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
         bodycolor: '#1c1c22',
        lightsky: '#00ff99',
         hovercolor: '#00e187',
      },
     animation: {
        'rotate-slow': 'rotate 20s linear infinite',
        'rotate-reverse': 'rotate 25s linear infinite reverse',
        'float-gentle': 'float 8s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-medium': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite 1s',
        'pulse-fast': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite 0.5s',
      },
      keyframes: {
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulse: {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '0.2' },
        },
      },
    },
  },
  plugins: ["@tailwindcss/postcss"],
};

export default config;

