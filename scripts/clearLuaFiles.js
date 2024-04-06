const fs = require('fs');
const path = require('path');


const packageMod = require('../src/package.json');
const modName = packageMod.id;

const directory = `./${modName}`;

// Функция для рекурсивного удаления Lua файлов
function deleteLuaFiles(dirPath) {
    fs.readdir(dirPath, { withFileTypes: true }, (err, files) => {
        if (err) {
            console.error(`Ошибка чтения директории ${dirPath}:`, err);
            return;
        }

        files.forEach(file => {
            const filePath = path.join(dirPath, file.name);
            if (file.isDirectory()) {
                deleteLuaFiles(filePath);
            } else if (file.isFile() && file.name.endsWith('.lua')) {
                fs.unlink(filePath, err => {
                    if (err) {
                        console.error(`Error deleting file ${filePath}:`, err);
                    } else {
                        console.log(`Deleted: ${filePath}`);
                    }
                });
            }
        });
    });
}

deleteLuaFiles(directory);
