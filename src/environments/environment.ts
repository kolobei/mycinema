// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  LANGUAGES: ["en-gb", "el"],
  DEFAULT_LANG: "el",
  HOST: "https://api.themoviedb.org",
  VERSION: "/3",
  DISCOVER: "/discover/movie",
  KEY: "?api_key=9198fa6d9a9713bc6b03ee9582525917"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
