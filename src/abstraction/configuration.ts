export interface Configuration {
    template: string;
    alias?: string;
    description?: string;
    options?: {[key: string]: string}
    action?: (...args) => any;
}