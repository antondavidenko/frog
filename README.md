# Frog game
language: TypeScript 
framework: Phaser 3

Demo: http://antondavidenko.com/games/frog_v2/

# Setup
You’ll need to install a few things before you have a working copy of the project.

## 1. Clone or download this repo:
Navigate into your workspace directory.
Run:
```git clone https://github.com/antondavidenko/frog.git```

## 2. Install node.js and npm:
https://nodejs.org/en/

## 3. Install dependencies (optionally you could install [yarn](https://yarnpkg.com/)):
Navigate to the cloned repo’s directory.
Run:
```npm install```
or if you choose yarn, just run ```yarn```

## 4. Run the build process:
Run:
```npm run start```
This will start a watch process, so you can change the source and the next build will be prepare automatically

## 5. Run web server:
In order to see it work you are need for local web server run in your workspace directory.

## Build for deployment:
Run:
```npm run deploy```
This will optimize and minimize the compiled bundle.

## Credits
This work is based off of several existing repos:

https://github.com/troyedwardsjr/phaser3-typescript-webpack

https://github.com/mariyadavydova/starfall-phaser3-typescript

https://github.com/nkholski/phaser3-es6-webpack

https://github.com/lean/phaser-es6-webpack

Most useful Phaser 3 examples:

https://labs.phaser.io/