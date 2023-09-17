import type { FastifyInstance } from 'fastify';
import type { LPSServerOptions, LPSFileSystemStorage, LPSMongodbStorage } from './types';
import { Router } from 'express';
export default class Server {
    private serverType;
    private storageType;
    private path;
    Storage: LPSFileSystemStorage | LPSMongodbStorage;
    Server: Router | FastifyInstance | undefined;
    constructor(options?: LPSServerOptions, Server?: Router | FastifyInstance);
    listen(): void;
}
