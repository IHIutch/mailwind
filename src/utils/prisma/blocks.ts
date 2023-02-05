import { getErrorMessage } from '../functions'
import { prisma } from '@/server/prisma'
import { Prisma } from '@prisma/client'

export const prismaFindBlocks = async ({
  where,
}: {
  where: Prisma.BlockWhereInput
}) => {
  try {
    return await prisma.block.findMany({
      where,
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
