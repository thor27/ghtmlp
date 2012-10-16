#!/usr/bin/env node
var help = "Usage: ghtmlp --filter [jquery filter] --eval [jquery/js command] --include [javascript file] files"
var argv = require('optimist')
  .usage(help)
  .argv;

var fs = require('fs');
var jsdom = require('jsdom');
var filenames = argv._;

if ((argv.h)||(argv.help)) {
  console.log(help);
  process.exit(0);
}

var filter = argv.filter;
var eval_value = argv.eval;
if (argv.include) {
  var scripts = [ 'jquery.js', argv.include ];
}

function apply_filter(filename,html) {
  jsdom.env({
    html: html,
    scripts: [
      'jquery.js'
    ]
  }, function (err, window) {
    
    var $ = window.jQuery;
    
    result = '';
    
    if (filter) {
      val = $(filter).html();
      if (val) {
        result += val;
      }
    }
    
    if (eval) {
      val = eval(eval_value);
      if (val) {
        result += val;
      }
    }
    
    if (result) {
      if (filename) {
        process.stdout.write(filename+': ');
      }
      process.stdout.write(result+'\n');
    }
    
  });
}

if (filenames.length == 0) {
  html = "";

  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  process.stdin.on('data', function (chunk) {
    html+=chunk;
  });

  process.stdin.on('end', function () {
    apply_filter(false,html);
  });
} 

for (key in filenames) {
  var filename = filenames[key]
  
  if (!fs.existsSync(filename)) {
    process.stderr.write(filename + ' does not exists\n');
    continue;
  }
  
  if (!fs.statSync(filename).isFile()) {
    process.stderr.write(filename + ' is not a regular file\n');
    continue;
  }
  
  html = fs.readFileSync(filename, 'utf-8');
  
  apply_filter(filename,html);
}
