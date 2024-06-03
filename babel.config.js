module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@components": "./components",
            "@screens": "./screens",
            "@assets": "./assets",
            "@utils": "./utils",
            "@navigations": "./navigations",
            "@services": "./services",
            "@hooks": "./hooks",
          },
        },
      ],
    ],
  };
};
