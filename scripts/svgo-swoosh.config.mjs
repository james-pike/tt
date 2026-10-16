export default {
  multipass: true,
  floatPrecision: 1,
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          removeViewBox: false,
          // keep group ids so we can target orange/yellow separately
          cleanupIds: false,
          collapseGroups: false,
        },
      },
    },
    "mergePaths",
  ],
};
