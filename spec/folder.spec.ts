import { sep } from "path";
import { unlinkSync, statSync, readdir, readdirSync, mkdirSync, rmdirSync, writeFileSync, existsSync, readFileSync } from "fs";
import { FolderWatch } from "../src/instruction";
const root = 'test';
function clear(path: string) {
    let stats = statSync(path);

    if (stats.isFile()) {
        unlinkSync(path);
    }
    else if (stats.isDirectory()) {
        let files = readdirSync(path);
        files.forEach(file => {
            clear(`${path}${sep}${file}`);
        });
        rmdirSync(path);
    }
}

beforeAll((done) => {
    if (!existsSync(root)) {
        mkdirSync(root);
    }
    done();
})

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
describe('Flat File Insert', function () {
    let animal = `${root}${sep}animal.ts`;
    let index = `${root}${sep}index.ts`;
    it('index.ts should be created in root folder', (done) => {
        writeFileSync(animal, 'export class Animal {};', 'utf-8');
        FolderWatch.scan(root, true);
        setTimeout(() => {
            expect(existsSync(index)).toBeTruthy();
            expect(existsSync(animal)).toBeTruthy();
            done();
        }, 500);
    });

    it('spec.ts and d.ts files should not be found in the index', (done) => {
        let spec = `${root}${sep}animal.spec.ts`;
        let dts = `${root}${sep}animal.d.ts`;
        writeFileSync(animal, 'export class Animal {};', 'utf-8');
        writeFileSync(spec, 'export class AnimalSpec {};', 'utf-8');
        writeFileSync(dts, 'export class Animal {};', 'utf-8');
        FolderWatch.scan(root, true);
        setTimeout(() => {
            expect(existsSync(index)).toBeTruthy();
            expect(existsSync(spec)).toBeTruthy();
            expect(existsSync(dts)).toBeTruthy();
            let content = readFileSync(index, 'utf-8');
            expect(/animal\.spec/i.test(content)).toBeFalsy();
            expect(/animal\.d/i.test(content)).toBeFalsy();
            done();
        }, 500);
    });
})