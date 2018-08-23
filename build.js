#!/usr/bin/env node

var scriptSourceFiles = [
    // order matters. also put in <root>/index.html
    "js/html-utils.js",
    "js/data.js",
    "js/initMap.js",
    "js/markers.js",
    "js/help-screen.js",
    "js/location.js",
    "js/venueFeedback.js",
    "js/feedbackForm.js",
    "js/popupTypeform.js",
    "js/app.js"
]

var shell = require('shelljs')
var replace = require('replace-in-file')
var sass = require('node-sass')

// clean
shell.rm('-r', 'build/*')

// grab js
// uglifyjs api is too complex with its files and things.  let's just use the shell version
var builtJs = shell.exec('node ./node_modules/uglify-js/bin/uglifyjs ' + scriptSourceFiles.join(' ') + ' --compress --mangle', {silent:true}).stdout

// grab css
var builtCss = sass.renderSync({
    data: shell.cat('css/*.css').stdout,
    outputStyle: 'compressed'
}).css.toString()

// build html file
shell.cp('index.html', 'build/index.html')
// this (multiline replace by regex) is the entire reason I'm building using javascript.... :D
replace.sync({
    files: 'build/index.html',
    from: [
        /<!-- ###BUILD HOOK### - scripts start -->.*<!-- ###BUILD HOOK### - scripts end -->/gs,
        /<!-- ###BUILD HOOK### - styles start -->.*<!-- ###BUILD HOOK### - styles end -->/gs,
    ],
    to: [
        '<script>' + builtJs + '</script>',
        '<style>' + builtCss + '</style>',
    ]
})

// images
shell.cp('-r', 'img', 'build/img')

// move to staging dir
shell.cp('-r', 'build/*', 'docs')
