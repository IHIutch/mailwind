import Prisma1, * as Prisma2 from '@prisma/client'

let Prisma = Prisma1 ?? Prisma2
let prisma

if (process.env.NODE_ENV === 'production') {
  prisma = new Prisma.PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new Prisma.PrismaClient()
  }
  prisma = global.prisma
}

export default prisma
