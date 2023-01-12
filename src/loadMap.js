"use strict";
exports.__esModule = true;
exports.writeToJson = exports.loadDependencyFile = void 0;
var js_yaml_1 = require("js-yaml");
var fs_1 = require("fs");
function loadDependencyFile(file) {
    console.log('Getting dependencies from repos.yml');
    var doc;
    try {
        doc = js_yaml_1.load(fs_1.readFileSync(file, 'utf8'));
        console.log(doc);
        // TODO verify doc is a map of string to a list of strings
    }
    catch (e) {
        doc = {};
        console.log(e);
    }
    return doc;
}
exports.loadDependencyFile = loadDependencyFile;
// Write the dependencies to src/repos.json
function writeToJson(dep, outFile) {
    var data = JSON.stringify(dep, null, 2);
    fs_1.writeFileSync(outFile, data);
}
exports.writeToJson = writeToJson;
