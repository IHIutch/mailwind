import getHtml from '~/models/getHtml.server'
import https from 'https'
import fs from 'fs'

export async function action({ request }) {
  const formData = await request.formData()
  const json = formData.get('json')

  const html = getHtml(JSON.parse(json))

  // fs.writeFile(`${__dirname}/email.html`, html, (err) => {
  //   if (err) throw err
  //   console.log('The file has been saved!')
  // })

  // response.write()

  // const fileBuffer = fs.createReadStream(`${__dirname}/email.html`)

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': 'attachment; filename="email.html"',
    },
  })

  // // convert node stream to web stream
  // function nodeStreamToReadableStream(fileBuffer) {
  //   return new ReadableStream({
  //     start(controller) {
  //       fileBuffer.on('data', (chunk) => {
  //         controller.enqueue(chunk)
  //       })
  //       fileBuffer.on('end', () => {
  //         controller.close()
  //       })
  //     },
  //   })
  // }
}

// export function headers({ actionHeaders, loaderHeaders, parentHeaders }) {
//   return {
//     'Content-Type': 'application/octet-stream',
//     'Content-Disposition': 'attachment; filename="email.html"',
//   }
// }
