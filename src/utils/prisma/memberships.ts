import { prisma } from '@/server/prisma'
import { getErrorMessage } from '../functions'
import { membershipSchema } from '../zod/schemas'

export const prismaGetMembership = async (where) => {
  try {
    const validWhere = membershipSchema.parse(where)
    return await prisma.membership.findUnique({
      where: validWhere,
    })
  } catch (error) {
    throw Error(getErrorMessage(error))
  }
}

export const prismaPostMembership = async (payload) => {
  try {
    const validPayload = membershipSchema.parse(payload)
    return await prisma.membership.create({
      data: validPayload,
    })
  } catch (error) {
    throw Error(getErrorMessage(error))
  }
}

export const prismaPutMembership = async (where, payload) => {
  try {
    const validPayload = membershipSchema.parse(payload)
    const validWhere = membershipSchema.parse(where)
    return await prisma.membership.update({
      data: validPayload,
      where: validWhere,
    })
  } catch (error) {
    throw Error(getErrorMessage(error))
  }
}

export const prismaDeleteMembership = async (where) => {
  try {
    const validWhere = membershipSchema.parse(where)
    return await prisma.membership.delete({
      where: validWhere,
    })
  } catch (error) {
    throw Error(getErrorMessage(error))
  }
}
