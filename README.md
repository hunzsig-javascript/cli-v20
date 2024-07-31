# cli-v20
A cli for js with webpack

[![NPM version](https://img.shields.io/npm/v/hunzsig-javascript-cli-v16.svg)](https://www.npmjs.com/package/hunzsig-javascript-cli-v16)
[![NPM downloads](http://img.shields.io/npm/dm/hunzsig-javascript-cli-v16.svg?style=flat-square)](http://npmjs.com/hunzsig-javascript-cli-v16)

#### please run:
    cnpm install hunzsig-javascript-cli-v16@latest --save-dev

#### cmd
    cliv20 dev -p 9235[port]
    cliv20 build
    cliv20 app

#### buildConfig in package.json
> dropConsole : drop console [default true]
>
> primaryTheme : webpackage->options->modifyVars
>
> import : demand loading [default null]
>
> appHtml : html template [default {"dev": "dev.html", "prod": "index.html","app": "app.html"}]
>
> publicUrl : support react-router4 BrowserRouter [default {"dev": "/", "prod": "/","app": "./"}]
>
> entry : entry like webpackage [default {"dev": "src/index.js", "prod": "src/dev.js","app": "src/app.js"}]

```
"buildConfig": {
  "dropConsole": true,
  "primaryTheme": {
     "primary-color": "#6699ff",
     "brand-primary": "green",
     "color-text-base":  "#333"
  },
  "appHtml": {
    "dev": "dev.html",
    "prod": "index.html",
    "app": "app.html"
  },
  "publicUrl": {
    "dev": "/",
    "prod": "/",
    "app": "./"
  },
  "entry": {
    "dev": "src/index.js",
    "prod": "src/index.js",
    "app": "src/app.js"
  },
  "import": [
    {
      "libraryName": "antd",
      "style": true
    }
  ]
}
```

### proxyConfig in package.json, example:
```
"proxyConfig": {
  "/api": "http://myapi",
  "/api2": "http://myapi2"
}
```

### copyConfig in package.json
##### copyConfig will copy files which hope into the dir-dist when run 'npm run build'
##### the public dir is auto copy to dist dir
```
"copyConfig": {
  "include": [],
  "except": []
}
```

