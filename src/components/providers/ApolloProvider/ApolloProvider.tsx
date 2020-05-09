import React, {memo, ReactNode, ReactNodeArray, useMemo} from 'react';

import {ApolloProvider as ReactApolloProvider} from '@apollo/react-hooks';

import {useConfig} from '../ConfigProvider';
import {createApolloClient} from '../../app/AppRoot';

export interface ApolloProviderProps {
  children: ReactNode | ReactNodeArray;
}

export const ApolloProvider = memo(
  function ApolloProvider(props: ApolloProviderProps) {
    const {envConfig, launchParams} = useConfig();
    const {gqlHttpUrl, gqlWsUrl} = envConfig;

    // Convert launch params object to string
    const launchParamsAsString = useMemo(() => Object.keys(launchParams)
      .reduce<string>((acc, key, idx) => {
        return acc
          + (idx === 0 ? '' : '&')
          + `${key}=${(launchParams as any)[key]}`;
      }, ''), [launchParams]);

    // Create Apollo client
    const client = useMemo(() => createApolloClient({
      httpURI: gqlHttpUrl,
      wsURI: gqlWsUrl,
      launchParams: launchParamsAsString,
    }), [gqlHttpUrl, gqlWsUrl, launchParamsAsString]);

    return <ReactApolloProvider client={client} {...props}/>;
  },
);
