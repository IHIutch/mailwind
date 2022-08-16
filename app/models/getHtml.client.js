import mjml2html from 'mjml-browser'

export default function getHtml(json) {
  try {
    const { html } = mjml2html(
      json || {
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
            children: [],
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
