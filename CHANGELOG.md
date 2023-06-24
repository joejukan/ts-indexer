# Changelog
All notable changes to this project will be documented in this file.<br/>
The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).<br/><br/>

## [0.0.6](https://github.com/joejukan/vue-di-loader/releases/tag/v0.0.6) [FEATURE] Added Logic to Ignore Storybook Files (2023-06-24)
* added the `isSTORY()` static function to the `FolderWatch` class.
* modified the `FolderWatch` class `validTS()` static function to ignore storybook files.
* removed the `@types/jasmine` module.
* removed the `jasmine` module.
* added version `0.1.62` of the `@swc/cli` module.
* added version `1.3.66` of the `@swc/core` module.
* added version `0.2.26` of the `@swc/jest` module.
* added version `29.5.2` of the `@types/jest` module.
* added version `20.3.1` of the `@types/node` module.
* added version `29.5.0` of the `jest` module.
* upgraded the `ts-node` module from version `8.5.4` to version `10.9.1`.
* upgraded the `typescript` module from version `3.7.4` to version `5.1.3`.

## [0.0.5](https://github.com/joejukan/vue-di-loader/releases/tag/v0.0.5) [FEATURE] Added Support for TSX Files (2019-12-26)
* upgraded the `commander` module to version `4.0.1`.
* upgraded the `inquirer` module to version `7.0.1`.
* upgraded the `jasmine` module to version `3.5.0`.
* modified the `FolderWatch` `isTS()` method to check for both `ts` and `tsx` extensions.
* modified the `FolderWatch` `isSPEC()` method to check for both `ts` and `tsx` extensions.