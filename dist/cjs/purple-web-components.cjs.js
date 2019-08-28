'use strict';

const core = require('./core-806b435f.js');

core.patchBrowser().then(options => {
  return core.bootstrapLazy([["pt-widget.cjs",[[0,"pt-widget",{"class":[1],"strategy":[1],"height":[1],"width":[32],"data":[32],"name":[32],"currency":[32],"gain":[32]},[[9,"resize","handleWindowResize"]]]]]], options);
});
