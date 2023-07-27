import React, { type ReactElement } from 'react'
import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'

import { useSelectedBlockState } from '@/context/selectedBlock'
import { type DefaultFormValues } from '@/pages/templates/[id]'

export default function CodeSidebar({
  className,
  closeButton,
}: {
  className?: string
  closeButton?: ReactElement
}) {
  const { data: selectedBlockIndex } = useSelectedBlockState()
  const { control } = useFormContext<DefaultFormValues>()

  return (
    <div className={clsx('relative', className)}>
      {closeButton}
      <div className="mb-4 border-b px-3 pb-3">
        <h2 className="text-xl font-semibold">Code Block</h2>
      </div>
    </div>
  )
}
