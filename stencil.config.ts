import {Config} from '@stencil/core'
import {stylus} from '@stencil/stylus'

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
    stylus({
      includePaths: [
        'src/globals'
      ]
    })
  ]
}
