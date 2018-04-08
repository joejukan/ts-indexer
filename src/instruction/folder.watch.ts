import { Instruction } from '../decoration';
import { readdirSync, statSync, watch, existsSync, writeFileSync, unlinkSync } from "fs";
import { resolve, sep, extname, dirname, basename, relative, join } from "path";
import { Command } from "commander";
import {info, debug, configurations} from "../globalization"
var baseFolder: string = undefined;

export class FolderWatch {
    @Instruction({
        template: 'watch <directory>',
        alias: 'w',
        options: { '-v, --verbose <level>': 'Verbosity level (DEBUG, INFO, OFF)' },
        description: 'select folder to watch for TS changes'
    })
    public static watch(folder: string, cmd: Command) {
        baseFolder = folder;
        configurations.verbose = cmd.verbose || 'OFF';
            

        // first scan root directory
        FolderWatch.scan(folder, true);

        watch(folder, { recursive: true }, (event, file) => {
            let path = `${folder}${sep}${file}`;
            debug(`[${event}] ${path}`);
            if (existsSync(path)) {
                let stats = statSync(path);
                if (stats.isDirectory() && event === 'change') {
                    FolderWatch.scan(path);
                }
                else if (stats.isFile() && FolderWatch.isTS(file) && event === 'rename') {
                    FolderWatch.scanUpstream(path);
                }
            }
            else if(event === 'rename' && FolderWatch.isTS(file)){
                FolderWatch.scanUpstream(path);
            }
        })
    }

    public static scan(folder: string, recursive: boolean = false) {
        debug(`[scan] ${folder}`);
        let files = readdirSync(folder);

        let buffer = '';
        let index = `${folder}${sep}index.ts`;
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            let ext = extname(file);
            let base = basename(file, ext);
            let path = `${folder}${sep}${file}`;

            let stats = statSync(path);
            if (stats.isFile() && FolderWatch.validTS(file)) {
                buffer += `export * from './${base}';\n`;
            }
            else if (stats.isDirectory()) {

                if (existsSync(`${path}${sep}index.ts`)) {
                    buffer += `export * from './${file}';\n`;
                }

                if (recursive) {
                    FolderWatch.scan(path, recursive);
                }

            }
        }

        if (buffer.length > 0) {
            FolderWatch.write(index, buffer);
        }
        else if (existsSync(index)) {
            unlinkSync(index);
            info(`[removed] ${index}`);
        }
    }

    public static scanUpstream(path: string) {
        debug(`[upstream] ${path}`);
        let paths = path.split(sep);
        while (paths.length > 1) {
            paths.pop();
            let parentPath = paths.join(sep);
            FolderWatch.scan(parentPath);
        }
    }
    public static isTS(name: string): boolean {
        let ext = extname(name);
        return /^\.ts$/i.test(ext);
    }
    public static isDTS(name: string): boolean {
        return /\.d\.ts$/i.test(name);
    }
    public static isSPEC(name: string): boolean {
        return /\.spec\.ts$/i.test(name);
    }
    public static validTS(name: string): boolean {
        let ext = extname(name);
        let base = basename(name, ext);

        if(FolderWatch.isSPEC(name))
            return false;

        if(FolderWatch.isDTS(name))
            return false;

        // make sure file is a TS file
        if (FolderWatch.isTS(name)) {

            // make sure that file is not an index TS file
            if (!/^index$/i.test(base)) {

                return true;
            }
        }

        return false;
    }

    public static write(filePath: string, data: string) {
        let created = !existsSync(filePath);
        writeFileSync(filePath, data, 'utf-8');

        if (created) {
            info(`[created] ${filePath}`);
            FolderWatch.scanUpstream(filePath);
        }
        else {
            info(`[modified] ${filePath}`);
        }

    }
}
