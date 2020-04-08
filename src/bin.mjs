#!/usr/bin/env node

import cli from '@magic/cli'

import run from './index.mjs'

const args = {
  options: [
    ['--help', '-help', 'help', '--h', '-h'],
    // ['--watch', '-w'],
    ['--dir', '-d'],
    ['--host', '-h'],
    ['--port', '-p'],
  ],
  default: {
    '--dir': 'public',
    '--host': '127.0.0.1',
    '--port': 8080,
  },
  single: ['--dir', '--host', '--port'],
  help: {
    name: 'gms: grundstein magic server',
    header: 'serves prebuilt magic pages.',
    options: {
      '--dir': 'root for both api and static directories',
      '--host': 'internal hostname to listen to, default grundstein',
      '--port': 'port, default 8080',
    },
    example: `
# serve files in ./public:
gms

# serve files using an absolute path, a custom host and port 80
gms --dir /public --host example.com --port 80
`,
  },
}

const res = cli(args)

run(res)
