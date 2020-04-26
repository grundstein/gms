import https from 'https'
import path from 'path'

import { fs, log, middleware } from '@grundstein/commons'

import { getHostCertificates } from '@grundstein/commons/lib.mjs'

import handler from './handler.mjs'

export const run = async (config = {}) => {
  try {
    const startTime = log.hrtime()

    const options = await getHostCertificates(config)

    const worker = await handler(config.dir)
    const server = https.createServer(options, worker)

    const clientError = middleware.clientError({ ...config, startTime })
    server.on('clientError', clientError)

    const listener = middleware.listener({ ...config, startTime })
    server.listen(config.port, config.host, listener)
  } catch (e) {
    log.error(e)
    process.exit(1)
  }
}

export default run
