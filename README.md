# README #

Dev tool used to create typescript index files (index.ts)<br/><br/>

## Getting Started

The indexer tool creates typescript index files `index.ts` inside your source code folder and sub-folders.
**Before indexing:**
```
src/
    components/
        login.component.ts
        navigation.component.ts
    services/
        login.service.ts
        user.service.ts
```

**After indexing:**
```
src/
    components/
        login.component.ts
        navigation.component.ts
        index.ts
    services/
        login.service.ts
        user.service.ts
        index.ts
    index.ts
```

each index file will have lines that export the content of each typescript file in the folder:

**src/components/index.ts**:
```
export * from ./login.component';
export * from ./navigation.component';
```

**src/services/index.ts**:
```
export * from ./login.service';
export * from ./user.service';
```

**src/index.ts**:
```
export * from ./components';
export * from ./services';
```
<br/>
This indexing scheme allows simplified imports based on directories:

**with indexing:**

`import {LoginService, UserService} from './services'`<br/><br/>


**without indexing:**

`import {LoginService} from './services/login.service'`

`import {UserService} from './services/user.service'`<br/><br/>

**Important Note**
The indexer will not work on typescript files with default exports.
Default exports may be supported in a future release.<br/><br/>

### Prerequisites

**01)** [nodejs](https://nodejs.org/en/)<br/>
**02)** [typescript](https://www.npmjs.com/package/typescript)<br/><br/>

### Installing

Do the following steps to install **ts-indexer**:

**01)** To install locally:
```
npm install ts-indexer --save
```


**02)** To install globally:
```
npm install -g ts-indexer --save
```
<br/><br/>
## Built With

**01)** [commander](https://www.npmjs.com/package/commander)<br/>
**02)** [inquirer](https://www.npmjs.com/package/inquirer)<br/><br/>


## Authors

**01)** **Joseph Eniojukan** - *Initial work* - [joejukan](https://github.com/joejukan)<br/><br/>


## Usage
**01)** **Command Line with Indexer installed Globally**
```
index watch <path>
```
<br/><br/>
## License

This project is licensed under the ISC License - see the **LICENSE.md** file for details
```
Copyright 2018 Joseph Eniojukan

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
```
