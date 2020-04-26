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
    '--cert-dir': '/root/ca/intermediate',
  },
  single: ['--dir', '--host', '--port', '--cert-dir'],
  help: {
    name: 'gms: grundstein magic server',
    header: 'serves static pages from memory.',
    options: {
      '--dir': 'root for both api and static directories, default: /var/www/html',
      '--host': 'hostname to listen to, default: gms.grund.stein',
      '--port': 'port, default: 2350',
      '--cert-dir': 'directory with certificates, default: /root/ca/intermediate'
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
