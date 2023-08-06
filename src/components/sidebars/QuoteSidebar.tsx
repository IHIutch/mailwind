import React, { type ReactNode } from 'react'
import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'

import { useSelectedBlockState } from '@/context/selectedBlock'
import { type DefaultFormValues } from '@/pages/templates/[id]'

export default function QuoteSidebar({
  className,
  closeButton,
}: {
  className?: string
  closeButton?: ReactNode
}) {
  const { data: selectedBlockIndex } = useSelectedBlockState()
  const { control } = useFormContext<DefaultFormValues>()
  return (
    <div className={cn('relative', className)}>
      {closeButton}
      <div className="mb-4 border-b p-3">
        <h2 className="text-xl font-semibold">Quote Block</h2>
      </div>
    </div>
  )
}
