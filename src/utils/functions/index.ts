import { type ClassValue } from 'class-variance-authority/dist/types'
import clsx from 'clsx'
import { LexoRank } from 'lexorank'
import { twMerge } from 'tailwind-merge'

export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message
  return String(error)
}

export function getBaseUrl() {
  if (process.env.NODE_ENV !== 'production') {
    return `http://localhost:${process.env.PORT ?? 3000}`
  } else {
    return (
      process.env.NEXT_PUBLIC_SITE_URL ?? process.env.NEXT_PUBLIC_VERCEL_URL
    )
  }
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

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
