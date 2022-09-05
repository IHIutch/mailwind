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
import pretty from 'pretty'
import { minify } from 'html-minifier'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/nightOwl'
import { defaultAttributes } from '~/utils/types'
import styles from '~/styles/preflight.css'
import { readFileSync } from 'fs'

export default function getMjMl(json) {
  const stylePath =
    process.env.NODE_ENV === 'production'
      ? __dirname + '/../public' + styles
      : './public' + styles

  const codeCss = readFileSync(stylePath, 'utf-8')

  const { html, errors } = render(
    <Mjml>
      <MjmlHead>
        <MjmlTitle>Last Minute Offer</MjmlTitle>
        <MjmlPreview>Last Minute Offer...</MjmlPreview>
        <MjmlStyle inline>{codeCss}</MjmlStyle>
      </MjmlHead>
      <MjmlBody width={600}>
        <MjmlSection fullWidth>
          <MjmlColumn>
            {json
              ? json.map((data, idx) => (
                  <DynamicMjmlComponent
                    key={idx}
                    id={data.id}
                    attributes={data.attributes}
                    value={data.value}
                    type={data.type}
                  />
                ))
              : null}
          </MjmlColumn>
        </MjmlSection>
      </MjmlBody>
    </Mjml>,
    {
      fonts: {
        Ubuntu: 'https://fonts.bunny.net/css?family=ubuntu:300,400,500,700',
      },
      validationLevel: 'strict',
    }
  )

  if (errors.length) {
    throw new Error(errors[0])
  }

  return minify(
    pretty(html, {
      ocd: true,
    }),
    {
      minifyCSS: true,
    }
  )
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

const TextBlock = ({ id, attributes, value }) => {
  const padding = attributes?.padding || defaultAttributes.global.padding
  return (
    <MjmlText
      padding={padding.join(' ')}
      cssClass={`data-${id}`}
      fontSize={defaultAttributes.global.fontSize}
      fontFamily={defaultAttributes.global.fontFamily}
      lineHeight={defaultAttributes.global.lineHeight}
    >
      <div dangerouslySetInnerHTML={{ __html: value }} />
    </MjmlText>
  )
}

const CodeBlock = ({ id, attributes, value }) => {
  const padding = attributes?.padding || defaultAttributes.global.padding
  return (
    <MjmlText padding={padding.join(' ')} cssClass={`data-${id}`}>
      <pre
        style={{
          padding: '8px',
          ...theme.plain,
        }}
      >
        <Highlight
          {...defaultProps}
          theme={theme}
          code={value}
          language={'jsx'}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </>
          )}
        </Highlight>
      </pre>
    </MjmlText>
  )
}

const HeadingBlock = ({ id, type, attributes, value }) => {
  const padding = attributes?.padding || defaultAttributes[type].padding
  return (
    <MjmlText
      padding={padding.join(' ')}
      cssClass={`data-${id}`}
      fontFamily={defaultAttributes.global.fontFamily}
      fontSize={defaultAttributes[type].fontSize}
      lineHeight={defaultAttributes[type].lineHeight}
      fontWeight={defaultAttributes[type].fontWeight}
    >
      <div dangerouslySetInnerHTML={{ __html: value }} />
    </MjmlText>
  )
}

const DividerBlock = ({ id, attributes, value }) => {
  const padding = attributes?.padding || defaultAttributes.global.padding
  return (
    <MjmlDivider
      padding={padding.join(' ')}
      borderWidth="1px"
      borderColor="#E2E8F0"
      cssClass={`data-${id}`}
    />
  )
}

const SpacerBlock = () => {
  return <MjmlSpacer />
}

const ImageBlock = ({ id, attributes, value }) => {
  const padding = attributes?.padding || defaultAttributes.global.padding

  return (
    <MjmlImage
      padding={padding.join(' ')}
      cssClass={`data-${id}`}
      src={value}
    />
  )
}

const components = {
  [BlockType.Text]: TextBlock,
  [BlockType.H1]: HeadingBlock,
  [BlockType.H2]: HeadingBlock,
  [BlockType.H3]: HeadingBlock,
  [BlockType.Divider]: DividerBlock,
  [BlockType.Code]: CodeBlock,
  [BlockType.Image]: ImageBlock,
  //
  [BlockType.Quote]: SpacerBlock,
}

const DynamicMjmlComponent = ({ id, type, attributes, value }) => {
  const Component = components[type]
  return <Component id={id} type={type} attributes={attributes} value={value} />
}
