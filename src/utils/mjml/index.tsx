import * as React from 'react'
import { readFileSync } from 'fs'
import { minify } from 'html-minifier'
import path from 'path'
import pretty from 'pretty'
import { Highlight, themes } from 'prism-react-renderer'
import { P, match } from 'ts-pattern'
import {
  type MjmlButtonBlockProps,
  type MjmlCodeBlockProps,
  type MjmlDividerBlockProps,
  type MjmlHeadingBlockProps,
  type MjmlImageBlockProps,
  type MjmlTextBlockProps,
} from 'types/mjml.types'

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
  MjmlStyle,
  MjmlText,
  MjmlTitle,
} from '@faire/mjml-react'
import { render } from '@faire/mjml-react/utils/render'
import { BlockType } from '@prisma/client'
import { getDefaultAttributes } from '../defaults'
import { getErrorMessage } from '../functions'

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
                  <React.Fragment key={idx}>
                    {match(data.type)
                      .with(BlockType.TEXT, () => (
                        <TextBlock
                          id={data.id}
                          attributes={data.attributes}
                          value={data.value}
                        />
                      ))
                      .with(BlockType.BUTTON, () => (
                        <ButtonBlock
                          id={data.id}
                          attributes={data.attributes}
                          value={data.value}
                        />
                      ))
                      .with(
                        P.union(BlockType.H1, BlockType.H2, BlockType.H3),
                        (type) => (
                          <HeadingBlock
                            id={data.id}
                            type={type}
                            attributes={data.attributes}
                            value={data.value}
                          />
                        )
                      )
                      .with(BlockType.DIVIDER, () => (
                        <DividerBlock
                          id={data.id}
                          attributes={data.attributes}
                        />
                      ))
                      // .with(BlockType.QUOTE, ())
                      .with(BlockType.IMAGE, () => (
                        <ImageBlock id={data.id} attributes={data.attributes} />
                      ))
                      .with(BlockType.CODE, () => (
                        <CodeBlock
                          id={data.id}
                          attributes={data.attributes}
                          value={data.value}
                        />
                      ))
                      .exhaustive()}
                  </React.Fragment>
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

  if (errors && errors?.length > 0) {
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

const TextBlock = ({ id, attributes, value }: MjmlTextBlockProps) => {
  return (
    <MjmlText
      cssClass={`data-${id}`}
      paddingTop={
        attributes?.paddingTop ||
        getDefaultAttributes(BlockType.TEXT).paddingTop
      }
      paddingRight={
        attributes?.paddingRight ||
        getDefaultAttributes(BlockType.TEXT).paddingRight
      }
      paddingBottom={
        attributes?.paddingBottom ||
        getDefaultAttributes(BlockType.TEXT).paddingBottom
      }
      paddingLeft={
        attributes?.paddingLeft ||
        getDefaultAttributes(BlockType.TEXT).paddingLeft
      }
      fontSize={attributes?.fontSize || getDefaultAttributes('GLOBAL').fontSize}
      fontFamily={
        attributes?.fontFamily || getDefaultAttributes('GLOBAL').fontFamily
      }
      lineHeight={
        attributes?.lineHeight ||
        getDefaultAttributes(BlockType.TEXT).lineHeight
      }
      containerBackgroundColor={
        attributes?.backgroundColor ||
        getDefaultAttributes('GLOBAL').backgroundColor
      }
      dangerouslySetInnerHTML={{ __html: value }}
    />
  )
}

const ButtonBlock = ({ id, attributes, value }: MjmlButtonBlockProps) => {
  return (
    <MjmlButton
      cssClass={`data-${id}`}
      color={attributes?.color || getDefaultAttributes(BlockType.BUTTON).color}
      paddingTop={
        attributes?.paddingTop ||
        getDefaultAttributes(BlockType.BUTTON).paddingTop
      }
      paddingRight={
        attributes?.paddingRight ||
        getDefaultAttributes(BlockType.BUTTON).paddingRight
      }
      paddingBottom={
        attributes?.paddingBottom ||
        getDefaultAttributes(BlockType.BUTTON).paddingBottom
      }
      paddingLeft={
        attributes?.paddingLeft ||
        getDefaultAttributes(BlockType.BUTTON).paddingLeft
      }
      innerPadding={[
        attributes?.innerPaddingTop ||
          getDefaultAttributes(BlockType.BUTTON).innerPaddingTop,
        attributes?.innerPaddingRight ||
          getDefaultAttributes(BlockType.BUTTON).innerPaddingRight,
        attributes?.innerPaddingBottom ||
          getDefaultAttributes(BlockType.BUTTON).innerPaddingBottom,
        attributes?.innerPaddingLeft ||
          getDefaultAttributes(BlockType.BUTTON).innerPaddingLeft,
      ].join(' ')}
      fontSize={attributes?.fontSize || getDefaultAttributes('GLOBAL').fontSize}
      fontWeight={
        attributes?.fontWeight || getDefaultAttributes('GLOBAL').fontWeight
      }
      fontFamily={
        attributes?.fontFamily || getDefaultAttributes('GLOBAL').fontFamily
      }
      lineHeight={
        attributes?.lineHeight ||
        getDefaultAttributes(BlockType.BUTTON).lineHeight
      }
      backgroundColor={
        attributes?.backgroundColor ||
        getDefaultAttributes(BlockType.BUTTON).backgroundColor
      }
      containerBackgroundColor={
        attributes?.containerBackgroundColor ||
        getDefaultAttributes(BlockType.BUTTON).containerBackgroundColor
      }
      borderRadius={
        attributes?.borderRadius ||
        getDefaultAttributes(BlockType.BUTTON).borderRadius
      }
      dangerouslySetInnerHTML={{ __html: value }}
    />
  )
}

const CodeBlock = ({ id, attributes, value }: MjmlCodeBlockProps) => {
  return (
    <MjmlText
      cssClass={`data-${id} font-mono`}
      paddingTop={
        attributes?.paddingTop || getDefaultAttributes('CODE').paddingTop
      }
      paddingRight={
        attributes?.paddingRight || getDefaultAttributes('CODE').paddingRight
      }
      paddingBottom={
        attributes?.paddingBottom || getDefaultAttributes('CODE').paddingBottom
      }
      paddingLeft={
        attributes?.paddingLeft || getDefaultAttributes('CODE').paddingLeft
      }
      fontSize={attributes?.fontSize || getDefaultAttributes('CODE').fontSize}
      fontFamily={
        attributes?.fontFamily || getDefaultAttributes('GLOBAL').fontFamily
      }
      lineHeight={
        attributes?.lineHeight || getDefaultAttributes('CODE').lineHeight
      }
    >
      <pre
        style={{
          padding: '8px',
          ...themes[attributes.theme || 'dracula'].plain,
        }}
      >
        <Highlight
          theme={themes[attributes.theme || 'dracula']}
          code={value}
          language={attributes.language || 'jsx'}
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

const HeadingBlock = ({
  id,
  type,
  attributes,
  value,
}: MjmlHeadingBlockProps) => {
  return (
    <MjmlText
      cssClass={`data-${id}`}
      paddingTop={
        attributes?.paddingTop || getDefaultAttributes(type).paddingTop
      }
      paddingRight={
        attributes?.paddingRight || getDefaultAttributes(type).paddingRight
      }
      paddingBottom={
        attributes?.paddingBottom || getDefaultAttributes(type).paddingBottom
      }
      paddingLeft={
        attributes?.paddingLeft || getDefaultAttributes(type).paddingLeft
      }
      fontSize={attributes?.fontSize || getDefaultAttributes(type).fontSize}
      fontFamily={
        attributes?.fontFamily || getDefaultAttributes('GLOBAL').fontFamily
      }
      lineHeight={
        attributes?.lineHeight || getDefaultAttributes(type).lineHeight
      }
      fontWeight={Number(
        attributes?.fontWeight || getDefaultAttributes(type).fontWeight
      )}
      containerBackgroundColor={
        attributes?.backgroundColor ||
        getDefaultAttributes('GLOBAL').backgroundColor
      }
      dangerouslySetInnerHTML={{ __html: value }}
    />
  )
}

const DividerBlock = ({ id, attributes }: MjmlDividerBlockProps) => {
  return (
    <MjmlDivider
      cssClass={`data-${id}`}
      paddingTop={
        attributes?.paddingTop || getDefaultAttributes('DIVIDER').paddingTop
      }
      paddingRight={
        attributes?.paddingRight || getDefaultAttributes('DIVIDER').paddingRight
      }
      paddingBottom={
        attributes?.paddingBottom ||
        getDefaultAttributes('DIVIDER').paddingBottom
      }
      paddingLeft={
        attributes?.paddingLeft || getDefaultAttributes('DIVIDER').paddingLeft
      }
      borderWidth={
        attributes?.borderTopWidth ||
        getDefaultAttributes('DIVIDER').borderTopWidth
      }
      borderColor={
        attributes?.borderTopColor ||
        getDefaultAttributes('DIVIDER').borderTopColor
      }
      containerBackgroundColor={
        attributes?.backgroundColor ||
        getDefaultAttributes('GLOBAL').backgroundColor
      }
    />
  )
}

const ImageBlock = ({ id, attributes }: MjmlImageBlockProps) => {
  return (
    <MjmlImage
      cssClass={`data-${id}`}
      paddingTop={
        attributes?.paddingTop || getDefaultAttributes('IMAGE').paddingTop
      }
      paddingRight={
        attributes?.paddingRight || getDefaultAttributes('IMAGE').paddingRight
      }
      paddingBottom={
        attributes?.paddingBottom || getDefaultAttributes('IMAGE').paddingBottom
      }
      paddingLeft={
        attributes?.paddingLeft || getDefaultAttributes('IMAGE').paddingLeft
      }
      src={attributes.src || getDefaultAttributes('IMAGE').src}
      alt={attributes.alt || getDefaultAttributes('IMAGE').alt}
      containerBackgroundColor={
        attributes?.backgroundColor ||
        getDefaultAttributes('GLOBAL').backgroundColor
      }
    />
  )
}
