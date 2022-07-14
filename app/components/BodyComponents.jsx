// const BodyComponents = {
//   Accordion: 'Accordion',
//   AccordionElement: 'AccordionElement',
//   AccordionTitle: 'AccordionTitle',
//   AccordionText: 'AccordionText',
//   Button: 'Button',
//   Column: 'Column',
//   Divider: 'Divider',
//   Group: 'Group',
//   Hero: 'Hero',
//   Image: 'Image',
//   Navbar: 'Navbar',
//   Raw: 'Raw',
//   Section: 'Section',
//   Social: 'Social',
//   Spacer: 'Spacer',
//   Table: 'Table',
//   Text: 'Text',
//   Wrapper: 'Wrapper',
// }

export const MjText = {
  title: 'Text',
  tagName: 'mj-text',
  description: 'This tag allows you to display text in your email.',
  isEndingTag: true,
  allowedChildren: [],
  attributes: {
    color: {
      unit: 'color',
      description: 'text color',
      defaultValue: '#000000',
    },
    'font-family': {
      unit: 'string',
      description: 'font',
      defaultValue: 'Ubuntu, Helvetica, Arial, sans-serif',
    },
    'font-size': {
      unit: 'px',
      description: 'text size',
      defaultValue: '13px',
    },
    'font-style': {
      unit: 'string',
      description: 'normal/italic/oblique',
      defaultValue: null,
    },
    'font-weight': {
      unit: 'number',
      description: 'text thickness',
      defaultValue: null,
    },
    'line-height': {
      unit: 'px',
      description: 'space between the lines',
      defaultValue: '1',
    },
    'letter-spacing': {
      unit: 'px,em',
      description: 'letter spacing',
      defaultValue: 'none',
    },
    height: {
      unit: 'px',
      description: 'The height of the element',
      defaultValue: null,
    },
    'text-decoration': {
      unit: 'string',
      description: 'underline/overline/line-through/none',
      defaultValue: null,
    },
    'text-transform': {
      unit: 'string',
      description: 'uppercase/lowercase/capitalize',
      defaultValue: null,
    },
    align: {
      unit: 'string',
      description: 'left/right/center/justify',
      defaultValue: 'left',
    },
    'container-background-color': {
      unit: 'color',
      description: 'inner element background color',
      defaultValue: null,
    },
    // padding: {
    //   unit: 'px',
    //   description: 'supports up to 4 parameters',
    //   defaultValue: '10px 25px',
    // },
    'padding-top': {
      unit: 'px',
      description: 'top offset',
      defaultValue: null,
    },
    'padding-bottom': {
      unit: 'px',
      description: 'bottom offset',
      defaultValue: null,
    },
    'padding-left': {
      unit: 'px',
      description: 'left offset',
      defaultValue: null,
    },
    'padding-right': {
      unit: 'px',
      description: 'right offset',
      defaultValue: null,
    },
    'css-class': {
      unit: 'string',
      description: 'class name, added to the root HTML element created',
      defaultValue: null,
    },
  },
}

