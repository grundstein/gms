import http from 'http'

import { log } from '@grundstein/commons'

import defaultStore from '@grundstein/file-store'

import { initStore } from './store.mjs'
import { handler as defaultHandler } from './handler.mjs'

export const run = async (config = {}) => {
  const startTime = log.hrtime()

  const {
    args = {},
    handler = defaultHandler,
    fileStore = defaultStore,
  } = config

  const { port = 23230, host = '127.0.0.1', dir = 'static/public' } = args

  try {
    const store = await initStore(dir, fileStore)

    const server = http.createServer(handler(store))

    server.on('clientError', (err, socket) => {
      socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
    })

    server.listen(port, host, () => {
      const timeToListen = process.hrtime(startTime)

      log.success('Mainthread started', `pid: ${process.pid}`)
      log(`server listening to ${host}:${port}`)

      log.timeTaken(startTime, 'startup needed:')
    })
  } catch (e) {
    log.error(e)
    process.exit(1)
  }
}

export default run
