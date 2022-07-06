import { readFileSync } from "fs";
import path from "path";
import dirtyJSON from "dirty-json";

function getExports(filePath: string) {
  const exportsFile = readFileSync(path.resolve(__dirname, filePath), {
    encoding: "utf-8",
  });

  const exportedSymbols = exportsFile
    .split("export ")[1]
    .replace("{", "[")
    .replace("}", "]")
    .replaceAll(";", "")
    .replaceAll(" ", "")
    .replaceAll("\r", "")
    .replaceAll("\t", "")
    .replaceAll("\n", "");

  return dirtyJSON.parse(exportedSymbols);
}

// https://github.com/antfu/unplugin-auto-import#configuration
export default {
  dts: "auto-imports.d.ts",
  include: [
    /\.js$/,
    /\.ts$/,
    /\.vue$/,
    /\.vue\?vue/, // .vue
  ],

  imports: [
    // presets
    "vue",
    "vue-router",
    "quasar",
    {
      "@helpers/exports": getExports("./../src/helpers/exports.ts"),
    },
    {
      "@store": getExports("./../src/store/index.ts"),
    },
  ],
  eslintrc: {
    enabled: true,
    filepath: "./.eslintrc-auto-import.json",
    globalsPropValue: true,
  },
};
