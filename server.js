var mkdirp = require('mkdirp');
var exec = require('child_process').exec;

function execute(command, callback) {
    var proc = exec(command);

    var list = [];
    proc.stdout.setEncoding('utf8');

    proc.stdout.on('data', function (chunk) {
        list.push(chunk);
    });

    proc.stdout.on('end', function () {
        callback(list.join());
    });
}


var cwd = __dirname,
    screenDir = '/screenshots/screenshots/';

// Create directory if doesn't exist already
mkdirp(cwd + screendir, function (err) {
    if (err) return;

    // Automator workflow
    execute('automator -D Path=' + cwd.replace(' ', '\ ') + screenDir + ' ' + 'print_screenshot.workflow', function (stdout) {
        console.log(stdout);
    });
});
