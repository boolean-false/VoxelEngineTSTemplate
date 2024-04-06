"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var find_lua_requires_1 = require("typescript-to-lua/dist/transpilation/find-lua-requires");
function getModName() {
    // Путь к файлу конфигурации
    var configPath = './src/package.json';
    var configContent = fs.readFileSync(configPath, 'utf8');
    var config = JSON.parse(configContent);
    // Возвращение значения modName из конфига
    return config["id"] || "test_mod";
}
var plugin = {
    beforeEmit: function (program, options, emitHost, result) {
        var modName = getModName();
        for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
            var file = result_1[_i];
            var requires = (0, find_lua_requires_1.findLuaRequires)(file.code);
            for (var i = requires.length - 1; i >= 0; i--) {
                var newRequireString = "load_script(\"".concat(modName, ":").concat(requires[i].requirePath.replace(/\./g, '/'), ".lua\", false)");
                // file.code = file.code.slice(0, requires[i].from) + "load_script" + file.code.slice(requires[i].from + "require".length);
                file.code = file.code.slice(0, requires[i].from) + newRequireString + file.code.slice(requires[i].to + 1);
            }
        }
    },
};
// function getModName(): String {
//     const packageJsonPath = resolveP("dist/package.json");
//     try {
//         const packageJson = JSON.parse(readFileSync(packageJsonPath, { encoding: "utf-8" }));
//         return packageJson["modName"] || "";
//     } catch (error) {
//         console.error("Error reading package.json:", error);
//         return "test_mod";
//     }
// }
exports.default = plugin;
