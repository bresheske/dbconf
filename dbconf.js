const args = require('yargs').argv;
const glob = require('glob');
const fs = require('fs');

const root = 'D:\\SteamGames\\steamapps\\common\\King\'s Quest Collection';

if (!args.fullscreen && !args.window) {
    console.log(`Options requires 'fullscreen' or 'window'`);
    return;
}
else if (args.window && !args.size) {
    console.log(`'window' requires 'size'.`);
    return;
}

const files = glob.sync(`${root}/**/dosbox.conf`);
for(const file of files) {
    let data = fs.readFileSync(file).toString();
    
    if (args.fullscreen) {
        data = data.replace(/fullscreen=.*/g, 'fullscreen= true');
    }
    else if (args.window) {
        data = data.replace(/fullscreen=.*/g, 'fullscreen= false');
        data = data.replace(/windowresolution=.*/g, `windowresolution= ${args.size}`);
    }
    fs.writeFileSync(file, data);
}