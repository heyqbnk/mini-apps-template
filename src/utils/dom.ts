import emojiSadUrl from '../assets/emoji/sad/1x.png';

/**
 * Loads images into cache.
 * @param urls
 */
export function loadImages(...urls: string[]) {
  urls.forEach(url => new Image().src = url);
}

/**
 * Preloads all required assets.
 */
export function preloadAssets() {
  loadImages(emojiSadUrl);
}

/**
 * Converts an array of urls to src set.
 * @param images - Array of Tuples [url, size]
 */
export function toSrcSet(images: [string, string][]): string {
  return images.map(([url, size]) => `${url} ${size}`).join(', ');
}
