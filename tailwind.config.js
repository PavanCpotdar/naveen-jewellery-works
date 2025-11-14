module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#16a34a',
          blue: '#0ea5e9',
          yellow: '#f59e0b'
        }
      },
      boxShadow: {
        'card': '0 8px 20px rgba(16,24,40,0.08)'
      }
    }
  },
  plugins: []
}
