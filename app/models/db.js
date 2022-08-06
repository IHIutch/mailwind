import Dexie from 'dexie'
import { MjWrapper } from '../components/BodyComponents'

export const db = new Dexie('mailwind')
db.version(1).stores({
  body: '++id, parentId', // Primary key and indexed props
})

db.on('populate', async () => {
  const wrapperAttributes = Object.entries(MjWrapper.attributes).reduce(
    (acc, [key, value]) => ({ ...acc, [key]: value.defaultValue }),
    {}
  )
  await db.body.add({
    ...wrapperAttributes,
    tagName: MjWrapper.tagName,
    parentId: -1,
  })
})
