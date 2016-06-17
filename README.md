# IT255-Projektni-zadatak
## AngularFire Blogging Platforma

## Tehnologije
- Frontend [AngularJS][angularjs]
- Backend [Firebase][Firebase]

## Uvod
Ova aplikacija predstavlja blogging aplikaciju kreiranu pomoću AngularJS-a i Firebase-a.
Kroz aplikaciju moguće je kreirati svoj korisnički nalog, pristupiti sistemu, kreirati nove postove, editovati iste, brisati, komentarisati i lajkovati postove.
Aplikacija je bazirana na AngularSeed layout-u: [angular-seed][angular-seed]

## Preduslovi
### Node.js
Potrebno je instalirati [Node.js][node-download]

### Baza podataka
Potrebno je kreirati korisnički nalog na [Firebase][Firebase].
Kreiranjem naloga dobićete Firebase app key u ovom obliku:

```
new Firebase('https://<<firebase-app-key>>.firebaseio.com/');
```
I njega je potrebno zameniti u JavaScript fajlovima. Nakon toga potrebno je importovati bazu podataka projekta u vaš Firebase.
Nakon toga je potrebno uključiti Login & Auth Email & Password autentifikaciju u okviru Firebase-a.

### Pokretanje projekta

```
- Otvorite Command Prompt
- Udjete u direktorijum gde se nalazi projekat, npr: ~cd Desktop/Blogspace
- Pokrenete npm install
- Pokrenete npm start
- localhost/8000
```
### Testiranje

Za testiranje aplikacije možete koristiti [Karma][karma].
- Pokrenite test sa `npm test`
- Browser će pristupiti Karma serveru. Ako koristite browser koji nije Firefox ili Chrome, možete pristupiti iz nekog drugog browser-a unosom URL-a aplikacije ili promenom parametara u `karma.config.js` fajlu.

## Pregled aplikacije
### App.js
Definiše sve route aplikacije.
```
angular.module('myApp', [
  'ngRoute',
  'myApp.home',
  'myApp.register',
  'myApp.welcome',
  'myApp.addPost',
  'myApp.test'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}]);
```
### Home
Početna stranica projekta.
```
angular.module('myApp.home', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])
```

### Register
Registracija korisničkog naloga.
```
angular.module('myApp.register', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/register', {
    templateUrl: 'register/register.html',
    controller: 'RegisterCtrl'
  });
}])
```

### Welcome
Prikaz kreiranih postova i funkcionalnosti apliakcije.
```
angular.module('myApp.welcome', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/welcome', {
        templateUrl: 'welcome/welcome.html',
        controller: 'WelcomeCtrl'
    });
}])
```

### AddPost
Dodavanje novih postova.
```
angular.module('myApp.addPost', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/addPost', {
    templateUrl: 'addPost/addPost.html',
    controller: 'AddPostCtrl'
  });
}])
```

## Kontakt
ajla.dzekovi.2470@metropolitan.ac.rs

[angular-seed]: https://github.com/angular/angular-seed
[Firebase]: https://www.firebase.com/
[jasmine]: https://jasmine.github.io/
[karma]: https://karma-runner.github.io
[node-download]: https://nodejs.org/en/download/
[angularjs]: https://angularjs.org/
