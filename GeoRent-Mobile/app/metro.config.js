module.exports = {
  resolver: {
    assetExts: ['db', 'mp3', 'ttf', 'obj', 'png', 'jpg', 'obj', 'fbx'],
    sourceExts: ['jsx', 'js', 'json', 'ts', 'tsx', 'wasm'],
    resolverMainFields: ['hermes', 'browser', 'module', 'main'],
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};
