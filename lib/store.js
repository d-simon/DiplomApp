module.exports = function (deepcopy) {
    var store = {};
    var local = {};

    local.save = function (hash, data, cb) {
        // use deepcopy instead
        store[hash] = data;
        if (cb && typeof cb === 'function') cb(null, store[hash]);
        return store[hash];
    }

    local.get = function (hash, cb) {
        if (!hash) return;
        if (cb && typeof cb === 'function') cb(null, store[hash]);
        return store[hash];
    }

    return local;
}
