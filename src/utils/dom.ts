interface Insets {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

/**
 * Returns device insets
 * @returns {Insets}
 */
export function getInsets(): Insets {
  const computedStyle = getComputedStyle(document.documentElement);

  return {
    top: parseInt(
      computedStyle.getPropertyValue('--safe-area-inset-top'),
    ),
    bottom: parseInt(
      computedStyle.getPropertyValue('--safe-area-inset-bottom'),
    ),
    left: parseInt(
      computedStyle.getPropertyValue('--safe-area-inset-left'),
    ),
    right: parseInt(
      computedStyle.getPropertyValue('--safe-area-inset-right'),
    ),
  };
}

/**
 * Updates body overflow ability.
 * TODO: Move to GlobalStyleSheet or some context provider
 * @param {boolean} overflow
 */
export function setBodyOverflow(overflow: boolean) {
  document.body.style.overflow = overflow ? '' : 'hidden';
  document.body.style.height = overflow ? '' : '100%';
}
