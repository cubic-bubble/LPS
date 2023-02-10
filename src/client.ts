type Metadata = {
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
type ClientRequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE'
type ClientRequestOptions = {
  method: ClientRequestMethod
  headers: { [index: string]: string }
  body?: any
}
type ClientResponse = {
  error: boolean
  message: string
  result?: any
}
type ClientOptions = {
  userAgent: string
  clientId: string
}
type QueryArgument = { [index: string]: string }

function Obj2Params( obj: any, excludes?: string[] ){
  return typeof obj == 'object' ?
            Object.entries( obj )
                  .map( ([ key, value ]) => {
                    if( !Array.isArray( excludes ) || !excludes.includes( key ) )
                      return `${key }=${ value}`
                  }).join('&') : ''
}

export default class Client {

  private userAgent = 'LPS/RM'
  private clientId = 'OPAC-12-09HH--$0'

  private Request( api: string, method?: ClientRequestMethod, data?: any ): Promise<ClientResponse>{
    return new Promise( ( resolve, reject ) => {
      const options: ClientRequestOptions = {
        method: method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          'lps-user-agent': this.userAgent,
          'lps-client-id': this.clientId
        }
      }

      if( data ) options.body = JSON.stringify( data )

      window
      .fetch(`/lpstore${ api !== '/' ? api : ''}`, options )
      .then( res => { return !res.ok ? reject( res.status ) : res.json() } )
      .then( resolve )
      .catch( reject )
    } )
  }

  constructor( options?: ClientOptions ){
    if( options?.userAgent ) this.userAgent = options.userAgent
    if( options?.clientId ) this.clientId = options.clientId
  }

  // Store new item (metadata)
  async set( metadata: Metadata ){
    try {
      const { error, message, result } = await this.Request('/', 'POST', metadata )
      if( error ) throw new Error( message )

      return result
    }
    catch( error ) {
      console.log('Failed setting item(s) to the store: ', error )
      return null
    }
  }
  // Get an items details
  async get( query: QueryArgument ){
    try {
      /** ---------- Sandbox mode ----------**/
      // If( window.SANDBOX ) return require('root/../.metadata')

      /** ---------- Regular mode ----------**/
      const { error, message, result } = await this.Request(`${query ? `?${Obj2Params( query )}` : '/'}`)
      if( error ) throw new Error( message )

      return result
    }
    catch( error ) {
      console.log('Failed Retreiving from the store: ', error )
      return null
    }
  }
  // Fetch items by query
  async fetch( query?: QueryArgument ){
    try {
      const { error, message, result } = await this.Request(`/fetch${query ? `?${Obj2Params( query )}` : ''}`)
      if( error ) throw new Error( message )

      return result
    }
    catch( error ) {
      console.log('Failed Fetching items from the store: ', error )
      return []
    }
  }
  // Update item (metadata)
  async update( sid: string, updates: any ){
    try {
      const { error, message, result } = await this.Request('/', 'PATCH', { sid, updates })
      if( error ) throw new Error( message )

      return result
    }
    catch( error ) {
      console.log('Failed Updating the store: ', error )
      return null
    }
  }
  // Delete item from store
  async remove( sid: string ){
    try {
      const { error, message, result } = await this.Request(`?sid=${sid}`, 'DELETE')
      if( error ) throw new Error( message )

      return result
    }
    catch( error ) {
      console.log('Failed Updating the store: ', error )
      return null
    }
  }
}