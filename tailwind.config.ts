import { skeleton } from '@skeletonlabs/tw-plugin';
import forms from '@tailwindcss/forms';
import { join } from 'path';
import type { Config } from 'tailwindcss';
import { fontFamily } from "tailwindcss/defaultTheme";


const config = {
  // 2. Opt for dark mode to be handled via the class method
  darkMode: 'class',
  content: [
    './src/**/*.{html,js,svelte,ts}',
    // 3. Append the path to the Skeleton package
    join(require.resolve(
      '@skeletonlabs/skeleton'),
      '../**/*.{html,js,svelte,ts}'
    )
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"ubuntu"', ...fontFamily.sans],
      }
    },
  },
  plugins: [
    // 4. Append the Skeleton plugin (after other plugins)
    forms,
    skeleton({
      themes: { preset: ["skeleton", { name: "hamlindigo", enhancements: true }, "seafoam", { name: "gold-nouveau" }, { name: "rocket" }], }
    }),
  ]
} satisfies Config;

export default config;