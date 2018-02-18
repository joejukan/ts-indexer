import {Configuration} from "../abstraction";
import {configurations} from "../globalization";

export function Instruction(config: Configuration){
    return function(target: any, key: string, desc: PropertyDescriptor){
        config.action = target[key];
        configurations.push(config);
    }
}