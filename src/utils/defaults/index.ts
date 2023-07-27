import { match } from 'ts-pattern'

import { BlockType } from '@prisma/client'

type DefaultAttributeProp = BlockType | 'GLOBAL'

export const getDefaultAttributes = (type: DefaultAttributeProp) => {
  return (
    match(type)
      .with('GLOBAL', () => ({
        paddingTop: '8px',
        paddingRight: '0',
        paddingBottom: '8px',
        paddingLeft: '0',
        fontFamily:
          '-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',
        fontSize: '16px',
        lineHeight: '1.5',
        backgroundColor: '#ffffff',
        color: '#000000',
      }))
      .with(BlockType.H1, () => ({
        paddingTop: '0',
        paddingRight: '0',
        paddingBottom: '28px',
        paddingLeft: '0',
        fontSize: '36px',
        lineHeight: '40px',
        fontWeight: '800',
      }))
      .with(BlockType.H2, () => ({
        paddingTop: '26px',
        paddingRight: '0',
        paddingBottom: '20px',
        paddingLeft: '0',
        fontSize: '24px',
        lineHeight: '32px',
        fontWeight: '700',
      }))
      .with(BlockType.H3, () => ({
        paddingTop: '32px',
        paddingRight: '0',
        paddingBottom: '8px',
        paddingLeft: '0',
        fontSize: '20px',
        lineHeight: '28px',
        fontWeight: '600',
      }))
      .with(BlockType.TEXT, () => ({
        paddingTop: '12px',
        paddingRight: '0',
        paddingBottom: '12px',
        paddingLeft: '0',
        fontSize: '16px',
        lineHeight: '1.25',
        fontWeight: '400',
      }))
      // .with(BlockType.QUOTE, {
      //   paddingTop: '12px',
      //   paddingRight: '0',
      //   paddingBottom: '12px',
      //   paddingLeft: '0',
      //   fontSize: '16px',
      //   lineHeight: '18px',
      //   fontWeight: '400',
      // })
      .with(BlockType.CODE, () => ({
        paddingTop: '8px',
        paddingRight: '0',
        paddingBottom: '8px',
        paddingLeft: '0',
        fontSize: '16px',
        lineHeight: '18px',
        fontWeight: '400',
      }))
      .with(BlockType.DIVIDER, () => ({
        paddingTop: '10px',
        paddingRight: '24px',
        paddingBottom: '10px',
        paddingLeft: '24px',
        borderTopColor: '#000000',
        borderTopWidth: '2px',
      }))
      .with(BlockType.IMAGE, () => ({
        paddingTop: '8px',
        paddingRight: '0',
        paddingBottom: '8px',
        paddingLeft: '0',
        src: '',
        alt: '',
      }))
      .with(BlockType.BUTTON, () => ({
        paddingTop: '8px',
        paddingRight: '0',
        paddingBottom: '8px',
        paddingLeft: '0',
        innerPaddingTop: '12px',
        innerPaddingRight: '24px',
        innerPaddingBottom: '12px',
        innerPaddingLeft: '24px',
        fontSize: '16px',
        fontWeight: '700',
        lineHeight: '1.25',
        width: 'auto',
        // height: '40px',
        backgroundColor: '#414141',
        containerBackgroundColor: '#ffffff',
        borderRadius: '6px',
        color: '#ffffff',
        href: '',
      }))
      .exhaustive()
  )
}
