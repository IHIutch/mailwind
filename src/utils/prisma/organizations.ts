import { getErrorMessage } from '../functions'
import { prisma } from '@/server/prisma'
import { Prisma } from '@prisma/client'

export const OrganizationSelect = Prisma.validator<Prisma.OrganizationSelect>()(
  {
    id: true,
    name: true,
    memberships: {
      select: {
        id: true,
        organizationId: true,
      },
    },
  }
)

export const prismaFindOrganizations = async ({
  where,
}: {
  where: Prisma.OrganizationWhereInput
}) => {
  try {
    return await prisma.organization.findMany({
      where,
      select: OrganizationSelect,
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
      select: OrganizationSelect,
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
      select: OrganizationSelect,
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
      select: OrganizationSelect,
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
