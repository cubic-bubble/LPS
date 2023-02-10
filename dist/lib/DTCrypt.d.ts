/**
 * -------------------------------------
 *  DTCrypt: Delta Token Data Encryption
 ** --------------------------------------
 *
 * @version 1.0
 * @author Fabrice Marlboro
 *
 */
/**
 * Encrypt
 *
 * Generate encrypted string token of
 * any typeof data: String, Object, Number, ...
 *
 * @param {mixed} arg
 * @return {string}
 */
export declare const encrypt: (arg: any) => string
/**
 * Decrypt
 *
 * Reverse encrypted string token to its
 * original data format.
 *
 * @param {string} input
 * @return {mixed}
 */
export declare const decrypt: (input: string) => any
declare const _default: {
    encrypt: (arg: any) => string;
    decrypt: (input: string) => any;
}
export default _default
