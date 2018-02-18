import * as instructors from "../instruction";
import {configurations} from './variables';
export function init(){
    for(let i in instructors){
        instructors[i];
    }
}

export function info(message: string){
    if(/^info$/i.test(configurations.verbose))
        console.info(message);
}
export function debug(message: string){
    if(/^debug$/i.test(configurations.verbose))
        console.debug(message);
}