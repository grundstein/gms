import https from 'https'
import path from 'path'

import { fs, log, middleware } from '@grundstein/commons'

import handler from './handler.mjs'

export const run = async (config = {}) => {
  try {
    const startTime = log.hrtime()

    const {
      dir = path.join('/var', 'www', 'html'),
      host = 'gms.grund.stein',
      port = 2350,
      certDir = path.join('/root', 'ca', 'intermediate'),
    } = config

    const keyFile = path.join(certDir, 'private', `${host}.key.pem`)
    const certFile = path.join(certDir, 'certs', `${host}.cert.pem`)

    const options = {
      key: await fs.readFile(keyFile),
      cert: await fs.readFile(certFile),
    }

    const worker = await handler(dir)
    const server = https.createServer(options, worker)

    const clientError = middleware.clientError({ host, port, startTime })
    server.on('clientError', clientError)

    const listener = middleware.listener({ host, port, startTime })
    server.listen(port, host, listener)
  } catch (e) {
    log.error(e)
    process.exit(1)
  }
}

export default run
