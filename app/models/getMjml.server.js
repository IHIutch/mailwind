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

export default function getMjMl(json) {
  // const stylePath =
  //   process.env.NODE_ENV === 'production'
  //     ? __dirname + '/../public' + styles
  //     : './public' + styles

  // const codeCss = readFileSync(stylePath, 'utf-8')

  const { html, errors } = render(
    <Mjml>
      <MjmlHead>
        <MjmlTitle>Last Minute Offer</MjmlTitle>
        <MjmlPreview>Last Minute Offer...</MjmlPreview>
        {/* <MjmlStyle inline>{codeCss}</MjmlStyle> */}
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

const TextBlock = ({ id, attributes, content }) => {
  return (
    <MjmlText
      cssClass={`data-${id}`}
      // fontFamily="Inter, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif',"
    >
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </MjmlText>
  )
}

const CodeBlock = ({ id, attributes, content }) => {
  return (
    <MjmlText cssClass={`data-${id}`}>
      <pre
        style={{
          padding: '8px',
          ...theme.plain,
        }}
      >
        <Highlight
          {...defaultProps}
          theme={theme}
          code={content}
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
