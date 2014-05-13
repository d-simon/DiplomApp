module.exports = function (express, bodyParser, io, apiRouter, store, config) {

    var app = express()
      , expressServer = app.listen(config.port, function() {
            console.log('Listening on port %d', expressServer.address().port);
        })
      , ioServer = io.listen(expressServer)
      ;

    // Settings
    app.use(bodyParser());

    // Serve API
    app.use('/api', apiRouter(express, store, ioServer));

    // Serve Angular App
    app.use(express.static(config.cwd + '/public'));


    return {
        ioServer: ioServer
      , expressServer: expressServer
      , expressApp: app
    };
};