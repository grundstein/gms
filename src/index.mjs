import http from 'http'

import { log } from '@grundstein/commons'

import middleware from '@grundstein/commons/middleware.mjs'

import handler from './handler.mjs'

export const run = async (config = {}) => {
  try {
    const startTime = log.hrtime()

    const { dir = 'public', host = '127.0.0.1', port = 2350 } = config

    const worker = await handler(dir)
    const server = http.createServer(worker)

    const clientError = middleware.clientError({ host, port, startTime })
    server.on('clientError', clientError)

    const listener = middleware.listener({ host, port, startTime })
    server.listen(port, listener)
  } catch (e) {
    log.error(e)
    process.exit(1)
  }
}

export default run
