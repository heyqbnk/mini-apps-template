import {APIError} from '../types';
import {isApolloError} from 'apollo-client';

/**
 * Detects if error is sent from Apollo API
 * @param e
 * @returns {e is GQLError}
 */
export function isAPIError(e: any): e is APIError {
  return isApolloError(e);
}
