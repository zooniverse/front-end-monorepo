# CacheService

A class that creates an instance of [node-cache](https://github.com/node-cache/node-cache) with a nice wrapper around the `get` method, allowing you to pass in a function to fetch the data you want to cache. The caching requirements for this app are pretty basic, so it currently only has this `get` method.
