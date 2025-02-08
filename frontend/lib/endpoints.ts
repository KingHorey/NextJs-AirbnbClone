const endpoints = Object.freeze({
  properties: {
    allProprties: (x: string) => `/properties/${x}`,
    singleProperty: (x: string) => `/properties/${x}`,
  },
});
export default endpoints;
