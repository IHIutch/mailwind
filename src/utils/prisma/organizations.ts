import { getErrorMessage } from '../functions'
import { prisma } from '@/server/prisma'
import { organizationSchema } from '../zod/schemas'

export const prismaGetOrganizations = async (where) => {
  try {
    const validWhere = organizationSchema.parse(where)
    return await prisma.organization.findMany({
      where: validWhere,
      include: {
        memberships: true,
      },
    })
  } catch (error) {
    throw Error(getErrorMessage(error))
  }
}

export const prismaGetOrganization = async (where) => {
  try {
    const validWhere = organizationSchema.parse(where)
    return await prisma.organization.findUnique({
      where: validWhere,
      include: {
        memberships: true,
      },
    })
  } catch (error) {
    throw Error(getErrorMessage(error))
  }
}

export const prismaPostOrganization = async (payload) => {
  try {
    const validPayload = organizationSchema.parse(payload)
    return await prisma.organization.create({
      data: validPayload,
    })
  } catch (error) {
    throw Error(getErrorMessage(error))
  }
}

export const prismaPutOrganization = async (where, payload) => {
  try {
    const validPayload = organizationSchema.parse(payload)
    const validWhere = organizationSchema.parse(where)
    return await prisma.organization.update({
      data: validPayload,
      where: validWhere,
    })
  } catch (error) {
    throw Error(getErrorMessage(error))
  }
}

export const prismaDeleteOrganization = async (where) => {
  try {
    const validWhere = organizationSchema.parse(where)
    return await prisma.organization.delete({
      where: validWhere,
    })
  } catch (error) {
    throw Error(getErrorMessage(error))
  }
}
