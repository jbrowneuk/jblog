import { BASE_PATH } from '../app/variables';

export const environment = {
  production: true
};

export const ENV_PROVIDERS = [
  { provide: BASE_PATH, useValue: '/api' }
];
