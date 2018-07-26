module.exports = (baseConfig, env, defaultConfig) => {
  // Extend defaultConfig as you need.

  defaultConfig.node = { fs: 'empty' }

  return defaultConfig;
};