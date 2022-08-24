import {
  Mjml,
  MjmlHead,
  MjmlPreview,
  MjmlTitle,
  MjmlBody,
  MjmlSection,
  MjmlColumn,
  MjmlButton,
  MjmlImage,
  MjmlText,
  render,
  MjmlDivider,
  MjmlSpacer,
  MjmlStyle,
} from 'mjml-react'
import { minify } from 'html-minifier'

import styles from '~/styles/lowlight.css'
import { readFileSync } from 'fs'
import pretty from 'pretty'
import { toHtml } from 'hast-util-to-html'
import { lowlight } from 'lowlight'

export default function getMjMl(json) {
  const lowlightCss = readFileSync(
    __dirname + styles.replace('/build', ''),
    'utf-8'
  )

  const { html, errors } = render(
    <Mjml>
      <MjmlHead>
        <MjmlTitle>Last Minute Offer</MjmlTitle>
        <MjmlPreview>Last Minute Offer...</MjmlPreview>
        <MjmlStyle>{lowlightCss}</MjmlStyle>
      </MjmlHead>
      <MjmlBody width={600}>
        <MjmlSection fullWidth>
          <MjmlColumn>
            {json
              ? json.map((data, idx) => (
                  <DynamicMjmlComponent
                    key={idx}
                    id={data.id}
                    details={data.details}
                    type={data.type}
                  />
                ))
              : null}
          </MjmlColumn>
        </MjmlSection>
      </MjmlBody>
    </Mjml>,
    {
      validationLevel: 'strict',
    }
  )

  const minified = html
    ? minify(
        pretty(html, {
          ocd: true,
        }),
        {
          minifyCSS: true,
        }
      )
    : ''

  return {
    html: minified,
    errors,
  }
}

const BlockType = {
  Text: 'TEXT',
  H1: 'H1',
  H2: 'H2',
  H3: 'H3',
  Divider: 'DIVIDER',
  Quote: 'QUOTE',
  Image: 'IMAGE',
  Code: 'CODE',
}

const TextBlock = ({ id, attributes, content }) => {
  return (
    <MjmlText cssClass={`data-${id}`}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </MjmlText>
  )
}

const CodeBlock = ({ id, attributes, content }) => {
  const code =
    '<pre><code>' + toHtml(lowlight.highlightAuto(content)) + '</code></pre>'
  return (
    <MjmlText cssClass={`data-${id} ProseMirror`}>
      <div dangerouslySetInnerHTML={{ __html: code }} />
    </MjmlText>
  )
}

const HeadingBlock = ({ id, type, attributes, content }) => {
  const styles = {
    H1: {
      fontSize: '24px',
      fontWeight: 'bold',
    },
    H2: {
      fontSize: '20px',
      fontWeight: 'bold',
    },
    H3: {
      fontSize: '18px',
      fontWeight: 'bold',
    },
  }

  return (
    <MjmlText cssClass={`data-${id}`} {...styles[type]}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </MjmlText>
  )
}

const DividerBlock = ({ id, attributes, content }) => {
  return <MjmlDivider cssClass={`data-${id}`} />
}

const SpacerBlock = () => {
  return <MjmlSpacer />
}

const components = {
  [BlockType.Text]: TextBlock,
  [BlockType.H1]: HeadingBlock,
  [BlockType.H2]: HeadingBlock,
  [BlockType.H3]: HeadingBlock,
  [BlockType.Divider]: DividerBlock,
  [BlockType.Code]: CodeBlock,
  //
  [BlockType.Quote]: SpacerBlock,
  [BlockType.Image]: SpacerBlock,
}

const DynamicMjmlComponent = ({ id, type, details }) => {
  const Component = components[type]
  return (
    <Component
      id={id}
      type={type}
      attributes={details.attributes}
      content={details.value}
    />
  )
}
