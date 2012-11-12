# grunt-bower

Copy bower installed components to dist folder.

## First Thing First
This plugin doesn't set Bower as dependency to reduce the redundancy, but you should have Bower installed globally.
```sh
npm install -g bower
```

## Getting Started
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-bower`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-bower');
```

[grunt]: http://gruntjs.com/
[getting_started]: https://github.com/gruntjs/grunt/blob/master/docs/getting_started.md

## Documentation
To your [grunt.js gruntfile][getting_started], add:

```javascript
bower: {
  dev: {
    dest: 'dest/path'
  }
}
```

add **basePath** option if you want to preserve library path:

```javascript
bower: {
  dev: {
    dest: 'dest/path',
    options: {
      basePath: 'components/'
    }
  }
}
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].


## License
Copyright (c) 2012 curist
Licensed under the MIT license.
