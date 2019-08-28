import { a as patchEsm, b as bootstrapLazy } from './core-6e273e08.js';

const defineCustomElements = (win, options) => {
  return patchEsm().then(() => {
    bootstrapLazy([["pt-widget",[[0,"pt-widget",{"class":[1],"strategy":[1],"height":[1],"width":[32],"data":[32],"name":[32],"currency":[32],"gain":[32]},[[9,"resize","handleWindowResize"]]]]]], options);
  });
};

export { defineCustomElements };
