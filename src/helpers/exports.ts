/**
 * It takes a path to an asset and returns a URL to that asset
 * @param path - The path to the asset file.
 * @returns A string of the URL to the asset.
 */
function getAsset(path: string) {
  const url = new URL(`./../assets/${path}`, import.meta.url);

  return url.toString();
}

export { getAsset };
