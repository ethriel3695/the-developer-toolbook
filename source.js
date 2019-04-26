const execSync = require('child_process').execSync;

const arg = process.argv[2] || 'commit message';

execSync('npm run build');
execSync('npm run add-commit ' + "\"" + arg + "\"", {stdio:[0, 1, 2]});
execSync('npm run push', {stdio:[0, 1, 2]});