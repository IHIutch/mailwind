import React, { type ReactNode } from 'react'
import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'

import { useSelectedBlockState } from '@/context/selectedBlock'
import { type DefaultFormValues } from '@/pages/templates/[id]'

export default function DividerSidebar({
  className,
  closeButton,
}: {
  className?: string
  closeButton?: ReactNode
}) {
  const { data: selectedBlockIndex } = useSelectedBlockState()
  const { control } = useFormContext<DefaultFormValues>()

  return (
    <div className={clsx('relative', className)}>
      {closeButton}
      <div className="mb-4 px-3">
        <h2 className="font-semibold">Divider Block</h2>
      </div>
    </div>
  )
}
