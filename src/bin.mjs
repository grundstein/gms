#!/usr/bin/env node

import cli from '@magic/cli'

import run from './index.mjs'

const args = {
  options: [
    ['--help', '-help', 'help', '--h', '-h'],
    ['--dir', '-d'],
  ],
  default: {
    '--dir': 'public',
  },
  single: ['--dir'],
  help: {
    name: 'gms: grundstein magic server',
    header: 'serves static pages from memory.',
    options: {
      '--dir': 'root for both api and static directories',
    },
    example: `
# serve files in ./public:
gms

# serve files using an absolute path
gms --dir /public
`,
  },
}

const res = cli(args)

run(res)
