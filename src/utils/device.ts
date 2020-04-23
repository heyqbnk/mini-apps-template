import {OS} from '../types';

/**
 * Returns current operating system depending on userAgent
 * @param {string} userAgent
 * @returns {OS}
 */
export function getOS(userAgent: string): OS {
  return /Android/i.test(userAgent) ? OS.Android : OS.IOS;
}
