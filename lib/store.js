module.exports = function () {
    var store = {};
    var local = {};

    local.save = function (hash, data) {
        // use deepcopy instead
        store[hash] = data;
    }

    local.get = function (hash) {
        if (!hash) return;
        return store[hash];
    }

    return local;
}
