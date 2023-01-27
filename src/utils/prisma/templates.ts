import { getErrorMessage } from '../functions'
import { templateSchema } from '../zod/schemas'
import { prisma } from '@/server/prisma'
import { z } from 'zod'

type whereType = z.input<typeof templateSchema>
type payloadType = z.input<typeof templateSchema>

export const prismaGetTemplates = async (where: whereType) => {
  try {
    const validWhere = templateSchema.parse(where)
    return await prisma.template.findMany({
      where: validWhere,
    })
  } catch (error) {
    throw Error(getErrorMessage(error))
  }
}

export const prismaGetTemplate = async (where: whereType) => {
  try {
    const validWhere = templateSchema.parse(where)
    return await prisma.template.findUnique({
      where: validWhere,
    })
  } catch (error) {
    throw Error(getErrorMessage(error))
  }
}

export const prismaPostTemplate = async (payload: payloadType) => {
  try {
    const validPayload = templateSchema.parse(payload)
    return await prisma.template.create({
      data: validPayload,
    })
  } catch (error) {
    throw Error(getErrorMessage(error))
  }
}

export const prismaPutTemplate = async (
  where: whereType,
  payload: payloadType
) => {
  try {
    const validPayload = templateSchema.parse(payload)
    const validWhere = templateSchema.parse(where)

    return await prisma.template.update({
      data: validPayload,
      where: validWhere,
    })
  } catch (error) {
    throw Error(getErrorMessage(error))
  }
}

export const prismaDeleteTemplate = async (where: whereType) => {
  try {
    const validWhere = templateSchema.parse(where)
    return await prisma.template.delete({
      where: validWhere,
    })
  } catch (error) {
    throw Error(getErrorMessage(error))
  }
}
