import { log } from '@grundstein/commons'
import fileStore from '@grundstein/file-store'

export const initStore = async dir => {
  const startTime = log.hrtime()

  const store = await fileStore(dir)

  log.timeTaken(startTime, 'fileStore init took')

  return store
}
