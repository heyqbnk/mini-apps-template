import vkConnect from '@vkontakte/vk-connect';

/**
 * Legacy way of copying.
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
 * Copies text to clipboard.
 * @param text
 */
export async function copyToClipboard(text: string) {
  if (vkConnect.supports('VKWebAppCopyText')) {
    // @ts-ignore FIXME: https://github.com/VKCOM/vk-connect/issues/45
    return vkConnect.send('VKWebAppCopyText', {text});
  }

  if (!navigator.clipboard) {
    return fallbackCopyToClipboard(text);
  }
  return navigator.clipboard.writeText(text);
}
