import { prisma } from '@/server/prisma'
import { Prisma } from '@prisma/client'
import { getErrorMessage } from '../functions'

export const MembershipSelect = Prisma.validator<Prisma.MembershipSelect>()({
  id: true,
  userId: true,
  Organization: {
    select: {
      id: true,
      name: true,
      stripeCustomerId: true,
      stripeSubscriptionId: true,
    },
  },
})

export const prismaFindUniqueMembership = async ({
  where,
}: {
  where: Prisma.MembershipWhereUniqueInput
}) => {
  try {
    return await prisma.membership.findUnique({
      where,
      select: MembershipSelect,
    })
  } catch (error) {
    throw Error(getErrorMessage(error))
  }
}

export const prismaCreateMembership = async ({
  data,
}: {
  data: Prisma.MembershipUncheckedCreateInput
}) => {
  try {
    return await prisma.membership.create({
      data,
      select: MembershipSelect,
    })
  } catch (error) {
    throw Error(getErrorMessage(error))
  }
}

export const prismaUpdateMembership = async ({
  where,
  data,
}: {
  where: Prisma.MembershipWhereUniqueInput
  data: Prisma.MembershipUncheckedUpdateInput
}) => {
  try {
    return await prisma.membership.update({
      data,
      where,
      select: MembershipSelect,
    })
  } catch (error) {
    throw Error(getErrorMessage(error))
  }
}

export const prismaDeleteMembership = async ({
  where,
}: {
  where: Prisma.MembershipWhereUniqueInput
}) => {
  try {
    return await prisma.membership.delete({
      where,
    })
  } catch (error) {
    throw Error(getErrorMessage(error))
  }
}
