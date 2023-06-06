#!/usr/bin/env node
import opts from '../options.js'
import stdEngine from 'standard-engine'

if (process.version.match(/v(\d+)\./)[1] < 4) {
  console.error('standardx: Node v4 or greater is required. `standardx` did not run.')
} else {
  stdEngine.cli(opts)
}
