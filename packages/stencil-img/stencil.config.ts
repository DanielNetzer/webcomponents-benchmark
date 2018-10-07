import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'stencil-img',
  hashFileNames: false,
  outputTargets: [
    {
      type: 'www',
      resourcesUrl: '/elements/stencil/stencil-img',
      serviceWorker: null
    }
  ]
};
