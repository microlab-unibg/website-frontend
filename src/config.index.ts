import {writeFile} from 'fs';

import {name, version} from '../package.json';

const targetPath = './src/environments/environment.prod.ts';

const envConfigFile = `export const environment = {
   production: true,
   firebase: {
        apiKey: '${process.env['FIREBASE_API_KEY']}',
        projectId: 'website-frontend-firebase',
        appId: '1:100730812687:web:1dc297c1e1fe548ee8267a',
        databaseURL: 'https://website-frontend-firebase-default-rtdb.europe-west1.firebasedatabase.app', //
        storageBucket: 'website-frontend-firebase.appspot.com',
        locationId: 'europe-west',
        authDomain: 'website-frontend-firebase.firebaseapp.com',
        messagingSenderId: '100730812687',
        measurementId: 'G-5SC1C33J1T'
    },
    google_client_id: '${process.env['GOOGLE_AUTH_CLIENT_ID']}',
    name: '${name}',
    version: '${version}'
};
`;

writeFile(targetPath, envConfigFile, 'utf8', (err) => {
  if (err) {
    return console.log(err);
  }
});
