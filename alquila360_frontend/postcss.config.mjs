/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},  // <--- ESTA es la línea nueva clave
    autoprefixer: {},
  },
};

export default config;