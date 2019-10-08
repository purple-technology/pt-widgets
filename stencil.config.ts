import {Config} from '@stencil/core'
import {stylus} from '@stencil/stylus'
import nodePolyfills from 'rollup-plugin-node-polyfills'

export const config: Config = {
  namespace: 'purple-web-components',
  outputTargets:[
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'www',
      serviceWorker: null
    },
    {
      type: 'docs-readme'
    }
  ],
  preamble: 'Purple Technology',
  plugins: [
    nodePolyfills(),
    stylus({
      includePaths: [
        'src/globals'
      ]
    })
  ]
}
