module.exports = function (express, store, ioServer) {

    var router = express.Router();

    // API Routes
    router.route('/state')
        .get(function (req, res, next) {
            store.get('state', function (err, result) {
                if (err) return next(err);
                res.json(result);
            });
        })
        .put(function (req, res, next) {
            store.save('state', req.body, function (err, result) {
                if (err) return next(err);
                ioServer.sockets.emit('update:state', result);
                res.json(result);
            });
        });

    return router;
};