export const MjImage = {
  title: 'Image',
  tagName: 'mj-image',
  description:
    'Displays a responsive image in your email. It is similar to the HTML <img /> tag. Note that if no width is provided, the image will use the parent column width.',
  isEndingTag: false,
  allowedChildren: [],
  attributes: {
    align: {
      unit: 'position',
      description: 'image alignment',
      defaultValue: 'center',
    },
    alt: {
      unit: 'string',
      description: 'image description',
      defaultValue: null,
    },
    border: {
      unit: 'string',
      description: 'css border definition',
      defaultValue: 'none',
    },
    'border-top': {
      unit: 'string',
      description: 'css border definition',
      defaultValue: 'none',
    },
    'border-bottom': {
      unit: 'string',
      description: 'css border definition',
      defaultValue: 'none',
    },
    'border-left': {
      unit: 'string',
      description: 'css border definition',
      defaultValue: 'none',
    },
    'border-right': {
      unit: 'string',
      description: 'css border definition',
      defaultValue: 'none',
    },
    'border-radius': {
      unit: 'px',
      description: 'border radius',
      defaultValue: null,
    },
    'container-background-color': {
      unit: 'color',
      description: 'inner element background color',
      defaultValue: null,
    },
    'css-class': {
      unit: 'string',
      description: 'class name, added to the root HTML element created',
      defaultValue: null,
    },
    'fluid-on-mobile': {
      unit: 'string',
      description:
        'if "true", will be full width on mobile even if width is set',
      defaultValue: false,
    },
    height: {
      unit: 'px',
      description: 'image height',
      defaultValue: 'auto',
    },
    href: {
      unit: 'url',
      description: 'link to redirect to on click',
      defaultValue: null,
    },
    name: {
      unit: 'string',
      description: 'specify the link name attribute',
      defaultValue: null,
    },
    // padding: {
    //   unit: 'px',
    //   description: 'supports up to 4 parameters',
    //   defaultValue: '10px 25px',
    // },
    'padding-bottom': {
      unit: 'px',
      description: 'bottom offset',
      defaultValue: 0,
    },
    'padding-left': {
      unit: 'px',
      description: 'left offset',
      defaultValue: 0,
    },
    'padding-right': {
      unit: 'px',
      description: 'right offset',
      defaultValue: 0,
    },
    'padding-top': {
      unit: 'px',
      description: 'top offset',
      defaultValue: 0,
    },
    rel: {
      unit: 'string',
      description: 'specify the rel attribute',
      defaultValue: null,
    },
    sizes: {
      unit: 'media query & width',
      description: 'set width based on query',
      defaultValue: null,
    },
    src: {
      unit: 'url',
      description: 'image source',
      defaultValue: null,
    },
    srcset: {
      unit: 'url & width',
      description:
        'enables to set a different image source based on the viewport',
      defaultValue: null,
    },
    target: {
      unit: 'string',
      description: 'link target on click',
      defaultValue: '_blank',
    },
    title: {
      unit: 'string',
      description: 'tooltip & accessibility',
      defaultValue: null,
    },
    usemap: {
      unit: 'string',
      description:
        "reference to image map, be careful, it isn't supported everywhere",
      defaultValue: null,
    },
    width: {
      unit: 'px',
      description: 'image width',
      defaultValue: 'parent width',
    },
  },
}

