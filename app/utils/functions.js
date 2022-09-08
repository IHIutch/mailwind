import { nanoid } from 'nanoid-good'
import en from 'nanoid-good/locale/en'

export const getNanoId = () => {
  const handleGetNanoId = nanoid(en)
  return handleGetNanoId(12)
}
