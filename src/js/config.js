System.config({
  "baseURL": "/",
  "defaultJSExtensions": true,
  "transpiler": "traceur",
  "paths": {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },
  "bundles": {
    "build/main": [
      "src/js/main"
    ]
  }
});

System.config({
  "map": {
    "ded/bonzo": "github:ded/bonzo@2.0.0",
    "guardian/iframe-messenger": "github:guardian/iframe-messenger@master",
    "hammer": "github:hammerjs/hammer.js@2.0.4",
    "json": "github:systemjs/plugin-json@0.1.0",
    "mustache": "github:janl/mustache.js@2.1.3",
    "reqwest": "github:ded/reqwest@1.1.5",
    "text": "github:systemjs/plugin-text@0.0.2",
    "traceur": "github:jmcriffey/bower-traceur@0.0.87",
    "traceur-runtime": "github:jmcriffey/bower-traceur-runtime@0.0.87"
  }
});

