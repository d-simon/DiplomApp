module.exports = function (deepcopy) {
    var store = {}
      , local = {}
      ;

    local.save = function (hash, data, cb) {
        if (!hash) return;
        store[hash] = data;
        if (cb && typeof cb === 'function') return cb(null, store[hash]);
        return store[hash];
    }

    local.get = function (hash, cb) {
        if (!hash) return;
        if (cb && typeof cb === 'function') return cb(null, store[hash]);
        return store[hash];
    }

    return local;
}
