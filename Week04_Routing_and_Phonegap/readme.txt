1. install Node.js
http://nodejs.org/dist/v0.10.31/node-v0.10.31.pkg

2. install phonegap cli, ios-sim, ios-deploy
$ sudo npm install -g phonegap ios-sim ios-deploy

3. create a phone gap project
$ phonegap create myApp com.apon.deadliner deadliner

4. add mandatory plugins
$ cd myApp
$ phonegap plugin add org.apache.cordova.device
$ phonegap plugin add org.apache.cordova.dialogs
$ phonegap plugin add org.apache.cordova.geolocation
$ phonegap plugin add org.apache.cordova.statusbar
// extra, not necessary
$ phonegap plugin add https://github.com/danwilson/google-analytics-plugin.git

5. add platform
$ phonegap build ios

6. Run it
$ phonegap run ios
CTRL + C when enter debug phase, otherwise you will not be able to terminate

### try logging geolocation and display it in a map

Midterm project (Due in Week 7)
– Create a web-application that tracks anything of your desire. 
– The app takes an input of any form. (text, gesture, drawing, phone axis, geolocation, etc, etc)
– The app memorizes content via localStorage, meaning it stores and loads data from localStorage.
– The user is able to create/update/remove the data from the app
– Take it further with Phonegap and/or multi-page within Single Page Application is a huge plus!

– You don't need to follow the MVC pattern it doesn't go with your coding style.

