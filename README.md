# grunt-bower

Copy bower installed components to dist folder.

## Getting Started
Install this grunt plugin next to your project's [Gruntfile.js][getting_started] with: `npm install grunt-bower`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-bower');
```

[grunt]: http://gruntjs.com/
[getting_started]: http://gruntjs.com/getting-started

## Documentation
To your [Gruntfile.js][getting_started], add:

```javascript
bower: {
  dev: {
    dest: 'dest/path'
  }
}
```

add **stripJsAffix** option if you'd like to have lib names with 'js' affix to be stripped:

```javascript
bower: {
  dev: {
    dest: 'dest/path',
    options: {
      stripJsAffix: true
    }
  }
}
```

**stripJsAffix** could cause name confliction, use with caution!

if you want to assign different destination folder for other file types:

```javascript
bower: {
  dev: {
    dest: 'dest/',
    js_dest: 'dest/js',
    css_dest: 'dest/styles'
  }
}
```

file types without a `[file_type]_dest` will go to `dest` folder.

if you want to have more specific `dest` options for certain packages:

```javascript
bower: {
  dev: {
    dest: 'public/',
    css_dest: 'public/styles',
    options: {
      packageSpecific: {
        bootstrap: {
          dest: 'public/fonts',
          css_dest: 'public/css/bootstrap'
        }
      }
    }
  }
}
```

finally, if `grunt-bower` not copying the files you want:

```javascript
bower: {
  dev: {
    dest: 'public/',
    options: {
      packageSpecific: {
        'typeahead.js': {
          files: [
            "dist/typeahead.bundle.js"
          ]
        }
      }
    }
  }
}
```


## Change Logs
- Feb 13, 2014 v0.8.4

  Using latest `bower`

- Feb 09, 2014 v0.8.0

  Reintroduced the ability to handle multiple file support  
  Removed `basePath` option

- Sep 30, 2013 v0.7.0

  Added css and multiple file support  
  Thank you, [Juri Saltbacka](https://github.com/3bola)!!

- Jul 28, 2013 v0.6.1

  support bower v1.0.0

- Feb 05, 2013 v0.5.0

  add option `stripJsAffix` to strip `/\W?js$/` in outputed file name.

- Feb 05, 2013 v0.4.4

  Grunt v0.4.0+ support, for real.

- Jan 31, 2013 v0.4.3

  Don't throw user out with error, and provides a little more informative warning messages.

- Jan 11, 2013 v0.4.2a

  Grunt v0.4.0+ support

- Dec 15, 2012 v0.4.2

  better handling the way to get file path to be copied, Bower v0.4.0 and above are supported

- Dec 14, 2012 v0.4.1

  try to guess the library file name if not provided by the installed component

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].


## License
Copyright (c) 2012 curist
Licensed under the MIT license.
