import {sep, resolve} from "path";
import {unlinkSync, statSync, readdir, readdirSync, mkdirSync, rmdirSync, writeFileSync, existsSync} from "fs";
import {FolderWatch} from "../src/instruction";
const root = 'test';
function clear(path: string){
    let stats = statSync(path);

    if(stats.isFile()){
        unlinkSync(path);
    }
    else if(stats.isDirectory()){
        let files = readdirSync(path);
        files.forEach(file => {
            clear(`${path}${sep}${file}`);
        });
        rmdirSync(path);
    }
}

beforeEach((done) => {
    readdir(root, (err, files) => {
        files.forEach(file => {
            clear(`${root}${sep}${file}`);
        });

        done();
    })
})
afterEach((done) => {
    readdir(root, (err, files) => {
        files.forEach(file => {
            clear(`${root}${sep}${file}`);
        });

        done();
    })
})
describe('Flat File Insert', function(){
    it('index.ts should be created in root folder', function(done){
        let animal = `${root}${sep}animal.ts`;
        let index = `${root}${sep}index.ts`;
        writeFileSync(animal, 'export class Animal {};', 'utf-8');
        FolderWatch.scan(root, true);

        setTimeout(() => {
            expect(existsSync(index)).toBeTruthy('index.ts file is missing!');
            expect(existsSync(animal)).toBeTruthy('animal.ts file is missing!');
            done();
        }, 500);
    })
})

