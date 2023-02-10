
export const ruuid = () => {
  return 'xxxx-xxxx-4xxxx-xxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8)
    return v.toString(16)
  })
}

export const Obj2Params = ( obj: any, excludes?: string[] ) => {
  return typeof obj == 'object' ?
            Object.entries( obj )
                  .map( ([ key, value ]) => {
                    if( !Array.isArray( excludes ) || !excludes.includes( key ) )
                      return `${key }=${ value}`
                  }).join('&') : ''
}