import vkBridge from '@vkontakte/vk-bridge';
import {
  StorageField,
  StorageValuesMap,
  StorageValueType,
} from '../types/bridge';

/**
 * Задает значение для ключа хранилища.
 * @param {F} field
 * @param {StorageValueType<F>} value
 * @returns {Promise<string extends ReceiveMethodName ? ReceiveData<string> : void>}
 */
export async function setStorageValue<F extends StorageField>(
  field: F,
  value: StorageValueType<F>,
): Promise<void> {
  await vkBridge.send('VKWebAppStorageSet', {
    key: field,
    // encodeURIComponent - хак для русских букв. Они некорректно записываются
    // в хранилище.
    value: encodeURIComponent(JSON.stringify(value)),
  });
}

/**
 * То же самое что setStorageValue только сразу для нескольких значений.
 * @param {Partial<StorageValuesMap>} values
 * @returns {Promise<void>}
 */
export async function setStorageValues(
  values: Partial<StorageValuesMap>,
): Promise<void> {
  await Promise.all(
    Object.entries(values).map(([field, value]) => {
      return vkBridge.send('VKWebAppStorageSet', {
        key: field,
        value: encodeURIComponent(JSON.stringify(value)),
      })
    })
  );
}

/**
 * Достает значения их хранилища.
 * @param {F} fields
 * @returns {Promise<{[Key in F]?: StorageValueType<Key>}>}
 */
export async function getStorageValues<F extends StorageField>(
  ...fields: F[]
): Promise<{ [Key in F]?: StorageValueType<Key> }> {
  const {keys} = await vkBridge.send('VKWebAppStorageGet', {
    keys: fields,
  });

  return keys.reduce<{ [Key in F]: StorageValueType<Key> }>((acc, k) => {
    try {
      acc[k.key as F] = JSON.parse(decodeURIComponent(k.value));
    } catch (e) {
    }
    return acc;
  }, {} as { [Key in F]: StorageValueType<Key> });
}

/**
 * Удаляет значения из хранилища.
 * @param {StorageField} fields
 * @returns {Promise<void>}
 */
export async function dropStorageValues(
  ...fields: StorageField[]
): Promise<void> {
  await Promise.all(
    fields.map(f => vkBridge.send('VKWebAppStorageSet', {
      key: f,
      value: '',
    })),
  );
}

/**
 * Полностью удаляет все значения из хранилища
 * @returns {Promise<void>}
 */
export function dropStorage() {
  return dropStorageValues(...Object.values(StorageField));
}
