// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getErrorMessage } from '@/utils/functions'
import getMjMl from '@/utils/mjml'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  html?: string
  error?: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req

  switch (method) {
    case 'POST':
      try {
        const { json } = req.body
        const html = getMjMl(json)

        return res.status(200).json({ html })
      } catch (error) {
        return res.status(400).json({ error: getErrorMessage(error) })
      }
    default:
      res.setHeader('Allow', ['POST'])
      return res.status(400).end(`Method ${method} Not Allowed`)
  }
}
