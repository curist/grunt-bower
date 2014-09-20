var sh = require('shelljs');
var ml = require('multiline');

var tests = [{
  name: 'basic',
  expected_output: ml(function() {/*
public
└── js
    └── lib
        ├── css
        │   └── font-awesome.css
        ├── fonts
        │   ├── FontAwesome.otf
        │   ├── fontawesome-webfont.eot
        │   ├── fontawesome-webfont.svg
        │   ├── fontawesome-webfont.ttf
        │   └── fontawesome-webfont.woff
        ├── jquery-ui.js
        └── jquery.js

4 directories, 8 files
*/})
}, {
  name: 'test1',
  expected_output: ml(function() {/*
public
└── js
    └── lib
        ├── FontAwesome.otf
        ├── font-awesome.css
        ├── fontawesome-webfont.eot
        ├── fontawesome-webfont.svg
        ├── fontawesome-webfont.ttf
        ├── fontawesome-webfont.woff
        ├── jquery-ui.js
        └── jquery.js

2 directories, 8 files
*/})
}, {
  name: 'test2',
  expected_output: ml(function() {/*
public
└── js
    └── lib
        ├── font-awesome
        │   ├── css
        │   │   └── font-awesome.css
        │   └── fonts
        │       ├── FontAwesome.otf
        │       ├── fontawesome-webfont.eot
        │       ├── fontawesome-webfont.svg
        │       ├── fontawesome-webfont.ttf
        │       └── fontawesome-webfont.woff
        ├── jquery
        │   └── jquery.js
        └── jquery-ui
            └── jquery-ui.js

7 directories, 8 files
*/})
}, {
  name: 'test3',
  expected_output: ml(function() {/*
public
└── js
    └── lib
        ├── font-awesome
        │   ├── FontAwesome.otf
        │   ├── font-awesome.css
        │   ├── fontawesome-webfont.eot
        │   ├── fontawesome-webfont.svg
        │   ├── fontawesome-webfont.ttf
        │   └── fontawesome-webfont.woff
        ├── jquery
        │   └── jquery.js
        └── jquery-ui
            ├── accordion.min.js
            ├── autocomplete.min.js
            └── button.min.js

5 directories, 10 files
*/})
}];

tests.forEach(function(test) {
  test_it(test.name);
  if(strip(o()) !== strip(test.expected_output)) {
    console.error('Test ' + test.name + ' failed.');
  } else {
    console.log('Test ' + test.name + ' succeed.');
  }
});

function test_it(test) {
  sh.exec('grunt clean bower:' + test, {silent: true});
}

function o() {
  return sh.exec('tree public', {silent: true}).output;
}

function strip(s) {
  return s.replace(/^\s*|\s*$/g, '');
}
