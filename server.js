var config = {
    screenDir: '/screenshots/screenshots/' // the nested directory hackfixes a bug/feature(?) in automator where the file is placed outside the actual dir
  , cwd: __dirname
  , workflowFile: 'print_screenshot.workflow'
  , port: 8000
};

var mkdirp = require('mkdirp')
  , exec = require('child_process').exec
  , print = require('./lib/print')(exec, mkdirp, config)
  //, server = require('./lib/server')()
  //, store = require('./lib/store')()
  ;

print.print();