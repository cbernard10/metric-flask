/** @type {import('tailwindcss')***REMOVED***Config} */
module***REMOVED***exports = {
  content: [
    '***REMOVED***/pages/**/****REMOVED***{js,ts,jsx,tsx,mdx}',
    '***REMOVED***/components/**/****REMOVED***{js,ts,jsx,tsx,mdx}',
    '***REMOVED***/app/**/****REMOVED***{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
