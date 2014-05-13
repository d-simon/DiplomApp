module.exports = function (express, bodyParser, io, apiRouter, store, print, config) {

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
    app.post('/api/print', function (req, res, next) {
        print.print(function (err, stdout) {
            res.send(200, stdout);
        });
    });

    // Serve Angular App
    app.use(express.static(config.cwd + '/public'));


    return {
        ioServer: ioServer
      , expressServer: expressServer
      , expressApp: app
    };
};