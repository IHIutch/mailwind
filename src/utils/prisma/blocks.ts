import { prisma } from '@/server/prisma'
import { Prisma } from '@prisma/client'
import { getErrorMessage } from '../functions'

const BlockSelect = Prisma.validator<Prisma.BlockSelect>()({
  id: true,
  type: true,
  attributes: true,
  value: true,
  templateId: true,
  position: true,
})

export type SingleBlockPayloadType = Prisma.BlockGetPayload<{
  select: typeof BlockSelect
}>

export const prismaFindBlocks = async ({
  where,
}: {
  where: Prisma.BlockWhereInput
}) => {
  try {
    return await prisma.block.findMany({
      where,
      select: BlockSelect,
      orderBy: {
        position: 'asc',
      },
    })
  } catch (error) {
    throw Error(getErrorMessage(error))
  }
}

export const prismaFindUniqueBlock = async ({
  where,
}: {
  where: Prisma.BlockWhereUniqueInput
}) => {
  try {
    return await prisma.block.findUnique({
      where,
      select: BlockSelect,
    })
  } catch (error) {
    throw Error(getErrorMessage(error))
  }
}

export const prismaCreateBlock = async ({
  data,
}: {
  data: Prisma.BlockCreateWithoutTemplateInput
}) => {
  try {
    return await prisma.block.create({
      data,
      select: BlockSelect,
    })
  } catch (error) {
    throw Error(getErrorMessage(error))
  }
}

export const prismaUpdateBlock = async ({
  where,
  data,
}: {
  where: Prisma.BlockWhereUniqueInput
  data: Prisma.BlockUpdateWithoutTemplateInput
}) => {
  try {
    return await prisma.block.update({
      where,
      data,
      select: BlockSelect,
    })
  } catch (error) {
    throw Error(getErrorMessage(error))
  }
}

export const prismaDeleteBlock = async ({
  where,
}: {
  where: Prisma.BlockWhereUniqueInput
}) => {
  try {
    return await prisma.block.delete({
      where,
    })
  } catch (error) {
    throw Error(getErrorMessage(error))
  }
}
