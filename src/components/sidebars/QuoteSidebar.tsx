import React, { type ReactNode } from 'react'

export default function QuoteSidebar({ children }: { children: ReactNode }) {
  return (
    <div>
      <div>{children}</div>
      QuoteSidebar
    </div>
  )
}
