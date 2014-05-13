// Config
var config = {
    screenDir: '/screenshots/screenshots/' // the nested directory hackfixes a bug/feature(?) in automator where the file is placed outside the actual dir
  , cwd: __dirname
  , workflowFile: 'print_screenshot.workflow'
  , port: process.env.PORT || 8000
};

// Dependencies
var mkdirp = require('mkdirp')
  , exec = require('child_process').exec
  , express = require('express')
  , bodyParser = require('body-parser')
  , deepcopy = require('deepcopy')
  , io = require('socket.io')
  ;


// Modules
var print = require('./lib/print')(exec, mkdirp, config)
  , store = require('./lib/store')(deepcopy)
  , apiRouter = require('./lib/apirouter') // initialized inside servers
  , servers = require('./lib/server')(express, bodyParser, io, apiRouter, store, config)
  , expressServer = servers['ioServer']
  , ioServer = servers['expressServer']
  , expressApp = servers['expressApp']
  ;

// Inital state
store.save('state', {
    currentTerm: null,
    subTerms: []
});

// Test
print.print();
console.log(store.get('state'));