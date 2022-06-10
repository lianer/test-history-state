import { decrypt } from './lib/encrypt';

const config = {
  API_SERVER: decrypt(process.env.REACT_APP_API_SERVER),
  IMAGE_SERVER: decrypt(process.env.REACT_APP_IMAGE_SERVER),
};

export default config;
