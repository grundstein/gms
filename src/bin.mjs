#!/usr/bin/env node

import { cli } from '@grundstein/commons'

import run from './index.mjs'

const opts = {
  options: [
    ['--help', '-help', 'help', '--h', '-h'],
    ['--dir', '-d'],
    ['--host', '-n'],
    ['--port', '-p'],
    ['--cert-dir', '--cert', '-c'],
  ],
  default: {
    '--dir': '/var/www/html',
    '--host': 'gms.grund.stein',
    '--port': 2350,
    '--cert-dir': '~/ca',
  },
  single: ['--dir', '--host', '--port', '--cert-dir'],
  help: {
    name: 'gms: grundstein magic server',
    header: 'serves static pages from memory.',
    options: {
      '--dir': 'root directory to serve from',
      '--host': 'hostname to listen to',
      '--port': 'port to listen to',
      '--cert-dir': 'directory containing certificates',
    },
    example: `
# serve files in ./api:
gms

# serve files using an absolute path, custom host and port.
gms --dir /api --host grundstein.it --port 2323
`,
  },
}

const { args } = cli(opts)

run(args)
