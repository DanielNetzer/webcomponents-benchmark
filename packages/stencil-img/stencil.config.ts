import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'stencil-img',
  outputTargets: [
    {
      type: 'dist'
    },
    {
      type: 'www',
      serviceWorker: null
    }
  ]
};
