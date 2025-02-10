const endpoints = Object.freeze({
  properties: {
    ALL_PROPERTIES: (x: string) => `/property/list/?q=${x}`,
    SINGLE_PROPERTY: (x: string) => `/property/${x}`,
  },
});
export default endpoints;
