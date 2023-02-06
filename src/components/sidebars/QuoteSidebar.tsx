import { useSelectedBlockState } from '@/context/selectedBlock'
import { DefaultFormValues } from '@/pages/templates/[id]'
import React, { type ReactNode } from 'react'
import { useFormContext } from 'react-hook-form'

export default function QuoteSidebar({ children }: { children: ReactNode }) {
  const { data: selectedBlockIndex } = useSelectedBlockState()
  const { control } = useFormContext<DefaultFormValues>()
  return (
    <div>
      <div>{children}</div>
      QuoteSidebar
    </div>
  )
}
