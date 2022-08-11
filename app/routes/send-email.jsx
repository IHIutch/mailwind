import getHtml from '~/models/getHtml.server'
import nodemailer from 'nodemailer'

export async function action({ request }) {
  const formData = await request.formData()
  const json = formData.get('json')
  const email = formData.get('email')

  console.log({ json, email })

  const transporter = nodemailer.createTransport({
    pool: true,
    host: 'smtp.example.com',
    port: 465,
    secure: true, // use TLS
    auth: {
      user: 'username',
      pass: 'password',
    },
  })

  transporter.sendMail(
    {
      from: 'jbhutch01@gmail.com',
      to: email,
      subject: 'Hello ✔',
      html: getHtml(JSON.parse(json)),
    },
    (error, info) => {
      if (error) {
        console.log(error)
      } else {
        console.log('Email sent: ' + info.response)
      }
    }
  )

  return 'test'
}
