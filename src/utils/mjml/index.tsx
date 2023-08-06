import * as React from 'react'
import { readFileSync } from 'fs'
import { minify } from 'html-minifier'
import path from 'path'
import pretty from 'pretty'
import { Highlight, themes } from 'prism-react-renderer'
import { P, match } from 'ts-pattern'
import {
  type DividerBlockProps,
  type ButtonBlockProps,
  type CodeBlockProps,
  type HeadingBlockProps,
  type TextBlockProps,
  type ImageBlockProps,
} from 'types/block.types'

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
import { defaultAttributes } from '../defaults'
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

const TextBlock = ({ id, attributes, value }: Omit<TextBlockProps, 'type'>) => {
  return (
    <MjmlText
      cssClass={`data-${id}`}
      paddingTop={attributes?.paddingTop || defaultAttributes.TEXT.paddingTop}
      paddingRight={
        attributes?.paddingRight || defaultAttributes.TEXT.paddingRight
      }
      paddingBottom={
        attributes?.paddingBottom || defaultAttributes.TEXT.paddingBottom
      }
      paddingLeft={
        attributes?.paddingLeft || defaultAttributes.TEXT.paddingLeft
      }
      fontSize={attributes?.fontSize || defaultAttributes.GLOBAL.fontSize}
      fontFamily={attributes?.fontFamily || defaultAttributes.GLOBAL.fontFamily}
      lineHeight={attributes?.lineHeight || defaultAttributes.TEXT.lineHeight}
      containerBackgroundColor={
        attributes?.containerBackgroundColor ||
        defaultAttributes.GLOBAL.containerBackgroundColor
      }
      dangerouslySetInnerHTML={{ __html: value }}
    />
  )
}

const ButtonBlock = ({
  id,
  attributes,
  value,
}: Omit<ButtonBlockProps, 'type'>) => {
  return (
    <MjmlButton
      cssClass={`data-${id}`}
      color={attributes?.color || defaultAttributes.BUTTON.color}
      paddingTop={attributes?.paddingTop || defaultAttributes.BUTTON.paddingTop}
      paddingRight={
        attributes?.paddingRight || defaultAttributes.BUTTON.paddingRight
      }
      paddingBottom={
        attributes?.paddingBottom || defaultAttributes.BUTTON.paddingBottom
      }
      paddingLeft={
        attributes?.paddingLeft || defaultAttributes.BUTTON.paddingLeft
      }
      innerPadding={[
        attributes?.innerPaddingTop || defaultAttributes.BUTTON.innerPaddingTop,
        attributes?.innerPaddingRight ||
          defaultAttributes.BUTTON.innerPaddingRight,
        attributes?.innerPaddingBottom ||
          defaultAttributes.BUTTON.innerPaddingBottom,
        attributes?.innerPaddingLeft ||
          defaultAttributes.BUTTON.innerPaddingLeft,
      ].join(' ')}
      fontSize={attributes?.fontSize || defaultAttributes.GLOBAL.fontSize}
      fontWeight={attributes?.fontWeight || defaultAttributes.GLOBAL.fontWeight}
      fontFamily={attributes?.fontFamily || defaultAttributes.GLOBAL.fontFamily}
      lineHeight={attributes?.lineHeight || defaultAttributes.BUTTON.lineHeight}
      backgroundColor={
        attributes?.backgroundColor || defaultAttributes.BUTTON.backgroundColor
      }
      containerBackgroundColor={
        attributes?.containerBackgroundColor ||
        defaultAttributes.BUTTON.containerBackgroundColor
      }
      borderRadius={
        attributes?.borderRadius || defaultAttributes.BUTTON.borderRadius
      }
      dangerouslySetInnerHTML={{ __html: value }}
    />
  )
}

const CodeBlock = ({ id, attributes, value }: Omit<CodeBlockProps, 'type'>) => {
  return (
    <MjmlText
      cssClass={`data-${id} font-mono`}
      // paddingTop={attributes?.paddingTop || defaultAttributes.CODE.paddingTop}
      // paddingRight={
      //   attributes?.paddingRight || defaultAttributes.CODE.paddingRight
      // }
      // paddingBottom={
      //   attributes?.paddingBottom || defaultAttributes.CODE.paddingBottom
      // }
      // paddingLeft={
      //   attributes?.paddingLeft || defaultAttributes.CODE.paddingLeft
      // }
      // fontSize={attributes?.fontSize || defaultAttributes.CODE.fontSize}
      // fontFamily={attributes?.fontFamily || defaultAttributes.GLOBAL.fontFamily}
      // lineHeight={attributes?.lineHeight || defaultAttributes.CODE.lineHeight}
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

const HeadingBlock = ({ id, type, attributes, value }: HeadingBlockProps) => {
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
      fontWeight={attributes?.fontWeight || defaultAttributes[type].fontWeight}
      containerBackgroundColor={
        attributes?.containerBackgroundColor ||
        defaultAttributes.GLOBAL.containerBackgroundColor
      }
      dangerouslySetInnerHTML={{ __html: value }}
    />
  )
}

const DividerBlock = ({ id, attributes }: Omit<DividerBlockProps, 'type'>) => {
  return (
    <MjmlDivider
      cssClass={`data-${id}`}
      paddingTop={
        attributes?.paddingTop || defaultAttributes.DIVIDER.paddingTop
      }
      paddingRight={
        attributes?.paddingRight || defaultAttributes.DIVIDER.paddingRight
      }
      paddingBottom={
        attributes?.paddingBottom || defaultAttributes.DIVIDER.paddingBottom
      }
      paddingLeft={
        attributes?.paddingLeft || defaultAttributes.DIVIDER.paddingLeft
      }
      borderWidth={
        attributes?.borderWidth || defaultAttributes.DIVIDER.borderWidth
      }
      borderColor={
        attributes?.borderColor || defaultAttributes.DIVIDER.borderColor
      }
      containerBackgroundColor={
        attributes?.containerBackgroundColor ||
        defaultAttributes.GLOBAL.containerBackgroundColor
      }
    />
  )
}

const ImageBlock = ({ id, attributes }: Omit<ImageBlockProps, 'type'>) => {
  return (
    <MjmlImage
      cssClass={`data-${id}`}
      paddingTop={attributes?.paddingTop || defaultAttributes.IMAGE.paddingTop}
      paddingRight={
        attributes?.paddingRight || defaultAttributes.IMAGE.paddingRight
      }
      paddingBottom={
        attributes?.paddingBottom || defaultAttributes.IMAGE.paddingBottom
      }
      paddingLeft={
        attributes?.paddingLeft || defaultAttributes.IMAGE.paddingLeft
      }
      src={attributes.src || defaultAttributes.IMAGE.src}
      alt={attributes.alt || defaultAttributes.IMAGE.alt}
      containerBackgroundColor={
        attributes?.containerBackgroundColor ||
        defaultAttributes.GLOBAL.containerBackgroundColor
      }
    />
  )
}
