import { oauth2 } from './oauth2.environment'
import { firebase } from './firebase.environment';

export const environment = {
  ...firebase,
  ...oauth2,
  production: true,
  name: 'microlab-unibg',
  version: '1.0.0'
};
