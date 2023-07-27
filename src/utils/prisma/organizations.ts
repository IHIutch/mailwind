import { prisma } from '@/server/prisma'
import { Prisma } from '@prisma/client'
import { getErrorMessage } from '../functions'

export const OrganizationInclude =
  Prisma.validator<Prisma.OrganizationInclude>()({
    memberships: {
      select: {
        id: true,
        organizationId: true,
      },
    },
  })

export const prismaFindOrganizations = async ({
  where,
}: {
  where: Prisma.OrganizationWhereInput
}) => {
  try {
    return await prisma.organization.findMany({
      where,
      include: OrganizationInclude,
    })
  } catch (error) {
    throw Error(getErrorMessage(error))
  }
}

export const prismaFindUniqueOrganization = async ({
  where,
}: {
  where: Prisma.OrganizationWhereUniqueInput
}) => {
  try {
    return await prisma.organization.findUnique({
      where,
      include: OrganizationInclude,
    })
  } catch (error) {
    throw Error(getErrorMessage(error))
  }
}

export const prismaCreateOrganization = async ({
  data,
}: {
  data: Prisma.OrganizationUncheckedCreateInput
}) => {
  try {
    return await prisma.organization.create({
      data,
      include: OrganizationInclude,
    })
  } catch (error) {
    throw Error(getErrorMessage(error))
  }
}

export const prismaUpdateOrganization = async ({
  where,
  data,
}: {
  where: Prisma.OrganizationWhereUniqueInput
  data: Prisma.OrganizationUncheckedUpdateInput
}) => {
  try {
    return await prisma.organization.update({
      data,
      where,
      include: OrganizationInclude,
    })
  } catch (error) {
    throw Error(getErrorMessage(error))
  }
}

export const prismaDeleteOrganization = async ({
  where,
}: {
  where: Prisma.OrganizationWhereUniqueInput
}) => {
  try {
    return await prisma.organization.delete({
      where,
    })
  } catch (error) {
    throw Error(getErrorMessage(error))
  }
}
