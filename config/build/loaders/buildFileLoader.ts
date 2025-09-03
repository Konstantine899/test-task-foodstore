export function buildFileLoader() {
  return {
    test: /\.(png|jpe?g|gif|woof|woof2)$/i,
    use: [
      {
        loader: "file-loader",
      },
    ],
  };
}
