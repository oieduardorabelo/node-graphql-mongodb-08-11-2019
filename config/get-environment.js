let {
  PORT,
  JWT_SECRET_STRING,
  JWT_EXPIRES_IN,
  MONGO_CONNECTION_URL,
  MONGO_DATABASE_NAME,
} = process.env;

module.exports = {
  PORT,
  JWT_SECRET_STRING,
  JWT_EXPIRES_IN,
  MONGO_CONNECTION_URL,
  MONGO_DATABASE_NAME,
};
