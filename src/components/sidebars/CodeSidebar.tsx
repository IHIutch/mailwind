import React, { type ReactNode } from 'react'

export default function CodeSidebar({ children }: { children: ReactNode }) {
  return (
    <div>
      <div>{children}</div>
      CodeSidebar
    </div>
  )
}
