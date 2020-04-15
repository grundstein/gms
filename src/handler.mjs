import log from '@magic/log'

import { enhanceRequest, formatLog, getHostname, isSendableFile, respond, sendFile } from '@grundstein/commons/src/lib/index.mjs'

import { initStore } from './store.mjs'

const storeRefreshTime = 5000

export const handler = async dir => {
  let store = await initStore(dir)

  let lastRefresh = new Date().getTime()

  return async (req, res) => {
    const startTime = log.hrtime()

    req = await enhanceRequest(req)

    const hostname = getHostname(req).split(':')[0]

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

    const currentTime = new Date().getTime();
    if (currentTime > lastRefresh + 5000) {
      console.log('refresh store')
      store = await initStore(dir)
      lastRefresh = currentTime
    }
  }
}

export default handler
