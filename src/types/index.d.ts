
import type { Collection, Filter, Document } from 'mongodb'

export type Metadata = {
  type: 'application' | 'plugin' | 'library'
  name: string
  namespace: string
  nsi: string
  description: string
  version: string
  favicon: string
  categories: string[]
  runscript?: {
    [index: string]: {
      workspace?: string
      autoload?: boolean
    }
  },
  resource?: {
    dependencies?: string[]
    permissions?: {
      scope?: (string | { type: string, access: string })[]
    }
    services?: { [index: string]: string[] }
  },
  author: {
    type: string
    name: string
  },
  configs?: { [index: string]: any }
}
export type LPSClientRequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE'
export type LPSClientRequestOptions = {
  method: LPSClientRequestMethod
  headers: { [index: string]: string }
  body?: any
}
export type LPSClientResponse = {
  error: boolean
  message: string
  result?: any
}
export type LPSClientOptions = {
  userAgent: string
  clientId: string
}


export type LPSFileSystemStorageOptions = {
  path: string
}
export type LPSMongoDbStorageOptions = {
  collection: Collection
}
export interface LPSFileSystemStorage {
  insert: ( input: any ) => Promise<string>
  get: ( conditions: any ) => Promise<any>
  fetch: ( filters: any ) => Promise<any[]>
  update: ( sid: string, updates: any ) => Promise<string>
  delete: ( sid: string ) => Promise<string>
}
export interface LPSMongodbStorage {
  insert: ( input: any ) => Promise<string>
  get: ( conditions: Filter<Document> ) => Promise<any>
  fetch: ( filters: Filter<Document> ) => Promise<any[]>
  update: ( sid: string, updates: any ) => Promise<string>
  delete: ( sid: string ) => Promise<string>
}
export type LPSServerOptions = {
  serverType?: 'express' | 'fastify'
  storageType?: 'filesystem' | 'mongodb'
  path?: string
  table?: string
  collection?: Collection
}


/*
 * Export interface LPSClient {
 *   private userAgent: string
 *   private clientId: string
 */

/*
 *   Private Request( api: string, method?: LPSClientRequestMethod, data?: any ): Promise<LPSClientResponse>
 *   // Store new item (metadata)
 *   async set( metadata: Metadata ): Promise<any>
 *   // Get an items details
 *   async get( query: QueryArgument ): Promise<any>
 *   // Fetch items by query
 *   async fetch( query?: QueryArgument ): Promise<any>
 *   // Update item (metadata)
 *   async update( sid: string, updates: any ): Promise<any>
 *   // Delete item from store
 *   async remove( sid: string ): Promise<any>
 * }
 */