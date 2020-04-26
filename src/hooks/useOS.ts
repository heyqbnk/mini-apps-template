import {useSelector} from './useSelector';

/**
 * Returns current operating system
 * @returns {OS}
 */
export const useOS = () => useSelector(state => state.device.os);
