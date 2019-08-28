import { configure, addDecorator, addParameters } from '@storybook/html';
import { create } from '@storybook/theming'
import { withTests } from "@storybook/addon-jest";
import results from "../jest-test-results.json";

const theme = create({
  base: 'light',
  
/*
  colorPrimary: 'hotpink',
  colorSecondary: 'deepskyblue',
  // UI
  appBg: 'white',
  appContentBg: 'white',
  appBorderColor: 'grey',
  appBorderRadius: 4,

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: 'black',
  textInverseColor: 'rgba(255,255,255,0.9)',

  // Toolbar default and active colors
  barTextColor: 'silver',
  barSelectedColor: 'black',
  barBg: 'white',

  // Form colors
  inputBg: 'white',
  inputBorder: 'silver',
  inputTextColor: 'black',
  inputBorderRadius: 4,
*/
  brandTitle: 'Purple Web Components',
  //brandUrl: 'https://example.com',
  //brandImage: 'https://www.purple-technology.com/2072473f6e8356bd743b97387b175fc28c03139e/images/icons/logo-menu2x.png',
})

addParameters({
  options: {
    theme
  }
})

addDecorator(
  withTests({
    results,
    filesExt: ".spec.ts"
  })
);

const req = require.context("../src", true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}
configure(loadStories, module);