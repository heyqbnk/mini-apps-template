/**
 * Список полей, которые могут храниться в хранилище bridge.
 */
export enum EStorageField {
  ApplicationVisited = 'application-visited',
}

/**
 * Описывает то, какое поле имеет какой тип данных в хранилище bridge.
 * Пример - [EStorageField.Joined]: boolean или [EStorageField.Clubs]: IClub[]
 */
export interface IStorageValuesMap {
  [EStorageField.ApplicationVisited]: boolean;
}

/**
 * Возвращает тип данных для указанного поля хранилища.
 */
export type TStorageValueType<T extends EStorageField> = IStorageValuesMap[T];
