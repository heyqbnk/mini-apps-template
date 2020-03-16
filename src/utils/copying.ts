import vkBridge from '@vkontakte/vk-bridge';

/**
 * Устаревший способ копирования в буфер обмена
 * @param text
 */
async function fallbackCopyToClipboard(text: string) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  let err = null;

  try {
    const successful = document.execCommand('copy');
    const msg = successful ? 'successful' : 'unsuccessful';

    if (msg === 'unsuccessful') {
      err = 'Unable to copy';
    }
  } catch (ex) {
    err = ex;
  }
  document.body.removeChild(textArea);

  if (err) {
    throw new Error(err);
  }
}

/**
 * Копирует текст в буфер обмена
 * @param text
 */
export async function copyToClipboard(text: string) {
  if (vkBridge.supports('VKWebAppCopyText')) {
    return vkBridge.send('VKWebAppCopyText', {text});
  }

  if (!navigator.clipboard) {
    return fallbackCopyToClipboard(text);
  }
  return navigator.clipboard.writeText(text);
}
