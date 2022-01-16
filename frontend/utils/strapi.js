import Strapi from 'strapi-sdk-js';

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL;

const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

const strapi = new Strapi({
  url: STRAPI_URL,
  store: {
    key: 'strapi_jwt',
    useLocalStorage: false,
    cookieOptions: { path: '/' },
  },
  axiosOptions: {},
});

export { strapi};
