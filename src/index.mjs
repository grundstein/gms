import { log } from '@grundstein/commons'

import { createServer } from '@grundstein/commons/lib.mjs'

import handler from './handler.mjs'

export const run = async (config = {}) => {
  try {
    config.startTime = log.hrtime()

    const worker = await handler(config)
    await createServer(config, worker)
  } catch (e) {
    log.error(e)
    process.exit(1)
  }
}

export default run
