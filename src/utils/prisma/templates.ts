import { prisma } from '@/server/prisma'
import { type Prisma } from '@prisma/client'
import { getErrorMessage } from '../functions'

export const prismaFindTemplates = async ({
  where,
}: {
  where: Prisma.TemplateWhereInput
}) => {
  try {
    return await prisma.template.findMany({
      where,
    })
  } catch (error) {
    throw Error(getErrorMessage(error))
  }
}

export const prismaFindUniqueTemplate = async ({
  where,
}: {
  where: Prisma.TemplateWhereUniqueInput
}) => {
  try {
    return await prisma.template.findUnique({
      where,
    })
  } catch (error) {
    throw Error(getErrorMessage(error))
  }
}

export const prismaCreateTemplate = async ({
  data,
}: {
  data: Prisma.TemplateUncheckedCreateInput
}) => {
  try {
    return await prisma.template.create({
      data,
    })
  } catch (error) {
    throw Error(getErrorMessage(error))
  }
}

export const prismaUpdateTemplate = async ({
  where,
  data,
}: {
  where: Prisma.TemplateWhereUniqueInput
  data: Prisma.TemplateUncheckedUpdateInput
}) => {
  try {
    return await prisma.template.update({
      where,
      data,
    })
  } catch (error) {
    throw Error(getErrorMessage(error))
  }
}

export const prismaDeleteTemplate = async ({
  where,
}: {
  where: Prisma.TemplateWhereUniqueInput
}) => {
  try {
    return await prisma.template.delete({
      where,
    })
  } catch (error) {
    throw Error(getErrorMessage(error))
  }
}
