PlatypusTS Distribution
==============

This repo is for distribution of PlatypusTS through bower and npm.

## Install

You can use either `npm` or `bower` to install this package.

### npm

```shell
npm install platypus --save
```

This package works in CommonJS and on window, so if you are using 
[Browserify](https://github.com/substack/node-browserify) or other CommonJS 
module loaders you can use `require('plat')`. If you want to use `plat` on 
`window`, you can include it in your `index.html`:

```html
<script src="/node_modules/platypus/platypus.js"></script>
```

### bower

```
bower install platypus --save
```

This package works with CommonJS and on window, so if you are using a CommonJS 
loader, you can use `require('/bower_components/platypus/platypus')`. If you want 
to use `plat` on `window`, you can include it in your `index.html`:

```html
<script src="/bower_components/platypus/platypus.js"></script>
```

## Use with TypeScript

This package includes two declaration files, as well as the source `.ts` file. You 
can use the `.ts` file if you want to modify it (e.g. compile it for AMD). If you are 
using `plat` on the window, you will want to reference the `platypus-node.d.ts` 
declaration file:

```ts
/// <reference path="/bower_components/platypus/platypus-node.d.ts" />
```

or

```ts
/// <reference path="/node_modules/platypus/platypus-node.d.ts" />
```

## Recommendations

It is recommended that you use a CommonJS module loader with PlatypusTS in favor of 
using `window.plat`.

## Documentation

Documentation is available on the [Platypi website](http://getplatypi.com/#!/docs).
