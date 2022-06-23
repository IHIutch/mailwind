import mjml2html from "mjml";

export default function getHtml(json) {
  try {
    const { html } = mjml2html(
      json || {
        tagName: "mjml",
        attributes: {},
        children: [
          {
            tagName: "mj-body",
            attributes: {},
            children: [],
          },
        ],
      },
      { validationLevel: "soft" }
    );
    return html;
  } catch (error) {
    return { error: error.message };
  }
}
