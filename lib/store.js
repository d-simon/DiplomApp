module.exports = function (deepcopy) {
    var store = {};
    var local = {};

    local.save = function (hash, data, cb) {
        // use deepcopy instead
        store[hash] = deepcopy(data);
        if (cb && typeof cb === 'function') cb(null, deepcopy(store[hash]));
        return store[hash];
    }

    local.get = function (hash, cb) {
        if (!hash) return;
        if (cb && typeof cb === 'function') cb(null, deepcopy(store[hash]));
        return deepcopy(store[hash]);
    }

    return local;
}
