export interface Config {
  gqlHttpUrl: string;
  gqlWsUrl: string;
}

// Application build config. We don't check if variables are passed, due to
// this logic is placed in prebuild.js file
const config: Config = {
  gqlHttpUrl: process.env.REACT_APP_GQL_HTTP_URL || '',
  gqlWsUrl: process.env.REACT_APP_GQL_WS_URL || '',
};

export default config;
