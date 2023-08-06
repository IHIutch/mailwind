import React, { type ReactElement } from 'react'
import { useFormContext } from 'react-hook-form'

import { useSelectedBlockState } from '@/context/selectedBlock'
import { type DefaultFormValues } from '@/pages/templates/[id]'
import { cn } from '@/utils/functions'
import CodeLanguageSelect from '../inputs/CodeLanguageSelect'
import CodeThemeSelect from '../inputs/CodeThemeSelect'
import { Label } from '../ui/Label'

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
    <div className={cn('relative', className)}>
      {closeButton}
      <div className="mb-4 border-b p-3">
        <h2 className="text-xl font-semibold">Code Block</h2>
      </div>
      <div className="space-y-4 px-4">
        <div>
          <Label
            htmlFor="codeLanguageSelect"
            className="mb-1 block text-sm font-semibold text-gray-700"
          >
            Language
          </Label>
          <CodeLanguageSelect
            id="languageField"
            inputProps={{
              name: `blocks.${selectedBlockIndex}.attributes.language` as 'blocks.0.attributes.language',
              control,
            }}
            errorClassName="mt-1 text-xs text-red-500"
          />
        </div>
        <div>
          <Label
            htmlFor="codeThemeSelect"
            className="mb-1 block text-sm font-semibold text-gray-700"
          >
            Theme
          </Label>
          <CodeThemeSelect
            id="languageField"
            inputProps={{
              name: `blocks.${selectedBlockIndex}.attributes.theme` as 'blocks.0.attributes.theme',
              control,
            }}
            errorClassName="mt-1 text-xs text-red-500"
          />
        </div>
      </div>
    </div>
  )
}
