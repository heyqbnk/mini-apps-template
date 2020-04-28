import {ReactElement} from 'react';

/**
 * Checks if each child has unique id
 * @param {React.ReactElement<T> | React.ReactElement<T>[]} children
 * @returns {boolean}
 */
export function isEachChildHasUniqueId<T extends { id: string }>(
  children: ReactElement<T> | ReactElement<T>[],
): boolean {
  const childrenArr = Array.isArray(children) ? children : [children];
  const ids = childrenArr.map(c => c.props.id);

  return ids.every((id, idx, arr) => {
    return arr.indexOf(id, idx + 1) === -1;
  });
}
