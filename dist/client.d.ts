import type { Metadata, LPSClientOptions } from './types'
type QueryArgument = {
    [index: string]: string;
};
export default class Client {
    private userAgent
    private clientId
    private Request
    constructor(options?: LPSClientOptions);
    set(metadata: Metadata): Promise<any>;
    get(query: QueryArgument): Promise<any>;
    fetch(query?: QueryArgument): Promise<any>;
    update(sid: string, updates: any): Promise<any>;
    remove(sid: string): Promise<any>;
}
export {}
