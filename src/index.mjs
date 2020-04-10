import http from 'http'

import { log, middleware } from '@grundstein/commons'

import fileStore from '@grundstein/file-store'

import { initStore } from './store.mjs'
import { handler } from './handler.mjs'

export const run = async (config = {}) => {
  const startTime = log.hrtime()

  const { args = {} } = config

  const { dir = 'public', host = '127.0.0.1', port = '2350' } = args

  try {
    const store = await initStore(dir, fileStore)

    const server = http.createServer(handler(store))

    server.on('clientError', (err, socket) => {
      socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
    })

    const listener = middleware.listener({ startTime, host, port })

    server.listen(port, host, listener)
  } catch (e) {
    log.error(e)
    process.exit(1)
  }
}

export default run