export const MjButton = {
  title: 'Button',
  tagName: 'mj-button',
  description: 'Displays a customizable button.',
  isEndingTag: true,
  allowedChildren: [],
  attributes: {
    align: {
      label: 'align',
      type: 'string',
      description: 'horizontal alignment',
      defaultValue: 'center',
    },
    'background-color': {
      label: 'background-color',
      unit: 'color',
      description: 'button background-color',
      defaultValue: '#414141',
    },
    border: {
      label: 'border',
      type: 'number',
      unit: 'px',
      description: 'css border format',
      defaultValue: 'none',
    },
    'border-bottom': {
      label: 'border-bottom',
      type: 'number',
      unit: 'px',
      description: 'css border format',
      defaultValue: null,
    },
    'border-left': {
      label: 'border-left',
      type: 'number',
      unit: 'px',
      description: 'css border format',
      defaultValue: null,
    },
    'border-radius': {
      label: 'border-radius',
      type: 'number',
      unit: 'px',
      description: 'border radius',
      defaultValue: '3px',
    },
    'border-right': {
      label: 'border-right',
      type: 'number',
      unit: 'px',
      description: 'css border format',
      defaultValue: null,
    },
    'border-top': {
      label: 'border-top',
      type: 'number',
      unit: 'px',
      description: 'css border format',
      defaultValue: null,
    },
    color: {
      label: 'color',
      unit: 'color',
      description: 'text color',
      defaultValue: '#ffffff',
    },
    'container-background-color': {
      label: 'container-background-color',
      unit: 'color',
      description: 'button container background color',
      defaultValue: null,
    },
    'css-class': {
      label: 'css-class',
      type: 'string',
      description: 'class name, added to the root HTML element created',
      defaultValue: null,
    },
    'font-family': {
      label: 'font-family',
      type: 'string',
      description: 'font name',
      defaultValue: 'Ubuntu, Helvetica, Arial, sans-serif',
    },
    'font-size': {
      label: 'font-size',
      unit: 'px',
      description: 'text size',
      defaultValue: '13px',
    },
    'font-style': {
      label: 'font-style',
      type: 'string',
      description: 'normal/italic/oblique',
      defaultValue: null,
    },
    'font-weight': {
      label: 'font-weight',
      unit: 'string',
      description: 'text thickness',
      defaultValue: 'normal',
    },
    height: {
      label: 'height',
      type: 'number/string',
      unit: 'px',
      description: 'button height',
      defaultValue: null,
    },
    href: {
      label: 'href',
      unit: 'link',
      description: 'link to be triggered when the button is clicked',
      defaultValue: null,
    },
    'inner-padding': {
      label: 'inner-padding',
      type: 'number',
      unit: 'px',
      description: 'inner button padding',
      defaultValue: '10px 25px',
    },
    'letter-spacing': {
      label: 'letter-spacing',
      type: 'number',
      unit: 'px/em',
      description: 'letter-spacing',
      defaultValue: null,
    },
    'line-height': {
      label: 'line-height',
      unit: 'px/%',
      description: 'line-height on link',
      defaultValue: '120%',
    },
    // padding: {
    //   type: 'number',
    //   unit: 'px',
    //   description: 'supports up to 4 parameters',
    //   defaultValue: '10px 25px',
    // },
    'padding-bottom': {
      label: 'padding-bottom',
      type: 'number',
      unit: 'px',
      description: 'bottom offset',
      defaultValue: 0,
    },
    'padding-left': {
      label: 'padding-left',
      type: 'number',
      unit: 'px',
      description: 'left offset',
      defaultValue: 0,
    },
    'padding-right': {
      label: 'padding-right',
      type: 'number',
      unit: 'px',
      description: 'right offset',
      defaultValue: 0,
    },
    'padding-top': {
      label: 'padding-top',
      type: 'number',
      unit: 'px',
      description: 'top offset',
      defaultValue: 0,
    },
    rel: {
      label: 'rel',
      type: 'string',
      description: 'specify the rel attribute for the button link',
      defaultValue: null,
    },
    target: {
      label: 'target',
      type: 'string',
      description: 'specify the target attribute for the button link',
      defaultValue: '_blank',
    },
    'text-align': {
      label: 'text-align',
      type: 'string',
      description: 'text-align button content',
      defaultValue: 'none',
    },
    'text-decoration': {
      label: 'text-decoration',
      type: 'string',
      description: 'underline/overline/none',
      defaultValue: 'none',
    },
    'text-transform': {
      label: 'text-transform',
      type: 'string',
      description: 'capitalize/uppercase/lowercase',
      defaultValue: 'none',
    },
    title: {
      label: 'title',
      type: 'string',
      description: 'tooltip & accessibility',
      defaultValue: null,
    },
    'vertical-align': {
      label: 'vertical-align',
      type: 'string',
      description: 'vertical alignment',
      defaultValue: 'middle',
    },
    width: {
      label: 'width',
      type: 'number/string',
      unit: 'px',
      description: 'button width',
      defaultValue: null,
    },
  },
}

