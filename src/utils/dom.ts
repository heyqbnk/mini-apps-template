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
    top: parseInt(computedStyle.getPropertyValue('--sat')),
    bottom: parseInt(computedStyle.getPropertyValue('--sab')),
    left: parseInt(computedStyle.getPropertyValue('--sal')),
    right: parseInt(computedStyle.getPropertyValue('--sar')),
  };
}
