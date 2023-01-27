import { blockSchema } from '../zod/schemas'
import prisma from '@/server/prisma'

export const prismaGetBlocks = async (where) => {
  try {
    const validWhere = blockSchema.parse(where)
    return await prisma.Block.findMany({
      where: validWhere,
      orderBy: {
        position: 'asc',
      },
    })
  } catch (error) {
    throw Error(error.message)
  }
}

export const prismaGetBlock = async (where) => {
  try {
    const validWhere = blockSchema.parse(where)
    return await prisma.Block.findUnique({
      where: validWhere,
    })
  } catch (error) {
    throw Error(error.message)
  }
}

export const prismaPostBlock = async (payload) => {
  try {
    const validPayload = blockSchema.parse(payload)
    return await prisma.Block.create({
      data: validPayload,
    })
  } catch (error) {
    throw Error(error.message)
  }
}

export const prismaPutBlock = async (where, payload) => {
  try {
    const validPayload = blockSchema.parse(payload)
    const validWhere = blockSchema.parse(where)
    return await prisma.Block.update({
      data: validPayload,
      where: validWhere,
    })
  } catch (error) {
    throw Error(error.message)
  }
}

export const prismaPutBlocks = async (payload) => {
  try {
    const validPayload = await Promise.all(
      payload.map(async (p) => blockSchema.parse(p))
    )
    return await prisma.$transaction(
      validPayload.map((vp) =>
        prisma.Block.update({
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
    throw Error(error.message)
  }
}

export const prismaDeleteBlock = async (where) => {
  try {
    const validWhere = blockSchema.parse(where)
    return await prisma.Block.delete({
      where: validWhere,
    })
  } catch (error) {
    throw Error(error.message)
  }
}