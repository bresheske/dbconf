const args = require('yargs').argv;
const glob = require('glob');
const { readFileSync, writeFileSync } = require('fs');
const { spawn } = require('child_process');
const { dirname } = require('path');

const root = 'D:\\SteamGames\\steamapps\\common\\King\'s Quest Collection';

if (!args.fullscreen && !args.window && !args.launch) {
    console.log(`options requires 'fullscreen' or 'window'`);
    return;
}
else if (args.window && !args.size) {
    console.log(`'window' requires 'size'.`);
    return;
}

const configAction = () => {
    const files = glob.sync(`${root}/**/dosbox.conf`);
    for(const file of files) {
        let data = readFileSync(file).toString();
        
        if (args.fullscreen) {
            data = data.replace(/fullscreen=.*/g, 'fullscreen= true');
        }
        else if (args.window) {
            data = data.replace(/fullscreen=.*/g, 'fullscreen= false');
            data = data.replace(/windowresolution=.*/g, `windowresolution= ${args.size}`);
        }
        writeFileSync(file, data);
    }
};

const launchAction = () => {
    const exes = glob.sync(`${root}/**/*${args.launch}*.exe`);
    if (exes && exes[0]) {
        const cmd = exes[0];
        console.log(`launching '${cmd}'`);
        spawn(cmd, 
            { 
                cwd: dirname(exes[0]),
                detached: true,
                stdio: 'ignore'
            }).unref();
    }
    else {
        console.log(`could not launch ${args.launch}. no executable found.`);
    }
};

// main entrypoint of the app.

if (args.fullscreen || args.window) {
    configAction();
}
else if (args.launch) {
    launchAction();
}