const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/Lazarusdb',
  port: process.env.PORT || 3001
};

module.exports = config;
