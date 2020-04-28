import ApolloClient from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {WebSocketLink} from 'apollo-link-ws';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {split} from 'apollo-link';
import {getMainDefinition} from 'apollo-utilities';

interface CreateApolloClientOptions {
  httpURI: string;
  wsURI: string;
  launchParams: string;
}

/**
 * Creates ApolloClient with websocket- and http-link
 * @param {CreateApolloClientOptions} options
 * @returns {ApolloClient<any>}
 */
export function createApolloClient(
  options: CreateApolloClientOptions,
): ApolloClient<any> {
  const {httpURI, launchParams, wsURI} = options;

  // We can authenticate users only with launch parameters sent from VKontakte.
  // To check them on server side, we send them in header
  const httpLink = new HttpLink({
    uri: httpURI,
    headers: {'x-launch-params': launchParams},
  });

  // In WebSocket connection we are using connectionParams instead of headers,
  // because there is no another way we can authenticate user.
  // You are free to remove this variable if there are no subscriptions in
  // your project and use "httpLink" instead of "link"
  const wsLink = new WebSocketLink({
    uri: wsURI,
    options: {
      reconnect: true,
      connectionParams: {launchParams},
    },
  });

  const link = split(
    ({query}) => {
      const definition = getMainDefinition(query);

      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );

  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });
}
