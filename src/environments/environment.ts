// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import { BASE_PATH } from '../app/variables';

export const environment = {
  production: false,
  featureToggles: []
};

export const ENV_PROVIDERS = [
  { provide: BASE_PATH, useValue: 'http://localhost:8080/api' }
];