export const MjColumn = {
  title: 'Column',
  tagName: 'mj-column',
  attributes: {
    'background-color': {
      unit: 'color',
      description: 'background color for a column',
      defaultValue: null,
    },
    'inner-background-color': {
      unit: 'color',
      description: 'requires: a padding, inner background color for column',
      defaultValue: null,
    },
    border: {
      unit: 'string',
      description: 'css border format',
      defaultValue: 'none',
    },
    'border-bottom': {
      unit: 'string',
      description: 'css border format',
      defaultValue: 0,
    },
    'border-left': {
      unit: 'string',
      description: 'css border format',
      defaultValue: 0,
    },
    'border-right': {
      unit: 'string',
      description: 'css border format',
      defaultValue: 0,
    },
    'border-top': {
      unit: 'string',
      description: 'css border format',
      defaultValue: 0,
    },
    'border-radius': {
      unit: 'percent/px',
      description: 'border radius',
      defaultValue: 0,
    },
    'inner-border': {
      unit: 'string',
      description: 'css border format',
      defaultValue: null,
    },
    'inner-border-bottom': {
      unit: 'string',
      description: 'css border format ; requires a padding',
      defaultValue: null,
    },
    'inner-border-left': {
      unit: 'string',
      description: 'css border format ; requires a padding',
      defaultValue: null,
    },
    'inner-border-right': {
      unit: 'string',
      description: 'css border format ; requires a padding',
      defaultValue: null,
    },
    'inner-border-top': {
      unit: 'string',
      description: 'css border format ; requires a padding',
      defaultValue: null,
    },
    'inner-border-radius': {
      unit: 'percent/px',
      description: 'border radius ; requires a padding',
      defaultValue: null,
    },
    width: {
      unit: 'percent/px',
      description: 'column width',
      defaultValue: '(100 / number of non-raw elements in section)%',
    },
    'vertical-align': {
      unit: 'string',
      description: 'middle/top/bottom',
      defaultValue: 'top',
    },
    // padding: {
    //   unit: 'px',
    //   description: 'supports up to 4 parameters',
    //   'defaultValue': null,
    // },
    'padding-top': {
      unit: 'px',
      description: 'section top offset',
      defaultValue: 0,
    },
    'padding-bottom': {
      unit: 'px',
      description: 'section bottom offset',
      defaultValue: 0,
    },
    'padding-left': {
      unit: 'px',
      description: 'section left offset',
      defaultValue: 0,
    },
    'padding-right': {
      unit: 'px',
      description: 'section right offset',
      defaultValue: 0,
    },
    'css-class': {
      unit: 'string',
      description: 'class name, added to the root HTML element created',
      defaultValue: null,
    },
  },
  description: 'Displays a customizable column.',
  isEndingTag: false,
  allowedChildren: [MjText, MjImage, MjButton],
}

export const MjSection = {
  title: 'Section',
  tagName: 'mj-section',
  attributes: {
    'background-color': {
      unit: 'color',
      description: 'section color',
      defaultValue: null,
    },
    'background-position': {
      unit: "percent / 'left','top',... (2 values max)",
      description: 'css background position (see outlook limitations below)',
      defaultValue: 'top center',
    },
    'background-position-x': {
      unit: 'percent / keyword',
      description: 'css background position x',
      defaultValue: 'none',
    },
    'background-position-y': {
      unit: 'percent / keyword',
      description: 'css background position y',
      defaultValue: 'none',
    },
    'background-repeat': {
      unit: 'string',
      description: 'css background repeat',
      defaultValue: 'repeat',
    },
    'background-size': {
      unit: "px/percent/'cover'/'contain'",
      description: 'css background size',
      defaultValue: 'auto',
    },
    'background-url': {
      unit: 'url',
      description: 'background url',
      defaultValue: null,
    },
    border: {
      unit: 'string',
      description: 'css border format',
      defaultValue: 'none',
    },
    'border-bottom': {
      unit: 'string',
      description: 'css border format',
      defaultValue: 0,
    },
    'border-left': {
      unit: 'string',
      description: 'css border format',
      defaultValue: 0,
    },
    'border-radius': {
      unit: 'px',
      description: 'border radius',
      defaultValue: 0,
    },
    'border-right': {
      unit: 'string',
      description: 'css border format',
      defaultValue: 0,
    },
    'border-top': {
      unit: 'string',
      description: 'css border format',
      defaultValue: 0,
    },
    'css-class': {
      unit: 'string',
      description: 'class name, added to the root HTML element created',
      defaultValue: '',
    },
    direction: {
      unit: 'ltr / rtl',
      description: 'set the display order of direct children',
      defaultValue: 'ltr',
    },
    'full-width': {
      unit: 'string',
      description: 'make the section full-width',
      defaultValue: null,
    },
    // padding: {
    //   unit: 'px',
    //   description: 'supports up to 4 parameters',
    //   defaultValue: '20px 0',
    // },
    'padding-bottom': {
      unit: 'px',
      description: 'section bottom offset',
      defaultValue: null,
    },
    'padding-left': {
      unit: 'px',
      description: 'section left offset',
      defaultValue: null,
    },
    'padding-right': {
      unit: 'px',
      description: 'section right offset',
      defaultValue: null,
    },
    'padding-top': {
      unit: 'px',
      description: 'section top offset',
      defaultValue: null,
    },
    'text-align': {
      unit: 'string',
      description: 'css text-align',
      defaultValue: 'center',
    },
  },
  isEndingTag: false,
  allowedChildren: [MjColumn],
}

