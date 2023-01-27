import { getErrorMessage } from '../functions'
import { blockSchema } from '../zod/schemas'
import { prisma } from '@/server/prisma'
import { z } from 'zod'

type whereType = z.input<typeof blockSchema>
type payloadType = z.input<typeof blockSchema>

export const prismaGetBlocks = async (where: whereType) => {
  try {
    const validWhere = blockSchema.parse(where)
    return await prisma.block.findMany({
      where: validWhere,
      orderBy: {
        position: 'asc',
      },
    })
  } catch (error) {
    throw Error(getErrorMessage(error))
  }
}

export const prismaGetBlock = async (where: whereType) => {
  try {
    const validWhere = blockSchema.parse(where)
    return await prisma.block.findUnique({
      where: validWhere,
    })
  } catch (error) {
    throw Error(getErrorMessage(error))
  }
}

export const prismaPostBlock = async (payload: payloadType) => {
  try {
    const validPayload = blockSchema.parse(payload)
    return await prisma.block.create({
      data: validPayload,
    })
  } catch (error) {
    throw Error(getErrorMessage(error))
  }
}

export const prismaPutBlock = async (
  where: whereType,
  payload: payloadType
) => {
  try {
    const validPayload = blockSchema.parse(payload)
    const validWhere = blockSchema.parse(where)
    return await prisma.block.update({
      data: validPayload,
      where: validWhere,
    })
  } catch (error) {
    throw Error(getErrorMessage(error))
  }
}

export const prismaPutBlocks = async (payload: payloadType[]) => {
  try {
    const validPayload = await Promise.all(
      payload.map(async (p) => blockSchema.parse(p))
    )
    return await prisma.$transaction(
      validPayload.map((vp) =>
        prisma.block.update({
          data: vp,
          where: {
            id: vp.id,
          },
          select: {
            id: true,
            position: true,
          },
        })
      )
    )
  } catch (error) {
    throw Error(getErrorMessage(error))
  }
}

export const prismaDeleteBlock = async (where: whereType) => {
  try {
    const validWhere = blockSchema.parse(where)
    return await prisma.block.delete({
      where: validWhere,
    })
  } catch (error) {
    throw Error(getErrorMessage(error))
  }
}
