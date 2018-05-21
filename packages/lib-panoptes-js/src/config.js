/*
Configuration Settings
----------------------

The config settings change depending on which environment the app is running in.
By default, this is the development environment, but this can be changed either by:

* An env query string, e.g. localhost:3735?env=production
  (This changes the Panoptes JS Client does)
* The NODE_ENV environment variable on the system running the app.

 */

// Try and match the location.search property against a regex. Basically mimics
// the CoffeeScript existential operator, in case we're not in a browser.
function locationMatch(regex) {
  let match;
  if (typeof location !== 'undefined' && location !== null) {
    match = location.search.match(regex);
  }
  return (match && match[1]) ? match[1] : undefined;
}

const DEFAULT_ENV = 'development';
const envFromBrowser = locationMatch(/\W?env=(\w+)/);
const envFromShell = process.env.NODE_ENV;
const env = envFromBrowser || envFromShell || DEFAULT_ENV;

if (!env.match(/^(production|staging|test|development)$/)) {
  throw new Error(`Error: Invalid Environment - ${envFromShell}`);
}

const baseConfig = {
  development: {
    host: 'https://panoptes-staging.zooniverse.org/api',
    oauth: 'https://panoptes-staging.zooniverse.org'
  },
  test: {
    host: 'https://panoptes-staging.zooniverse.org/api',
    oauth: 'https://panoptes-staging.zooniverse.org'
  },
  staging: {
    host: 'https://panoptes-staging.zooniverse.org/api',
    oauth: 'https://panoptes-staging.zooniverse.org'
  },
  production: {
    host: 'https://www.zooniverse.org/api',
    oauth: 'https://panoptes.zooniverse.org'
  }
};

const config = baseConfig[env];
// TODO: Should there be default params?

module.exports = { env, config, locationMatch };
