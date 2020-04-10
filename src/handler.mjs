import log from '@magic/log'

import { lib } from '@grundstein/commons'

const { formatLog, respond, sendFile } = lib

export const handler = store => async (req, res) => {
  const startTime = log.hrtime()

  req = await lib.enhanceRequest(req)


  let { url } = req
  if (url.endsWith('/')) {
    url = `${url}index.html`
  }

  if (store) {
    const file = store.get(url)

    if (file) {
      sendFile(req, res, file)
      formatLog(req, res, startTime, 'static')
      return
    }
  }

  respond(res, { body: '404 - not found.', code: 404 })

  formatLog(req, res, startTime, 404)
}
