import React, { type ReactNode } from 'react'
import { useFormContext } from 'react-hook-form'

import { useSelectedBlockState } from '@/context/selectedBlock'
import { type DefaultFormValues } from '@/pages/templates/[id]'

export default function DividerSidebar({ children }: { children: ReactNode }) {
  const { data: selectedBlockIndex } = useSelectedBlockState()
  const { control } = useFormContext<DefaultFormValues>()

  return (
    <div>
      <div>{children}</div>
      DividerSidebar
    </div>
  )
}
