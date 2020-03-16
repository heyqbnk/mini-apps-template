import emojiSadUrl from '../assets/emoji/sad/1x.png';

/**
 * Подгружает изображения и помещает в кеш
 * @param urls
 */
export function loadImages(...urls: string[]) {
  urls.forEach(url => new Image().src = url);
}

/**
 * Предзагружает все необходимые ассеты
 */
export function preloadAssets() {
  loadImages(emojiSadUrl);
}

/**
 * Конвертирует массив ссылок в src-set
 * @param images - Массив кортежей [url, size]
 */
export function toSrcSet(images: [string, string][]): string {
  return images.map(([url, size]) => `${url} ${size}`).join(', ');
}
