import { readFileSync } from 'fs'
import { minify } from 'html-minifier'
import {
  Mjml,
  MjmlBody,
  MjmlButton,
  MjmlColumn,
  MjmlDivider,
  MjmlHead,
  MjmlImage,
  MjmlPreview,
  MjmlSection,
  MjmlSpacer,
  MjmlStyle,
  MjmlText,
  MjmlTitle,
  render,
} from 'mjml-react'
import path from 'path'
import pretty from 'pretty'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/nightOwl'
import { type z } from 'zod'

import { defaultAttributes } from '../defaults'
import { getErrorMessage } from '../functions'
import {
  type ImageBlockSchema,
  type HeadingBlockSchema,
  type TextBlockSchema,
  type CodeBlockSchema,
  type DividerBlockSchema,
} from '../zod/schemas'

export default function getMjMl(json: any) {
  const stylePath = path.join(process.cwd(), 'public/styles/preflight.css')

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
    throw Error(getErrorMessage(errors[0]))
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

interface MjmlTextBlockProps extends z.infer<typeof TextBlockSchema> {
  id: number
}
const TextBlock = ({ id, attributes, value }: MjmlTextBlockProps) => {
  return (
    <MjmlText
      cssClass={`data-${id}`}
      paddingTop={
        attributes?.paddingTop || defaultAttributes['TEXT'].paddingTop
      }
      paddingRight={
        attributes?.paddingRight || defaultAttributes['TEXT'].paddingRight
      }
      paddingBottom={
        attributes?.paddingBottom || defaultAttributes['TEXT'].paddingBottom
      }
      paddingLeft={
        attributes?.paddingLeft || defaultAttributes['TEXT'].paddingLeft
      }
      fontSize={attributes?.fontSize || defaultAttributes['TEXT'].fontSize}
      fontFamily={attributes?.fontFamily || defaultAttributes.GLOBAL.fontFamily}
      lineHeight={
        attributes?.lineHeight || defaultAttributes['TEXT'].lineHeight
      }
      containerBackgroundColor={
        attributes?.backgroundColor || defaultAttributes.GLOBAL.backgroundColor
      }
    >
      <div dangerouslySetInnerHTML={{ __html: value }} />
    </MjmlText>
  )
}

interface MjmlCodeBlockProps extends z.infer<typeof CodeBlockSchema> {
  id: number
}
const CodeBlock = ({ id, attributes, value }: MjmlCodeBlockProps) => {
  return (
    <MjmlText
      cssClass={`data-${id} font-mono`}
      paddingTop={
        attributes?.paddingTop || defaultAttributes['CODE'].paddingTop
      }
      paddingRight={
        attributes?.paddingRight || defaultAttributes['CODE'].paddingRight
      }
      paddingBottom={
        attributes?.paddingBottom || defaultAttributes['CODE'].paddingBottom
      }
      paddingLeft={
        attributes?.paddingLeft || defaultAttributes['CODE'].paddingLeft
      }
      fontSize={attributes?.fontSize || defaultAttributes['CODE'].fontSize}
      fontFamily={attributes?.fontFamily || defaultAttributes.GLOBAL.fontFamily}
      lineHeight={
        attributes?.lineHeight || defaultAttributes['CODE'].lineHeight
      }
    >
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

interface MjmlHeadingBlockProps extends z.infer<typeof HeadingBlockSchema> {
  id: number
}
const HeadingBlock = ({
  id,
  type,
  attributes,
  value,
}: MjmlHeadingBlockProps) => {
  return (
    <MjmlText
      cssClass={`data-${id}`}
      paddingTop={attributes?.paddingTop || defaultAttributes[type].paddingTop}
      paddingRight={
        attributes?.paddingRight || defaultAttributes[type].paddingRight
      }
      paddingBottom={
        attributes?.paddingBottom || defaultAttributes[type].paddingBottom
      }
      paddingLeft={
        attributes?.paddingLeft || defaultAttributes[type].paddingLeft
      }
      fontSize={attributes?.fontSize || defaultAttributes[type].fontSize}
      fontFamily={attributes?.fontFamily || defaultAttributes.GLOBAL.fontFamily}
      lineHeight={attributes?.lineHeight || defaultAttributes[type].lineHeight}
      fontWeight={Number(
        attributes?.fontWeight || defaultAttributes[type].fontWeight
      )}
      containerBackgroundColor={
        attributes?.backgroundColor || defaultAttributes.GLOBAL.backgroundColor
      }
    >
      <div dangerouslySetInnerHTML={{ __html: value }} />
    </MjmlText>
  )
}

interface MjmlDividerBlockProps extends z.infer<typeof DividerBlockSchema> {
  id: number
}
const DividerBlock = ({ id, type, attributes }: MjmlDividerBlockProps) => {
  return (
    <MjmlDivider
      cssClass={`data-${id}`}
      paddingTop={
        attributes?.paddingTop || defaultAttributes['DIVIDER'].paddingTop
      }
      paddingRight={
        attributes?.paddingRight || defaultAttributes['DIVIDER'].paddingRight
      }
      paddingBottom={
        attributes?.paddingBottom || defaultAttributes['DIVIDER'].paddingBottom
      }
      paddingLeft={
        attributes?.paddingLeft || defaultAttributes['DIVIDER'].paddingLeft
      }
      borderWidth={
        attributes?.borderTopWidth ||
        defaultAttributes['DIVIDER'].borderTopWidth
      }
      borderColor={
        attributes?.borderTopColor ||
        defaultAttributes['DIVIDER'].borderTopColor
      }
      containerBackgroundColor={
        attributes?.backgroundColor || defaultAttributes.GLOBAL.backgroundColor
      }
    />
  )
}

// const SpacerBlock = () => {
//   return <MjmlSpacer />
// }

// const ButtonBlock = () => {
//   return <MjmlButton />
// }

interface MjmlImageBlockProps extends z.infer<typeof ImageBlockSchema> {
  id: number
}
const ImageBlock = ({ id, attributes }: MjmlImageBlockProps) => {
  return (
    <MjmlImage
      cssClass={`data-${id}`}
      paddingTop={
        attributes?.paddingTop || defaultAttributes['IMAGE'].paddingTop
      }
      paddingRight={
        attributes?.paddingRight || defaultAttributes['IMAGE'].paddingRight
      }
      paddingBottom={
        attributes?.paddingBottom || defaultAttributes['IMAGE'].paddingBottom
      }
      paddingLeft={
        attributes?.paddingLeft || defaultAttributes['IMAGE'].paddingLeft
      }
      src={attributes.src || defaultAttributes['IMAGE'].src}
      alt={attributes.alt || defaultAttributes['IMAGE'].alt}
      containerBackgroundColor={
        attributes?.backgroundColor || defaultAttributes.GLOBAL.backgroundColor
      }
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
  // [BlockType.Quote]: SpacerBlock,
}

// export const MjmlDynamicComponentProps = z.discriminatedUnion('type', [
//   TextBlockSchema.extend({ id: z.number() }),
//   CodeBlockSchema.extend({ id: z.number() }),
//   HeadingBlockSchema.extend({ id: z.number() }),
//   DividerBlockSchema.extend({ id: z.number() }),
//   ImageBlockSchema.extend({ id: z.number() }),
// ])

// type MjmlDynamicComponentProps = z.infer<typeof MjmlDynamicComponentProps>
const DynamicMjmlComponent = ({ id, type, attributes, value = '' }) => {
  const Component = components[type] as React.ComponentType
  return <Component id={id} type={type} attributes={attributes} value={value} />
}
