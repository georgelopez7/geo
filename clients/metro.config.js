const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);
config.resolver.sourceExts.push("sql");

// More comprehensive blocking
config.resolver.blockList = [
  /node_modules\/expo-sqlite\/web\/.*/,
  /node_modules\/expo-sqlite\/.*\/web\/.*/,
  /.*\.wasm$/,
  /.*\/wa-sqlite\/.*/,
  /.*\/worker\.ts$/,
];

// Force mobile-only platforms
config.resolver.platforms = ["native", "android", "ios"];

// Add resolver alias to completely ignore web modules
config.resolver.alias = {
  "expo-sqlite/web": false,
};

module.exports = withNativeWind(config, {
  input: "./global.css",
});
