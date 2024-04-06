const fs = require('fs');
const path = require('path');


/**
 * Рекурсивно копирует все файлы и директории из srcDir в destDir,
 * исключая файлы с расширением .ts.
 *
 * @param {string} srcDir Исходная директория.
 * @param {string} destDir Целевая директория.
 */
function copyDirExcludingTsFiles(srcDir, destDir) {
    // Создание целевой директории, если она не существует
    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, {recursive: true});
    }

    // Чтение содержимого исходной директории
    const entries = fs.readdirSync(srcDir, {withFileTypes: true});

    for (let entry of entries) {
        const srcPath = path.join(srcDir, entry.name);
        const destPath = path.join(destDir, entry.name);

        if (entry.isDirectory()) {
            // Если это директория, рекурсивно копируем её содержимое
            copyDirExcludingTsFiles(srcPath, destPath);
        } else if (entry.isFile() && !entry.name.endsWith('.ts')) {
            // Если это файл и он не имеет расширение .ts, копируем его
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

function processPath(extPath, modNameValue) {
    try {
        if (extPath.includes("{mod_name}")) {
            return extPath.replace("{mod_name}", modNameValue);
        }
        return extPath;
    } catch (e) {
        return `./${modNameValue}`
    }
}

const packageMod = require('../src/package.json');
const settingsMod = require('../pack-settings.json');

const srcDirectory = './src';
const distDirectory = './dist';

const destDirectory = processPath(settingsMod.extPath, packageMod.id)

if (fs.existsSync(destDirectory)) {
    fs.rmSync(destDirectory, {recursive: true, force: true});
}

fs.mkdirSync(destDirectory, { recursive: true });
console.log(`${destDirectory} обновлен.`)

copyDirExcludingTsFiles(srcDirectory, destDirectory);
copyDirExcludingTsFiles(distDirectory, destDirectory);




