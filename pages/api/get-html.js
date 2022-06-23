// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import mjml2html from "mjml";

export default function handler(req, res) {
  const { json } = req.body;

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
    res.status(200).json(html);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
