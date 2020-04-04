export interface Config {
  gqlHttpUrl: string;
  gqlWsUrl: string;
}

// We don't check if variables are passed, due to this logic is placed in
// prebuild.js file
const gqlHttpUrl = process.env.REACT_APP_GQL_HTTP_URL || '';
const gqlWsUrl = process.env.REACT_APP_GQL_WS_URL || '';

// Application build config
const config: Config = {gqlHttpUrl, gqlWsUrl};

export default config;
