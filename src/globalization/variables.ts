import {Configuration} from "../abstraction";
export var configurations: Array<Configuration> & {verbose?: string} = new Array<Configuration>();
configurations.verbose = 'OFF';