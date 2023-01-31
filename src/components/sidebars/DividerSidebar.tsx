import React, { type ReactNode } from 'react'

export default function DividerSidebar({ children }: { children: ReactNode }) {
  return (
    <div>
      <div>{children}</div>
      DividerSidebar
    </div>
  )
}
