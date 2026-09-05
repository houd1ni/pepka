import { AnyObject } from './types';
type StrTmpl = ((data: AnyObject) => string);
/** Compiles a string template with {placeholder} syntax into a function that fills placeholders from a data object.
 * Supports ecran escaping with backslash before { or }.
 * @param tmpl - the template string, e.g. 'one{meme}two'
 * @returns a function that takes a data object and returns the filled string
 */
export declare const getTmpl: (tmpl: string) => StrTmpl;
export {};
