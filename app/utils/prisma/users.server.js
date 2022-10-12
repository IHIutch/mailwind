import prisma from '~/utils/prisma/index.server'
import { userSchema } from '../zod/schemas'

export const prismaGetUser = async (where) => {
  console.log({ where })
  try {
    const validWhere = userSchema.parse(where)
    return await prisma.User.findUnique({
      where: validWhere,
    })
  } catch (error) {
    throw new Error(error.message)
  }
}

export const prismaPostUser = async (payload) => {
  try {
    const validPayload = userSchema.parse(payload)
    console.log({ validPayload })
    return await prisma.User.create({
      data: validPayload,
    })
  } catch (error) {
    throw new Error(error.message)
  }
}
