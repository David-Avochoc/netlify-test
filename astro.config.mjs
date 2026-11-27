
import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify";
import react from "@astrojs/react";

import emdash, { local } from "emdash/astro";
import { sqlite, postgres } from "emdash/db";

const database = process.env.NETLIFY_DB_URL
  ? postgres({
      connectionString: process.env.NETLIFY_DB_URL,
      migrationConnectionStringEnv: "NETLIFY_DB_URL",
    })
  : sqlite({
      url: "file:./data.db",
    });

export default defineConfig({
  output: "server",

  adapter: netlify(),

  integrations: [
    react(),

    emdash({
      database,

      storage: local({
        directory: "./uploads",
        baseUrl: "/_emdash/api/media/file",
      }),
    }),
  ],
});
