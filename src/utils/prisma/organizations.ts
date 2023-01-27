import { organizationSchema } from '../zod/schemas.ts'
import prisma from '@/server/prisma'

export const prismaGetOrganizations = async (where) => {
  try {
    const validWhere = organizationSchema.parse(where)
    return await prisma.Organization.findMany({
      where: validWhere,
      include: {
        memberships: true,
      },
    })
  } catch (error) {
    throw Error(error.message)
  }
}

export const prismaGetOrganization = async (where) => {
  try {
    const validWhere = organizationSchema.parse(where)
    return await prisma.Organization.findUnique({
      where: validWhere,
      include: {
        memberships: true,
      },
    })
  } catch (error) {
    throw Error(error.message)
  }
}

export const prismaPostOrganization = async (payload) => {
  try {
    const validPayload = organizationSchema.parse(payload)
    return await prisma.Organization.create({
      data: validPayload,
    })
  } catch (error) {
    throw Error(error.message)
  }
}

export const prismaPutOrganization = async (where, payload) => {
  try {
    const validPayload = organizationSchema.parse(payload)
    const validWhere = organizationSchema.parse(where)
    return await prisma.Organization.update({
      data: validPayload,
      where: validWhere,
    })
  } catch (error) {
    throw Error(error.message)
  }
}

export const prismaDeleteOrganization = async (where) => {
  try {
    const validWhere = organizationSchema.parse(where)
    return await prisma.Organization.delete({
      where: validWhere,
    })
  } catch (error) {
    throw Error(error.message)
  }
}
