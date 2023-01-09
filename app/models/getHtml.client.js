import mjml2html from 'mjml-browser'

const textBlock = {
  tagName: 'mj-text',
  attributes: {},
  content: '',
  'css-class': `data-`,
}

const blocks = {
  TEXT: textBlock,
}

export default function getHtml(json) {
  try {
    const mappedAttrs = json.map((j) => {
      return blocks[j.type]
    })

    const { html } = mjml2html(
      json ?? {
        tagName: 'mjml',
        attributes: {},
        children: [
          {
            tagName: 'mj-head',
            children: [],
          },
          {
            tagName: 'mj-body',
            attributes: {},
            children: mappedAttrs,
          },
        ],
      },
      { validationLevel: 'soft' }
    )
    return html
  } catch (error) {
    return { error: error.message }
  }
}
