import vkBridge from '@vkontakte/vk-bridge';
import {EStorageField, TStorageValueType} from '../types/bridge';

/**
 * Задает значение для ключа хранилища.
 * @param {F} field
 * @param {TStorageValueType<F>} value
 * @returns {Promise<string extends ReceiveMethodName ? ReceiveData<string> : void>}
 */
export function setStorageValue<F extends EStorageField>(
  field: F,
  value: TStorageValueType<F>,
) {
  return vkBridge.send('VKWebAppStorageSet', {
    key: field,
    // encodeURIComponent - хак для русских букв. Они некорректно записываются
    // в хранилище.
    value: encodeURIComponent(JSON.stringify(value)),
  });
}

/**
 * Достает значения их хранилища.
 * @param {F} fields
 * @returns {Promise<{[Key in F]?: TStorageValueType<Key>}>}
 */
export async function getStorageValues<F extends EStorageField>(
  ...fields: F[]
): Promise<{ [Key in F]?: TStorageValueType<Key> }> {
  const {keys} = await vkBridge.send('VKWebAppStorageGet', {
    keys: fields,
  });

  return keys.reduce<{ [Key in F]: TStorageValueType<Key> }>((acc, k) => {
    try {
      acc[k.key as F] = JSON.parse(decodeURIComponent(k.value));
    } catch (e) {
    }
    return acc;
  }, {} as { [Key in F]: TStorageValueType<Key> });
}

/**
 * Удаляет значения из хранилища.
 * @param {EStorageField} fields
 * @returns {Promise<void>}
 */
export async function dropStorageValues(
  ...fields: EStorageField[]
): Promise<void> {
  await Promise.all(
    fields.map(f => vkBridge.send('VKWebAppStorageSet', {
      key: f,
      value: '',
    })),
  );
}
