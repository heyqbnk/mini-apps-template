import {ReactNode, ReactNodeArray} from 'react';
import {StringKeys} from '../../types';

export type MemoizeKey<S extends {}> = <K extends StringKeys<S>>(key: K, value: S[K]) => Promise<any>;
export type MemoizeMap<S extends {}> = (values: Partial<S>) => Promise<any>;
export type ClearAll = () => Promise<any>;
export type ClearKeys<S extends {}> = (...keys: StringKeys<S>[]) => Promise<any>;

export interface VKStorageContext<S extends {} = {}> {
  /**
   * Current storage state
   */
  storage: S;
  /**
   * Memoizes values using VK storage
   */
  memoize: MemoizeKey<S> | MemoizeMap<S>;
  /**
   * Drops storage values
   */
  clear: ClearAll | ClearKeys<S>;
}

export interface VKStorageProviderProps<S extends {} = {}> {
  /**
   * Description of bridge storage
   */
  storage?: S;

  /**
   * Children
   */
  children: ReactNode | ReactNodeArray;
}
