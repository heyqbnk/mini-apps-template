/**
 * List of errors which can be sent from Apollo API
 */
export enum APIErrorEnum {
}

/**
 * Description of errors sent from Apollo API
 */
export interface APIError<ExtraInfo = any> {
  message: string;
  graphQLErrors: ReadonlyArray<{
    message: string;
    name: APIErrorEnum;
  }>;
  networkError: Error | null;
  extraInfo: ExtraInfo;
}
