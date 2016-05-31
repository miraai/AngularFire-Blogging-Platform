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

Forma za pristupanje:
```
      <form class="form-signin" name="signinForm" role="form">
        <div class="form-group" ng-class="{ 'has-error' : signinForm.email.$invalid }">
          <label style="color: black;">Email</label>
          <input type="email" name="email" class="form-control" ng-model="user.email">
          <p class="help-block" ng-show="signinForm.email.$invalid">Enter a valid email.</p>
        </div> 
        <div class="form-group" ng-class="{ 'has-error' : signinForm.password.$invalid }">
          <label style="color: black;">Password</label>
          <input type="password" name="password" class="form-control" ng-model="user.password" ng-minlength="3">
        </div>  
        <label class="checkbox" >
          <a href="#/register" style="color: black;"> 
            Sign Up
          </a>
        </label>
        <button ladda-loading="login.loading" data-style="expand-right" ng-disabled="!user.email || !user.password" type="button" ng-click="SignIn($event)" class="btn btn-lg segoe-ui-light ladda-button btn-primary btn-block" style="background-color: #555555;border-color: #555555;">
          <span class="ladda-label" >Sign In</span>
        </button>
      </form>
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

Forma za registraciju:
```
      <form class="form-signin" name="regForm">
        <div class="form-group" ng-class="{ 'has-error' : regForm.email.$invalid }">
            <label style="color: black;">Email</label>
            <input type="email" name="email" class="form-control" ng-model="user.email">
            <p class="help-block" ng-show="regForm.email.$invalid">Enter a valid email.</p>
        </div> 
        <div class="form-group" ng-class="{ 'has-error' : regForm.password.$invalid }">
            <label style="color: black;">Password</label>
            <input type="password" name="password" class="form-control" ng-model="user.password" ng-minlength="8">
            <p class="help-block" ng-show="regForm.password.$error.minlength">Minimal password length is 8 characters.</p>
            <p style="color:red;" ng-show="regError">{{regErrorMessage}}</p>
        </div>  
        <label class="checkbox" >
          <a href="#/home" style="color: black;"> 
            Sign In
          </a>
        </label>
        <button type="button" ladda-loading="login.loading" data-style="expand-right" ng-click="signUp();" ng-disabled="!user.email || !user.password" class="btn btn-lg segoe-ui-light ladda-button btn-primary btn-block" style="background-color: #555555;border-color: #555555;">Register</button>
      </form>
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

Objavljivanje posta:
```
    <div class="list-group" ng-repeat="article in articles | orderBy:'-$id'">
      <a href="#" onclick="return false;" class="list-group-item active">
        <h4 class="list-group-item-heading">{{article.title}}</h4>

        <div ng-init="limit = 300; moreShown = false">
          {{article.post | limitTo: limit}}{{article.post.length > limit ? '...' : ''}}
          <button ng-show="article.post.length > limit" href ng-click="limit=article.post.length; moreShown = true" style="color:black">  More
          </button>
          <button ng-show="moreShown" href ng-click="limit=300; moreShown = false" style="color:black"> Less </button>
        </div>
 
        <span class="pull-right">
          <button class="btn btn-xs btn-sm" ng-click="editPost(article.$id)" data-target="#editModal" style="color:black">
            EDIT
          </button>

          <button class="btn btn-xs btn-sm" ng-click="confirmDelete(article.$id)" data-target="#deleteModal" style="color:black">
            DELETE
          </button>

          <button type="button" class="btn btn-xs btn-sm" ng-click="addComment()" data-target="#addCommentModal" style="color:black">
            <span class="glyphicon glyphicon-comment"></span>
          </button>

          <button type="button" class="btn btn-xs btn-sm" ng-click="count = 1;" ng-init="count=0" style="color:black">
            <span class="glyphicon glyphicon-heart">{{count}}</span>
            <button type="button" class="btn btn-xs btn-sm" ng-click="count = 0;" ng-init="count=1" style="color:black">
              <span class="glyphicon glyphicon-heart"></span>
            </button>
          </button>

        </span>
      </a>
    </div>
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
Forma za kreiranje posta:
```
      <form class="form-horizontal" ng-submit="AddPost()">
        <fieldset>
          <!-- Forma za kreiranje posta -->
          <legend>Create Post</legend>

          <!-- Naslov -->
          <div class="form-group">
            <label class="col-md-4 control-label" for="txtTitle" style="color:black">Title</label>  
            <div class="col-md-4">
            <input id="txtTitle" name="txtTitle" ng-model="article.title" type="text" placeholder="Subject" class="form-control input-md">
            </div>
          </div>

          <!-- Sadrzaj -->
          <div class="form-group">
            <label class="col-md-4 control-label" for="txtPost" style="color:black">Post</label>
            <div class="col-md-4">                     
              <textarea class="form-control" id="txtPost" ng-model="article.post" name="txtPost" ></textarea>
            </div>
          </div>

          <!-- Dugme -->
          <div class="form-group">
            <label class="col-md-4 control-label" for="singlebutton"></label>
            <div class="col-md-4">
              <button ladda-loading="login.loading" data-style="expand-right" ng-disabled="!article.title || !article.post" name="singlebutton" class="btn btn-primary segoe-ui-light ladda-button" type="submit"><span class="ladda-label">Submit</span></button>
            </div>
          </div>
        </fieldset>
      </form>
  ```
  
## Kontakt
ajla.dzekovi.2470@metropolitan.ac.rs

[angular-seed]: https://github.com/angular/angular-seed
[Firebase]: https://www.firebase.com/
[jasmine]: https://jasmine.github.io/
[karma]: https://karma-runner.github.io
[node-download]: https://nodejs.org/en/download/
[angularjs]: https://angularjs.org/
