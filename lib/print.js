// By assigning a function to exports we can sort of "initialize"
// the print module and pass dependencies into it
// => var print = require('./relative/path/to/print.js')(exec, mkdirp, config);
// the function the returns a "configured" object, so we can use it like this:
// => print.print();
module.exports = function (exec, mkdirp, config) {

    // Object to return
    var local = {};

    // "private" function which is not returned
    function execute (command, callback) {
        var proc = exec(command);

        var list = [];
        proc.stdout.setEncoding('utf8');

        proc.stdout.on('data', function (chunk) {
            list.push(chunk);
        });

        proc.stdout.on('end', function () {
            callback(list.join());
        });
    };

    // "public" function
    local.print = function () {
        // Create directory if doesn't exist already
        mkdirp(config.cwd + config.screenDir, function (err) {
            if (err) return;

            // Automator workflow
            execute('automator -D Path=' + config.cwd.replace(' ', '\ ') + config.screenDir + ' ' + config.workflowFile, function (stdout) {
                console.log(stdout);
            });
        });
    };

    return local;
}