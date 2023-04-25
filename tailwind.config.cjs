/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        shorebirdPrimary: 'rgb(0, 112, 144)',
        shorebirdSecondary: 'rgb(169, 146, 125)',
        shorebirdBg1: 'rgb(31, 32, 35)',
        shorebirdBg2: 'rgb(38, 39, 43)',
        shorebirdBg3: 'rgb(48, 49, 54)',
        shorebirdBg3Hover: 'rgb(55, 56, 62)',
        shorebirdDivider: 'rgb(255,255,255,0.1)',
        shorebirdTextGray: 'rgb(174, 178, 183)',
        shorebirdBgTransparent: 'rgb(31, 32, 35, 0.7)',
        shorebirdBgTransparentDarker: 'rgb(0,0,0,0.5)',
        shorebirdBgTransparentLighter: 'rgb(48, 49, 54, 0.7)',
      },
      fontFamily: {
        Inter: 'Inter',
      },
      screens: {
        xs: '530px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        xll: '1400px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
