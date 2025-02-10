const endpoints = Object.freeze({
  properties: {
    ALL_PROPERTIES: (x: string) => `/properties/list/?q=${x}`,
    SINGLE_PROPERTY: (x: string) => `/properties/${x}`,
  },
});
export default endpoints;
