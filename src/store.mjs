import { log } from '@grundstein/commons'
import defaultStore from '@grundstein/file-store'

export const initStore = async (dir, fileStore = defaultStore) => {
  const startTime = log.hrtime()

  log.info(`gs-server/static: serving static files from ${dir}`)

  const store = await fileStore(dir)

  log.timeTaken(startTime, 'fileStore init took')

  return store
}
