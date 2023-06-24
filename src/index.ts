#!/usr/bin/env node
import {version, command, parse} from "commander";
import {readFileSync} from "fs";
import {resolve} from "path";
import {init, configurations} from "./globalization";
let pkg = JSON.parse(readFileSync(resolve('package.json'), 'utf-8'));

init();
version(pkg.version).description(pkg.description);

configurations.forEach( config => {
    let cmd = command(config.template)
    .alias(config.alias)
    .description(config.description)
    .action(config.action);

    let options = config.options;
    for(let k in options){
        cmd.option(k, options[k]);
    }
});

parse(process.argv);