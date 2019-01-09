// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCj77V5X_b14aA0dfourw3uNhQnYLb7hQ4",
    authDomain: "online-store-50bbf.firebaseapp.com",
    databaseURL: "https://online-store-50bbf.firebaseio.com",
    projectId: "online-store-50bbf",
    storageBucket: "gs://online-store-50bbf.appspot.com/",
    messagingSenderId: "377554566224"
  },
  social: {
    fblink:'',
    linkedin:'',
    github:'',
    emailid:'',
    homelink:''
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
