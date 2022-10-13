import prisma from '~/utils/prisma/index.server'
import { userSchema } from '../zod/schemas'

export const prismaGetUsers = async (where) => {
  try {
    const validWhere = userSchema.parse(where)
    return await prisma.User.findMany({
      where: validWhere,
      include: {
        memberships: true,
      },
    })
  } catch (error) {
    throw Error(error.message)
  }
}

export const prismaGetUser = async (where) => {
  try {
    const validWhere = userSchema.parse(where)
    return await prisma.User.findUnique({
      where: validWhere,
      include: {
        memberships: true,
      },
    })
  } catch (error) {
    throw Error(error.message)
  }
}

export const prismaPostUser = async (payload) => {
  try {
    const validPayload = userSchema.parse(payload)
    return await prisma.User.create({
      data: validPayload,
    })
  } catch (error) {
    throw Error(error.message)
  }
}

export const prismaPutUser = async (where, payload) => {
  try {
    const validPayload = userSchema.parse(payload)
    const validWhere = userSchema.parse(where)
    return await prisma.User.update({
      data: validPayload,
      where: validWhere,
    })
  } catch (error) {
    throw Error(error.message)
  }
}

export const prismaDeleteUser = async (where) => {
  try {
    const validWhere = userSchema.parse(where)
    return await prisma.User.delete({
      where: validWhere,
    })
  } catch (error) {
    throw Error(error.message)
  }
}
