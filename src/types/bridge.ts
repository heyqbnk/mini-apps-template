/**
 * Список полей, которые могут храниться в хранилище bridge.
 */
export enum StorageField {
  ApplicationVisited = 'application-visited',
}

/**
 * Описывает то, какое поле имеет какой тип данных в хранилище bridge.
 * Пример - [StorageField.Joined]: boolean или [StorageField.Clubs]: IClub[]
 */
export interface StorageValuesMap {
  [StorageField.ApplicationVisited]: boolean;
}

/**
 * Возвращает тип данных для указанного поля хранилища.
 */
export type StorageValueType<T extends StorageField> = StorageValuesMap[T];
