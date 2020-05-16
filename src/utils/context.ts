import {Context, useContext} from 'react';

/**
 * Creates function which calls useContext and throws an error in case, when
 * context value is null
 * @param {string} hookName
 * @param {React.Context<C>} context
 * @returns {() => React.Context<Exclude<C, null>>}
 */
export function createUseNullableContext<C>(
  hookName: string,
  context: Context<C | null>,
): () => C {
  return () => {
    const value = useContext(context);

    if (!value) {
      throw new Error(
        `Hook ${hookName} was called outside of context provider context`,
      );
    }

    return value;
  };
}
