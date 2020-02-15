interface IConfig {
  apiBaseUrl: string;
}

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

if (!apiBaseUrl) {
  throw new Error('REACT_APP_API_BASE_URL not passed');
}

const config: IConfig = {
  apiBaseUrl,
};

export default config;