export const MjWrapper = {
  title: 'Wrapper',
  tagName: 'mj-wrapper',
  attributes: {
    'background-color': {
      unit: 'color',
      description: 'section color',
      defaultValue: null,
    },
    'background-position': {
      unit: "percent / 'left','top',... (2 values max)",
      description:
        'css background position (see outlook limitations in mj-section doc)',
      defaultValue: 'top center',
    },
    'background-position-x': {
      unit: 'percent / keyword',
      description: 'css background position x',
      defaultValue: 'auto',
    },
    'background-position-y': {
      unit: 'percent / keyword',
      description: 'css background position y',
      defaultValue: 'auto',
    },
    'background-repeat': {
      unit: 'string',
      description: 'css background repeat',
      defaultValue: 'repeat',
    },
    'background-size': {
      unit: "px/percent/'cover'/'contain'",
      description: 'css background size',
      defaultValue: 'auto',
    },
    'background-url': {
      unit: 'url',
      description: 'background url',
      defaultValue: null,
    },
    border: {
      unit: 'string',
      description: 'css border format',
      defaultValue: 'none',
    },
    'border-bottom': {
      unit: 'string',
      description: 'css border format',
      defaultValue: 0,
    },
    'border-left': {
      unit: 'string',
      description: 'css border format',
      defaultValue: 0,
    },
    'border-radius': {
      unit: 'px',
      description: 'border radius',
      defaultValue: 0,
    },
    'border-right': {
      unit: 'string',
      description: 'css border format',
      defaultValue: 0,
    },
    'border-top': {
      unit: 'string',
      description: 'css border format',
      defaultValue: 0,
    },
    'css-class': {
      unit: 'string',
      description: 'class name, added to the root HTML element created',
      defaultValue: '',
    },
    'full-width': {
      unit: 'string',
      description: 'make the wrapper full-width',
      defaultValue: false,
    },
    // padding: {
    //   unit: 'px',
    //   description: 'supports up to 4 parameters',
    //   defaultValue: '20px 0',
    // },
    'padding-bottom': {
      unit: 'px',
      description: 'section bottom offset',
      defaultValue: 0,
    },
    'padding-left': {
      unit: 'px',
      description: 'section left offset',
      defaultValue: 0,
    },
    'padding-right': {
      unit: 'px',
      description: 'section right offset',
      defaultValue: 0,
    },
    'padding-top': {
      unit: 'px',
      description: 'section top offset',
      defaultValue: 0,
    },
    'text-align': {
      unit: 'string',
      description: 'css text-align',
      defaultValue: 'center',
    },
  },
  isEndingTag: false,
  allowedChildren: [MjSection],
}
