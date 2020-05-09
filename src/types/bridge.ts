/**
 * List of keys, which can be placed into bridge storage
 */
export enum StorageFieldEnum {
  ApplicationVisited = 'application-visited',
}

/**
 * Describes which bridge storage key has stated data type
 */
export interface StorageValuesMap {
  [StorageFieldEnum.ApplicationVisited]: boolean;
}
