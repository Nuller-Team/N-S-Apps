import type { Options } from "$fresh/plugins/twind.ts";
import { defineConfig } from "twind";
// twind preset
import presetAutoPrefix from "twind-preset-autoprefix";
import presetTailWind from "twind-preset-tailwind";
import * as colors from "twind-preset-tailwind-colors";

export default {
  selfURL: import.meta.url,
  ...defineConfig({
    presets: [
      presetAutoPrefix(),
      presetTailWind({
        colors: {
          ...colors,
        },
      }),
    ],
  }),
} as Options;
