var fs = require("fs");
var resolve = require("path").resolve;
var sep = require("path").sep;

var inputPath = resolve('typings');
var outputPath = resolve('lib');
var declarationPath = outputPath + sep + 'declaration';
var outputFile = outputPath + sep + 'index.d.ts';

/**@type {Array<string>} */
var lines = [];

/**@param path {string} @returns {Array<string>} */
var split = function(path) {
    let parts = []
    if(fs.existsSync(path)){
        if(fs.statSync(path).isFile()){
            let blob = String(fs.readFileSync(path));
            let blobs = blob.split(/\n/);
            for(let i = 0; i < blobs.length; i++){
                let b = blobs[i];
                if(!b.match(/^\/\/\/.*/))
                    parts.push(b);
            }
        }
    }
    

    return parts;
}

/**
 * @param {string} path
 * @returns {string}
 */
var fileName = function(path){
    let parts = path.split(sep);
    return parts[parts.length - 1];
}

/**
 * @param {string} path
 * @returns {void}
 */
var copy = function(path){
    if(fs.existsSync(path) && typeof path  === 'string'){
        if(fs.statSync(path).isDirectory()){
            var children = fs.readdirSync(path);
            for(let i = 0; i < children.length; i++){
                let child = children[i];
                copy(path + sep + child);
            }
        }
        else if(path.match(/.*\.d\.ts$/i)){
            if(!fs.existsSync(declarationPath))
                fs.mkdirSync(declarationPath);
            
            let file = fileName(path);
            let line = '/// <reference path="./declaration/{file}" />\n'.replace("{file}", file);
            fs.copyFileSync(path, declarationPath + sep + file);
            lines.unshift(line);
        }
    }
}



lines = split(outputFile);
copy(inputPath);
fs.unlinkSync(outputFile);

for(let i = 0; i < lines.length; i++){
    let line = lines[i];
    fs.appendFileSync(outputFile, line);
}