'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-806b435f.js');

const defineCustomElements = (win, options) => {
  return core.patchEsm().then(() => {
    core.bootstrapLazy([["pt-widget.cjs",[[0,"pt-widget",{"class":[1],"strategy":[1],"height":[1],"width":[32],"data":[32],"name":[32],"currency":[32],"gain":[32]},[[9,"resize","handleWindowResize"]]]]]], options);
  });
};

exports.defineCustomElements = defineCustomElements;
