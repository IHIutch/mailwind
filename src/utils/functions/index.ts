import { LexoRank } from 'lexorank'

export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message
  return String(error)
}

export function getBaseUrl() {
  return (
    process.env?.NEXT_PUBLIC_SITE_URL ??
    process.env?.NEXT_PUBLIC_VERCEL_URL ??
    `http://localhost:${process.env.PORT ?? 3000}`
  )
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
