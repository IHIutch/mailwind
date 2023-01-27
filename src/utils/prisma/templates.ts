import { templateSchema } from '../zod/schemas'
import prisma from '@/server/prisma'

export const prismaGetTemplates = async (where) => {
  try {
    const validWhere = templateSchema.parse(where)
    return await prisma.Template.findMany({
      where: validWhere,
    })
  } catch (error) {
    throw Error(error.message)
  }
}

export const prismaGetTemplate = async (where) => {
  try {
    const validWhere = templateSchema.parse(where)
    return await prisma.Template.findUnique({
      where: validWhere,
    })
  } catch (error) {
    throw Error(error.message)
  }
}

export const prismaPostTemplate = async (payload) => {
  try {
    const validPayload = templateSchema.parse(payload)
    return await prisma.Template.create({
      data: validPayload,
    })
  } catch (error) {
    throw Error(error.message)
  }
}

export const prismaPutTemplate = async (where, payload) => {
  try {
    const validPayload = templateSchema.parse(payload)
    const validWhere = templateSchema.parse(where)

    return await prisma.Template.update({
      data: validPayload,
      where: validWhere,
    })
  } catch (error) {
    throw Error(error.message)
  }
}

export const prismaDeleteTemplate = async (where) => {
  try {
    const validWhere = templateSchema.parse(where)
    return await prisma.Template.delete({
      where: validWhere,
    })
  } catch (error) {
    throw Error(error.message)
  }
}
