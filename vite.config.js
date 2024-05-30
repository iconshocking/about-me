import { defineConfig } from "vite";
import eslint from "vite-plugin-eslint";

// @ts-expect-error 'server.host' types are missing that it supports string arrays
export default defineConfig(() => {
  const config = {
    build: {
      sourcemap: true,
      // needed for github pages hosting
      outDir: "docs",
    },
    server: {
      // set this to your computer's local IP to access the dev server from devices on your network
      host: ["192.168.0.101", "localhost"],
    },
  };

  Object.assign(config, {
    plugins: [
      {
        ...eslint(),
        // only applies to the build command
        apply: "build",
      },
      {
        ...eslint({
          failOnError: false,
          failOnWarning: false,
        }),
        // only applies to the serve command, so won't fail the dev server
        apply: "serve",
        // Vite plugin execution order:
        // - Alias
        // - enforce: 'pre'
        // - Vite core plugins
        // - plugins without enforce value
        // - Vite build plugins
        // - enforce: 'post'
        // - Vite post build plugins (minify, manifest, reporting)
        enforce: "post",
      },
    ],
  });

  return config;
});
