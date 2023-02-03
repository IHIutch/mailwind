import { prisma } from '@/server/prisma'
import { Prisma } from '@prisma/client'
import { getErrorMessage } from '../functions'

/**
 * Default selector for Block.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */
export const defaultUserSelect = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  stripeSubscriptionId: true,
  stripeCustomerId: true,
  role: true,
  memberships: {
    select: {
      id: true,
      organizationId: true,
    },
  },
})

export const prismaGetUniqueUser = async ({
  where,
}: {
  where: Prisma.UserWhereUniqueInput
}) => {
  try {
    return await prisma.user.findUnique({
      where,
      select: defaultUserSelect,
    })
  } catch (error) {
    throw Error(getErrorMessage(error))
  }
}

export const prismaCreateUser = async ({
  data,
}: {
  data: Prisma.UserCreateInput
}) => {
  try {
    return await prisma.user.create({
      data,
    })
  } catch (error) {
    throw Error(getErrorMessage(error))
  }
}

export const prismaUpdateUser = async ({
  where,
  data,
}: {
  where: Prisma.UserWhereUniqueInput
  data: Prisma.UserUpdateWithoutMembershipsInput
}) => {
  try {
    return await prisma.user.update({
      where,
      data,
    })
  } catch (error) {
    throw Error(getErrorMessage(error))
  }
}

export const prismaDeleteUser = async ({
  where,
}: {
  where: Prisma.UserWhereUniqueInput
}) => {
  try {
    return await prisma.user.delete({
      where,
    })
  } catch (error) {
    throw Error(getErrorMessage(error))
  }
}
