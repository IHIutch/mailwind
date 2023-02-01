import { prisma } from '@/server/prisma'
import { getErrorMessage } from '../functions'
import { userSchema } from '../zod/schemas'

export const prismaGetUsers = async (where) => {
  try {
    const validWhere = userSchema.parse(where)
    return await prisma.user.findMany({
      where: validWhere,
      include: {
        memberships: true,
      },
    })
  } catch (error) {
    throw Error(getErrorMessage(error))
  }
}

export const prismaGetUser = async (where) => {
  try {
    const validWhere = userSchema.parse(where)
    return await prisma.user.findUnique({
      where: validWhere,
      include: {
        memberships: true,
      },
    })
  } catch (error) {
    throw Error(getErrorMessage(error))
  }
}

export const prismaPostUser = async (payload) => {
  try {
    const validPayload = userSchema.parse(payload)
    return await prisma.user.create({
      data: validPayload,
    })
  } catch (error) {
    throw Error(getErrorMessage(error))
  }
}

export const prismaPutUser = async (where, payload) => {
  try {
    const validPayload = userSchema.parse(payload)
    const validWhere = userSchema.parse(where)
    return await prisma.user.update({
      data: validPayload,
      where: validWhere,
    })
  } catch (error) {
    throw Error(getErrorMessage(error))
  }
}

export const prismaDeleteUser = async (where) => {
  try {
    const validWhere = userSchema.parse(where)
    return await prisma.user.delete({
      where: validWhere,
    })
  } catch (error) {
    throw Error(getErrorMessage(error))
  }
}
