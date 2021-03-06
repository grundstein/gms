import { log } from '@grundstein/commons'

import {
  enhanceRequest,
  formatLog,
  getHostname,
  isSendableFile,
  respond,
  sendFile,
} from '@grundstein/commons/lib.mjs'

import fileStore from '@grundstein/file-store'

const cacheRefreshDelay = 5000

export const handler = async config => {
  const { dir } = config

  let store = await fileStore(dir)

  let lastRefresh = new Date().getTime()

  return async (req, res) => {
    const time = log.hrtime()

    req = enhanceRequest(req)

    const hostname = getHostname(req)

    formatLog(req, res, { time, type: `gms: request host ${hostname}` })

    let { url } = req
    url = url.split('?')[0]
    if (url.endsWith('/')) {
      url = `${url}index.html`
    }

    url = `/${hostname}${url}`

    const file = store.get(url)

    if (isSendableFile(file)) {
      sendFile(req, res, { file, code: 200, type: 'static' })
    } else {
      const file404 = store.get(url)

      if (isSendableFile(file404)) {
        // custom 404 file
        sendFile(req, res, { file: file404, code: 404, type: '404' })
      } else {
        // default 404 response
        respond(req, res, { body: '404 - not found.', code: 404 })
      }
    }

    const currentTime = new Date().getTime()
    if (currentTime > lastRefresh + cacheRefreshDelay) {
      formatLog(req, res, { time, type: 'gms: refresh store' })
      store = await fileStore(dir)
      lastRefresh = currentTime
    }
  }
}

export default handler
