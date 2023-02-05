import { LexoRank } from 'lexorank'

export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message
  return String(error)
}

export function getBaseUrl() {
  if (typeof window !== 'undefined')
    // browser should use relative path
    return ''

  if (process.env.VERCEL_URL)
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export const getNewLexoPosition = (start?: string, end?: string) => {
  if (start && end) {
    return LexoRank.parse(start).between(LexoRank.parse(end)).toString()
  } else if (end) {
    return LexoRank.parse(end).genPrev().toString()
  } else if (start) {
    return LexoRank.parse(start).genNext().toString()
  } else {
    return ''
  }
}
