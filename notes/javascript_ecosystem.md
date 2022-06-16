# Javascript Ecosystem

Notes from this really helpful intro: https://peterxjang.com/blog/modern-javascript-explained-for-dinosaurs.html

## Beyond Raw HTML, CSS and JS Files

### npm
* Package manager
  * Problem solved: having to download any third-party libraries manually whenever they are changed and save them to your files so you can reference them
* Task runner
  * Simplify and call any cli scripts used by any packages known to `npm` as part of the build process


### webpack
* Module bundler
* History: Most programming languages provide a way to import code from one file into another. JavaScript wasn’t originally designed with this feature, because JavaScript was designed to only run in the browser, with no access to the file system of the client’s computer (for security reasons). So for the longest time, organizing JavaScript code in multiple files required you to load each file with variables shared globally.
* Module bundler gets around this problem with a build step (which has access to the file system) to create a final output that is browser compatible (which doesn't need access to the file system)
* Allows us to use `require` and `import` statements to reference other modules
* When we run webpack, it will find any `require/import` statements and replace them with appropriate code to create a single output file (by default `**dist/main.js`)
* Can reference the single file in `<script>` tag of HTML file instead of having to list all modules in separate `<script>` tags

### babel
* Transpiler
* Translates nifty new features of new JS versions to old JS versions, so we can start using useful new features without waiting for all browsers to get updated

### Example of putting all these tools together
Creating npm package.json
```
npm init
```
Installing npm packages:
```
npm install moment --save
npm install webpack webpack-cli --save-dev
npm install @babel/core @babel/preset-denv babel-loader --save-dev
```
package.json (with added custom script commands):
```js
{  
  "name": "modern-javascript-example",  
  "version": "1.0.0",  
  "description": "",  
  "main": "index.js",  
  "scripts": {  
    "test": "echo \"Error: no test specified\" && exit 1",  
    "build": "webpack --progress -p",  
    "watch": "webpack --progress --watch",  
    "serve": "webpack-dev-server --open"  
  },  
  "author": "",  
  "license": "ISC",  
  "dependencies": {  
    "moment": "^2.19.1"  
  },  
  "devDependencies": {  
    "@babel/core": "^7.0.0",  
    "@babel/preset-env": "^7.0.0",  
    "babel-loader": "^8.0.2",  
    "webpack": "^3.7.1",  
    "webpack-dev-server": "^3.1.6"  
  }  
}
```
Using npm scripts:
```
npm run build
npm run watch
```
webpack.config.js (also configured to use babel-loader):
```js
module.exports = {  
  mode: 'development',  
  entry: './index.js',  
  output: {  
    filename: 'main.js',  
    publicPath: 'dist'  
  },  
  module: {  
    rules: [  
      {  
        test: /\.js$/,  
        exclude: /node_modules/,  
        use: {  
          loader: 'babel-loader',  
          options: {  
            presets: ['@babel/preset-env']  
          }  
        }  
      }  
    ]  
  } 
};
```
Example index.js (using import statement and ES6 template string):
```js
import moment from 'moment';

console.log("Hello from JavaScript!");  
console.log(moment().startOf('day').fromNow());

var name = "Bob", time = "today";  
console.log(`Hello ${name}, how are you ${time}?`);
```
Example index.html (referencing only main.js file created by webpack):
```html
<!DOCTYPE html>  
<html lang="en">  
<head>  
  <meta charset="UTF-8">  
  <title>JavaScript Example</title>  
  <script src="dist/main.js"></script>
</head>  
<body>  
  <h1>Hello from HTML!</h1>  
</body>  
</html>
```


