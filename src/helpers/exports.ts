/**
 * It takes a path to an asset and returns a URL to that asset
 * @param path - The path to the asset file.
 * @returns A string of the URL to the asset.
 */
function getAsset(path: string) {
  const assetModules = import.meta.glob<{ default: string }>(
    "./../assets/**/*.*",
    { eager: true }
  );

  const assetsArray = Object.entries(assetModules).map(
    ([path, { default: processedPath }]) => {
      const [, pathWithoutPrefix] = path.split("../assets/");

      return [pathWithoutPrefix, processedPath];
    }
  );

  const assetsObj: { [path: string]: string } = Object.fromEntries(assetsArray);

  if (!assetsObj[path]) {
    throw "can't find asset: " + path;
  }

  return assetsObj[path];
}

export { getAsset };
