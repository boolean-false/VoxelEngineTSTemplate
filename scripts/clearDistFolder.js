const fs = require('fs');

const destDirectory = `./dist`;
if (fs.existsSync(destDirectory)) {
    fs.rmSync(destDirectory, {recursive: true, force: true});
}

fs.mkdirSync(destDirectory);
console.log(`${destDirectory} пересоздан.`)

