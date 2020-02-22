module.exports = env => {
  const config = require(`./config/webpack.${env.mode}`);
  return config;
};
