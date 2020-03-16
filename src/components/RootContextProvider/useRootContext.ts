import {useContext} from 'react';
import rootContext from './context';

/**
 * Позволяет использовать контекст, предоставляемый корнем приложения
 * @returns {RootContext}
 */
const useRootContext = () => useContext(rootContext);

export default useRootContext;
