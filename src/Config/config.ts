const dbUrl = "mongodb://127.0.0.1:27017/dummy";
const SERVER_PORT = 8080;

export const config = {
  mongo: {
    url: dbUrl,
  },
  server: {
    port: SERVER_PORT,
  },
};
