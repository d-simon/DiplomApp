module.exports = function (express, bodyParser, store, config) {

    var app = express()
      , router = express.Router()
      ;

    // API Routes
    router.route('/state')
        .get(function (req, res, next) {
            res.json(store.get('state'));
        })
        .put(function (req, res, next) {
            store.save('state', req.body, function (err, result) {
                if (err) return next(err);
                res.json(result);
            });
        });


    // Serve API
    app.use('/api', router);

    // Serve Angular App
    app.use(express.static(config.cwd + '/public'));

    // Settings
    app.use(bodyParser());

    var server = app.listen(config.port, function() {
        console.log('Listening on port %d', server.address().port);
    });

    return server;
};