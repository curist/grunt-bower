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

add **stripAffix** option if you'd like to have lib names with its file type affix to be stripped, things like `/\.js$/`, `/js$/` or `/\.css$/` etc.:

```javascript
bower: {
  dev: {
    dest: 'dest/path',
    options: {
      stripAffix: true
    }
  }
}
```

**stripAffix** could cause name confliction, use with caution!
If you were using `grunt-bower` prior to v0.9.0, **stripJsAffix** is now an alias to **stripAffix** option.

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

You can ignore some packages if you don't want them to be copied:

```javascript
bower: {
  dev: {
    dest: 'public/',
    options: {
      ignorePackages: ['jquery']
    }
  }
}
```

If you want the exported files to be organized by package, use `expand` option. For example, such config will result in the file structure like this:

```javascript
bower: {
  dev: {
    dest: 'public/vendor/',
    options: {
      expand: true
    }
  }
}
```
```
/public
  /vendor
    /package1
	  package1_file1.js
	  package1_file2.js
	  package1.css
	/package2
	  package2.js
	  package2.css
```

Or organized by file type in addition:
	
```javascript
bower: {
  dev: {
    dest: 'public/',
	js_dest: 'public/js/'
	css_dest: 'public/css/',
    options: {
      expand: true
    }
  }
}
```
```
/public
  /js
    /package1
	  package1_file1.js
	  package1_file2.js
	/package2
	  package2.js
  /css
    /package1
	  package1.css
	/package2
	  package2.css
```  


## Change Logs
- Apr 09, 2014 v0.10.0

  Add `ignorePackages` option.  
  Fix possible issue with `path.sep`.  
  Thank you, [Artem Chivchalov](https://github.com/artch)!

- Apr 09, 2014 v0.9.3

  Fix a issue when bower components are installed to nested directory, `grunt-bower` won't be able to copy component files.  
  Thank you, [Jooyung Han](https://github.com/jooyunghan)

- Mar 01, 2014 v0.9.0

  Better support for bower packages with only css files

- Feb 13, 2014 v0.8.4

  Using latest `bower`

- Feb 09, 2014 v0.8.0

  Reintroduced the ability to handle multiple file support  
  Removed `basePath` option

- Sep 30, 2013 v0.7.0

  Added css and multiple file support  
  Thank you, [Juri Saltbacka](https://github.com/3bola)!!

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].


## License
Copyright (c) 2012 curist
Licensed under the MIT license.
