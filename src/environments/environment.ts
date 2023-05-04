// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'website-frontend-firebase',
    appId: '1:100730812687:web:1dc297c1e1fe548ee8267a',
    databaseURL: 'https://website-frontend-firebase-default-rtdb.europe-west1.firebasedatabase.app',
    storageBucket: 'website-frontend-firebase.appspot.com',
    locationId: 'europe-west',
    apiKey: 'AIzaSyCrn5ifRu3Q0qDKy6oE_lOeigl0Tcx4bYg',
    authDomain: 'website-frontend-firebase.firebaseapp.com',
    messagingSenderId: '100730812687',
    measurementId: 'G-5SC1C33J1T',
  },
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
