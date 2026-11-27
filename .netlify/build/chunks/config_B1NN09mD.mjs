// \0virtual:emdash/config
var config_default = {
	"database": {
		"entrypoint": "emdash/db/sqlite",
		"config": { "url": "file:./data.db" },
		"type": "sqlite",
		"migrations": {
			"entrypoint": "emdash/internal/db/sqlite-migrations",
			"manifestConfig": { "url": "file:./data.db" }
		}
	},
	"migrations": { "runtime": "auto" },
	"storage": {
		"entrypoint": "emdash/storage/local",
		"config": {
			"directory": "./uploads",
			"baseUrl": "/_emdash/api/media/file"
		}
	},
	"objectCacheEnabled": false,
	"astroVersion": "7.4.13",
	"astroCspEnabled": false,
	"trailingSlash": "ignore",
	"robotsTxtOverridden": false,
	"imageEndpointRoute": "/_image",
	"sessionCookieName": "astro-session"
};
export { config_default as t };
