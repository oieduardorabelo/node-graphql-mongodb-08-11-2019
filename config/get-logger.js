let logger = {
  info(...infos) {
    console.log('[INFO]', ...infos);
  },
};

function onServerListen() {
  let { address, port } = this.address();
  logger.info(`Running server at [${address}]:${port}`);
}

module.exports = { logger, onServerListen };
