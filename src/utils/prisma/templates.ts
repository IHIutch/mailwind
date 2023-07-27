import { prisma } from '@/server/prisma'
import { type Block, Prisma, type Template } from '@prisma/client'
import { getErrorMessage } from '../functions'

export const TemplateInclude = Prisma.validator<Prisma.TemplateInclude>()({
  blocks: {
    select: {
      updatedAt: true,
    },
  },
})

const getFullUpdatedAt = (
  template: Template,
  blocks: Pick<Block, 'updatedAt'>[]
) => {
  return new Date(
    Math.max(
      new Date(template.updatedAt).getTime(),
      ...blocks.map((b) => new Date(b.updatedAt).getTime())
    )
  )
}

export const prismaFindTemplates = async ({
  where,
}: {
  where: Prisma.TemplateWhereInput
}) => {
  try {
    const templates = await prisma.template.findMany({
      where,
      include: TemplateInclude,
    })
    return templates
      ? templates.map((t) => ({
          ...t,
          fullUpdatedAt: getFullUpdatedAt(t, t.blocks),
        }))
      : []
  } catch (error) {
    throw Error(getErrorMessage(error))
  }
}

export const prismaFindUniqueTemplate = async ({
  where,
}: {
  where: Prisma.TemplateWhereUniqueInput
}) => {
  try {
    const template = await prisma.template.findUnique({
      where,
      include: TemplateInclude,
    })
    return template
      ? {
          ...template,
          fullUpdatedAt: getFullUpdatedAt(template, template?.blocks),
        }
      : null
  } catch (error) {
    throw Error(getErrorMessage(error))
  }
}

export const prismaCreateTemplate = async ({
  data,
}: {
  data: Prisma.TemplateUncheckedCreateInput
}) => {
  try {
    const template = await prisma.template.create({
      data,
      include: TemplateInclude,
    })
    return template
      ? {
          ...template,
          fullUpdatedAt: getFullUpdatedAt(template, template?.blocks),
        }
      : null
  } catch (error) {
    throw Error(getErrorMessage(error))
  }
}

export const prismaUpdateTemplate = async ({
  where,
  data,
}: {
  where: Prisma.TemplateWhereUniqueInput
  data: Prisma.TemplateUncheckedUpdateInput
}) => {
  try {
    const template = await prisma.template.update({
      where,
      data,
      include: TemplateInclude,
    })
    return template
      ? {
          ...template,
          fullUpdatedAt: getFullUpdatedAt(template, template?.blocks),
        }
      : null
  } catch (error) {
    throw Error(getErrorMessage(error))
  }
}

export const prismaDeleteTemplate = async ({
  where,
}: {
  where: Prisma.TemplateWhereUniqueInput
}) => {
  try {
    return await prisma.template.delete({
      where,
    })
  } catch (error) {
    throw Error(getErrorMessage(error))
  }
}
