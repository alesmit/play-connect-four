# Play Connect Four
Connect Four (aka "Four in a row") Progressive Web App game made with Angular and Firebase.

![Connect Four demo](https://alesmit.github.io/demo/play-connect-four/connect-four-demo.gif)

## Play :red_circle: :large_blue_circle:
Go here and enjoy some spare time with your remote pal https://play-connect-four.firebaseapp.com  
The website is optimized for mobile.

## Development
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.8 using the `--service-worker` option.

### Dev server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build
Run `npm run build-prod-ngsw` to build the [PWA](https://developers.google.com/web/progressive-web-apps/) .

### Deploy on Firebase
Make sure to update your project credentials in [environment settings](src/environments/environment.prod.ts), then use the [CLI](https://github.com/firebase/firebase-tools) to deploy on Firebase hosting.

## To Do
- Add i18n using [ngx-translate](https://github.com/ngx-translate/core)
- Implement a better state management with [@ngrx](https://github.com/ngrx/platform) store and effects.

## Contributing
1. Fork this project
2. Push changes on a new branch for your feature
3. Use pull requests
