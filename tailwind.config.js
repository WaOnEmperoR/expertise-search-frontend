/** @type {import('tailwindcss').Config} */
import flowbitePlugin from "flowbite/plugin";

export default {
  content: [
    'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx,vue}',
    'node_modules/flowbite/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // require('flowbite/plugin')
    flowbitePlugin
  ],
}

