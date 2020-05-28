import React, {memo, ReactNode, ReactNodeArray, useMemo} from 'react';

import {ApolloProvider as ReactApolloProvider} from '@apollo/react-hooks';

import {createApolloClient} from './utils';

export interface ApolloProviderProps {
  children: ReactNode | ReactNodeArray;
  launchParams: string;
  httpUrl: string;
  wsUrl: string;
}

export const ApolloProvider = memo(
  function ApolloProvider(props: ApolloProviderProps) {
    const {httpUrl, wsUrl, launchParams, children} = props;

    // Create Apollo client
    const client = useMemo(() => createApolloClient(
      httpUrl,
      wsUrl,
      launchParams,
    ), [httpUrl, wsUrl, launchParams]);

    return (
      <ReactApolloProvider client={client}>
        {children}
      </ReactApolloProvider>
    );
  },
);
