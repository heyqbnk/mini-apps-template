import {OptionHTMLAttributes, ReactElement, ReactNode} from 'react';

/**
 * Returns selector which says that node is <options> with required value
 * @param {string | string[] | number} value
 * @returns {(node: React.ReactNode) => node is React.ReactElement<React.OptionHTMLAttributes<HTMLOptionElement>>}
 */
export function isOptionWithValue(value: string | string[] | number) {
  return (
    node: ReactNode,
  ): node is ReactElement<OptionHTMLAttributes<HTMLOptionElement>> => {
    if (node === null || typeof node !== 'object') {
      return false;
    }
    return 'type' in node
      && 'props' in node
      && node.type === 'option'
      && node.props.value === value;
  };
}
