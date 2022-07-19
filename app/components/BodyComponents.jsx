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

const Attributes = {
  color: {
    label: 'Color',
    type: String,
    description: 'text color',
  },
  'font-family': {
    label: 'Font Family',
    type: String,
    description: 'font',
  },
  'font-size': {
    label: 'Font Size',
    unit: 'px',
    type: Number,
    description: 'text size',
  },
  'font-style': {
    label: 'Font Style',
    type: String,
    description: 'normal/italic/oblique',
  },
  'font-weight': {
    label: 'Font Weight',
    type: Number,
    description: 'text thickness',
  },
  'line-height': {
    label: 'Line Height',
    unit: 'px',
    type: Number,
    description: 'space between the lines',
  },
  'letter-spacing': {
    label: 'Letter Spacing',
    unit: 'px/em',
    type: Number,
    description: 'letter spacing',
  },
  height: {
    label: 'Height',
    unit: 'px',
    type: Number,
    description: 'The height of the element',
  },
  'text-decoration': {
    label: 'Text Decoration',
    type: String,
    description: 'underline/overline/line-through/none',
  },
  'text-transform': {
    label: 'Text Transform',
    type: String,
    description: 'uppercase/lowercase/capitalize',
  },
  align: {
    label: 'Align',
    type: String,
    description: 'left/right/center/justify',
  },
  'container-background-color': {
    label: 'Container Background Color',
    type: 'color',
    description: 'inner element background color',
  },
  padding: {
    label: 'Padding',
    unit: 'px',
    type: Number,
    description: 'supports up to 4 parameters',
  },
  'padding-top': {
    label: 'Padding Top',
    unit: 'px',
    type: Number,
    description: 'top offset',
  },
  'padding-bottom': {
    label: 'Padding Bottom',
    unit: 'px',
    type: Number,
    description: 'bottom offset',
  },
  'padding-left': {
    label: 'Padding Left',
    unit: 'px',
    type: Number,
    description: 'left offset',
  },
  'padding-right': {
    label: 'Padding Right',
    unit: 'px',
    type: Number,
    description: 'right offset',
  },
  'css-class': {
    label: 'CSS Class',
    type: String,
    description: 'class name, added to the root HTML element created',
  },
  alt: {
    label: 'Alt',
    type: String,
    description: 'image description',
  },
  border: {
    label: 'Border',
    type: String,
    description: 'css border definition',
  },
  'border-top': {
    label: 'Border Top',
    type: String,
    description: 'css border definition',
  },
  'border-bottom': {
    label: 'Border Bottom',
    type: String,
    description: 'css border definition',
  },
  'border-left': {
    label: 'Border Left',
    type: String,
    description: 'css border definition',
  },
  'border-right': {
    label: 'Border Right',
    type: String,
    description: 'css border definition',
  },
  'border-radius': {
    label: 'Border Radius',
    unit: 'px',
    type: Number,
    description: 'border radius',
  },
  'fluid-on-mobile': {
    label: 'Fluid on Mobile',
    type: Boolean,
    description: 'if "true", will be full width on mobile even if width is set',
  },
  href: {
    label: 'Href',
    unit: 'url',
    type: String,
    description: 'link to redirect to on click',
  },
  name: {
    label: 'Name',
    type: String,
    description: 'specify the link name attribute',
  },
  rel: {
    label: 'Rel',
    type: String,
    description: 'specify the rel attribute',
  },
  sizes: {
    label: 'Sizes',
    unit: 'media query & width',
    type: Number,
    description: 'set width based on query',
  },
  src: {
    label: 'Src',
    unit: 'url',
    type: String,
    description: 'image source',
  },
  srcset: {
    label: 'Srcset',
    unit: 'url & width',
    type: String,
    description:
      'enables to set a different image source based on the viewport',
  },
  target: {
    label: 'Target',
    type: String,
    description: 'link target on click',
  },
  title: {
    label: 'Title',
    type: String,
    description: 'tooltip & accessibility',
  },
  usemap: {
    label: 'Usemap',
    type: String,
    description:
      "reference to image map, be careful, it isn't supported everywhere",
  },
  width: {
    label: 'Width',
    unit: 'px',
    type: Number,
    description: '',
  },
  'background-color': {
    label: 'Background Color',
    type: 'color',
    description: 'background color for a column',
  },
  'inner-background-color': {
    label: 'Inner Background Color',
    type: 'color',
    description: 'requires: a padding, inner background color for column',
  },
  'inner-border': {
    label: 'Inner Border',
    type: String,
    description: 'css border format',
  },
  'inner-border-bottom': {
    label: 'Inner Border Bottom',
    type: String,
    description: 'css border format ; requires a padding',
  },
  'inner-border-left': {
    label: 'Inner Border Left',
    type: String,
    description: 'css border format ; requires a padding',
  },
  'inner-border-right': {
    label: 'Inner Border Right',
    type: String,
    description: 'css border format ; requires a padding',
  },
  'inner-border-top': {
    label: 'Inner Border Top',
    type: String,
    description: 'css border format ; requires a padding',
  },
  'inner-border-radius': {
    label: 'Inner Border Radius',
    unit: 'percent/px',
    type: Number,
    description: 'border radius ; requires a padding',
  },
  'vertical-align': {
    label: 'Vertical Align',
    type: String,
    description: 'middle/top/bottom',
  },
  'background-position': {
    label: 'Background Position',
    unit: "percent / 'left','top',... (2 values max)",
    type: [String, Number],
    description: 'css background position (see outlook limitations below)',
  },
  'background-position-x': {
    label: 'Background Position X',
    unit: 'percent / keyword',
    type: [String, Number],
    description: 'css background position x',
  },
  'background-position-y': {
    label: 'Background Position Y',
    unit: 'percent / keyword',
    type: [String, Number],
    description: 'css background position y',
  },
  'background-repeat': {
    label: 'Background Repeat',
    type: String,
    description: 'css background repeat',
  },
  'background-size': {
    label: 'Background Size',
    unit: "px/percent/'cover'/'contain'",
    type: [String, Number],
    description: 'css background size',
  },
  'background-url': {
    label: 'Background Url',
    unit: 'url',
    type: String,
    description: 'background url',
  },
  direction: {
    label: 'Direction',
    unit: 'ltr / rtl',
    type: String,
    description: 'set the display order of direct children',
  },
  'full-width': {
    label: 'Full Width',
    type: Boolean,
    description: 'make the section full-width',
  },
  'text-align': {
    label: 'Text Align',
    type: String,
    description: 'css text-align',
  },
  'inner-padding': {
    label: 'Inner Padding',
    type: Number,
    unit: 'px',
    description: 'inner button padding',
  },
}

export const MjText = {
  title: 'Text',
  tagName: 'mj-text',
  description: 'This tag allows you to display text in your email.',
  isEndingTag: true,
  allowedChildren: [],
  attributes: {
    color: { ...Attributes.color, defaultValue: '#000000' },
    'font-family': {
      ...Attributes['font-family'],
      defaultValue: 'Ubuntu, Helvetica, Arial, sans-serif',
    },
    'font-size': { ...Attributes['font-size'], defaultValue: '13px' },
    'font-style': { ...Attributes['font-style'], defaultValue: null },
    'font-weight': { ...Attributes['font-weight'], defaultValue: null },
    'line-height': { ...Attributes['line-height'], defaultValue: '1' },
    'letter-spacing': { ...Attributes['letter-spacing'], defaultValue: 'none' },
    height: { ...Attributes.height, defaultValue: null },
    'text-decoration': { ...Attributes['text-decoration'], defaultValue: null },
    'text-transform': { ...Attributes['text-transform'], defaultValue: null },
    align: { ...Attributes.align, defaultValue: 'left' },
    'container-background-color': {
      ...Attributes['container-background-color'],
      defaultValue: null,
    },
    // padding: { ...Attributes.padding, defaultValue: '10px 25px' },
    'padding-top': { ...Attributes['padding-top'], defaultValue: null },
    'padding-bottom': { ...Attributes['padding-bottom'], defaultValue: null },
    'padding-left': { ...Attributes['padding-left'], defaultValue: null },
    'padding-right': { ...Attributes['padding-right'], defaultValue: null },
    'css-class': { ...Attributes['css-class'], defaultValue: null },
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
    align: { ...Attributes.align, defaultValue: 'center' },
    alt: { ...Attributes.alt, defaultValue: null },
    border: { ...Attributes.border, defaultValue: 'none' },
    'border-top': { ...Attributes['border-top'], defaultValue: 'none' },
    'border-bottom': { ...Attributes['border-bottom'], defaultValue: 'none' },
    'border-left': { ...Attributes['border-left'], defaultValue: 'none' },
    'border-right': { ...Attributes['border-right'], defaultValue: 'none' },
    'border-radius': { ...Attributes['border-radius'], defaultValue: null },
    'container-background-color': {
      ...Attributes['container-background-color'],
      defaultValue: null,
    },
    'css-class': { ...Attributes['css-class'], defaultValue: null },
    'fluid-on-mobile': {
      ...Attributes['fluid-on-mobile'],
      defaultValue: false,
    },
    height: { ...Attributes.height, defaultValue: 'auto' },
    href: { ...Attributes.href, defaultValue: null },
    name: { ...Attributes.name, defaultValue: null },
    // padding: { ...Attributes.padding, defaultValue: '10px 25px' },
    'padding-bottom': { ...Attributes['padding-bottom'], defaultValue: 0 },
    'padding-left': { ...Attributes['padding-left'], defaultValue: 0 },
    'padding-right': { ...Attributes['padding-right'], defaultValue: 0 },
    'padding-top': { ...Attributes['padding-top'], defaultValue: 0 },
    rel: { ...Attributes.rel, defaultValue: null },
    sizes: { ...Attributes.sizes, defaultValue: null },
    src: { ...Attributes.src, defaultValue: null },
    srcset: { ...Attributes.srcset, defaultValue: null },
    target: { ...Attributes.target, defaultValue: '_blank' },
    title: { ...Attributes.title, defaultValue: null },
    usemap: { ...Attributes.usemap, defaultValue: null },
    width: { ...Attributes.width, defaultValue: '100%' },
  },
}

export const MjButton = {
  title: 'Button',
  tagName: 'mj-button',
  description: 'Displays a customizable button.',
  isEndingTag: true,
  allowedChildren: [],
  attributes: {
    align: { ...Attributes.align, defaultValue: 'center' },
    'background-color': {
      ...Attributes['background-color'],
      defaultValue: '#414141',
    },
    border: { ...Attributes.border, defaultValue: 'none' },
    'border-bottom': { ...Attributes['border-bottom'], defaultValue: null },
    'border-left': { ...Attributes['border-left'], defaultValue: null },
    'border-radius': { ...Attributes['border-radius'], defaultValue: '3px' },
    'border-right': { ...Attributes['border-right'], defaultValue: null },
    'border-top': { ...Attributes['border-top'], defaultValue: null },
    color: { ...Attributes.color, defaultValue: '#ffffff' },
    'container-background-color': {
      ...Attributes['container-background-color'],
      defaultValue: null,
    },
    'css-class': { ...Attributes['css-class'], defaultValue: null },
    'font-family': {
      ...Attributes['font-family'],
      defaultValue: 'Ubuntu, Helvetica, Arial, sans-serif',
    },
    'font-size': { ...Attributes['font-size'], defaultValue: '13px' },
    'font-style': { ...Attributes['font-style'], defaultValue: null },
    'font-weight': { ...Attributes['font-weight'], defaultValue: 'normal' },
    height: { ...Attributes.height, defaultValue: null },
    href: { ...Attributes.href, defaultValue: null },
    'inner-padding': {
      ...Attributes['inner-padding'],
      defaultValue: '10px 25px',
    },
    'letter-spacing': { ...Attributes['letter-spacing'], defaultValue: null },
    'line-height': { ...Attributes['line-height'], defaultValue: '120%' },
    // padding: { ...Attributes.padding, defaultValue: '10px 25px' },
    'padding-bottom': { ...Attributes['padding-bottom'], defaultValue: 0 },
    'padding-left': { ...Attributes['padding-left'], defaultValue: 0 },
    'padding-right': { ...Attributes['padding-right'], defaultValue: 0 },
    'padding-top': { ...Attributes['padding-top'], defaultValue: 0 },
    rel: { ...Attributes.rel, defaultValue: null },
    target: { ...Attributes.target, defaultValue: '_blank' },
    'text-align': { ...Attributes['text-align'], defaultValue: 'none' },
    'text-decoration': {
      ...Attributes['text-decoration'],
      defaultValue: 'none',
    },
    'text-transform': { ...Attributes['text-transform'], defaultValue: 'none' },
    title: { ...Attributes.title, defaultValue: null },
    'vertical-align': {
      ...Attributes['vertical-align'],
      defaultValue: 'middle',
    },
    width: { ...Attributes.width, defaultValue: null },
  },
}

export const MjColumn = {
  title: 'Column',
  tagName: 'mj-column',
  description: 'Displays a customizable column.',
  attributes: {
    'background-color': {
      ...Attributes['background-color'],
      defaultValue: null,
    },
    'inner-background-color': {
      ...Attributes['inner-background-color'],
      defaultValue: null,
    },
    border: { ...Attributes.border, defaultValue: 'none' },
    'border-bottom': { ...Attributes['border-bottom'], defaultValue: 0 },
    'border-left': { ...Attributes['border-left'], defaultValue: 0 },
    'border-right': { ...Attributes['border-right'], defaultValue: 0 },
    'border-top': { ...Attributes['border-top'], defaultValue: 0 },
    'border-radius': { ...Attributes['border-radius'], defaultValue: 0 },
    'inner-border': { ...Attributes['inner-border'], defaultValue: null },
    'inner-border-bottom': {
      ...Attributes['inner-border-bottom'],
      defaultValue: null,
    },
    'inner-border-left': {
      ...Attributes['inner-border-left'],
      defaultValue: null,
    },
    'inner-border-right': {
      ...Attributes['inner-border-right'],
      defaultValue: null,
    },
    'inner-border-top': {
      ...Attributes['inner-border-top'],
      defaultValue: null,
    },
    'inner-border-radius': {
      ...Attributes['inner-border-radius'],
      defaultValue: null,
    },
    width: {
      ...Attributes.width,
      defaultValue: null,
    },
    'vertical-align': { ...Attributes['vertical-align'], defaultValue: 'top' },
    padding: { ...Attributes.padding, defaultValue: null },
    'padding-top': { ...Attributes['padding-top'], defaultValue: 0 },
    'padding-bottom': { ...Attributes['padding-bottom'], defaultValue: 0 },
    'padding-left': { ...Attributes['padding-left'], defaultValue: 0 },
    'padding-right': { ...Attributes['padding-right'], defaultValue: 0 },
    'css-class': { ...Attributes['css-class'], defaultValue: null },
  },
  isEndingTag: false,
  allowedChildren: [MjText, MjImage, MjButton],
}

export const MjSection = {
  title: 'Section',
  tagName: 'mj-section',
  attributes: {
    'background-color': {
      ...Attributes['background-color'],
      defaultValue: null,
    },
    'background-position': {
      ...Attributes['background-position'],
      defaultValue: 'top center',
    },
    'background-position-x': {
      ...Attributes['background-position-x'],
      defaultValue: 'none',
    },
    'background-position-y': {
      ...Attributes['background-position-y'],
      defaultValue: 'none',
    },
    'background-repeat': {
      ...Attributes['background-repeat'],
      defaultValue: 'repeat',
    },
    'background-size': {
      ...Attributes['background-size'],
      defaultValue: 'auto',
    },
    'background-url': { ...Attributes['background-url'], defaultValue: null },
    border: { ...Attributes.border, defaultValue: 'none' },
    'border-bottom': { ...Attributes['border-bottom'], defaultValue: 0 },
    'border-left': { ...Attributes['border-left'], defaultValue: 0 },
    'border-radius': { ...Attributes['border-radius'], defaultValue: 0 },
    'border-right': { ...Attributes['border-right'], defaultValue: 0 },
    'border-top': { ...Attributes['border-top'], defaultValue: 0 },
    'css-class': { ...Attributes['css-class'], defaultValue: '' },
    direction: { ...Attributes.direction, defaultValue: 'ltr' },
    'full-width': { ...Attributes['full-width'], defaultValue: null },
    // padding: { ...Attributes.padding, defaultValue: '20px 0' },
    'padding-bottom': { ...Attributes['padding-bottom'], defaultValue: null },
    'padding-left': { ...Attributes['padding-left'], defaultValue: null },
    'padding-right': { ...Attributes['padding-right'], defaultValue: null },
    'padding-top': { ...Attributes['padding-top'], defaultValue: null },
    'text-align': { ...Attributes['text-align'], defaultValue: 'center' },
  },
  isEndingTag: false,
  allowedChildren: [MjColumn],
}

export const MjWrapper = {
  title: 'Wrapper',
  tagName: 'mj-wrapper',
  attributes: {
    'background-color': {
      ...Attributes['background-color'],
      defaultValue: null,
    },
    'background-position': {
      ...Attributes['background-position'],
      defaultValue: 'top center',
    },
    'background-position-x': {
      ...Attributes['background-position-x'],
      defaultValue: 'auto',
    },
    'background-position-y': {
      ...Attributes['background-position-y'],
      defaultValue: 'auto',
    },
    'background-repeat': {
      ...Attributes['background-repeat'],
      defaultValue: 'repeat',
    },
    'background-size': {
      ...Attributes['background-size'],
      defaultValue: 'auto',
    },
    'background-url': { ...Attributes['background-url'], defaultValue: null },
    border: { ...Attributes.border, defaultValue: 'none' },
    'border-bottom': { ...Attributes['border-bottom'], defaultValue: 0 },
    'border-left': { ...Attributes['border-left'], defaultValue: 0 },
    'border-radius': { ...Attributes['border-radius'], defaultValue: 0 },
    'border-right': { ...Attributes['border-right'], defaultValue: 0 },
    'border-top': { ...Attributes['border-top'], defaultValue: 0 },
    'css-class': { ...Attributes['css-class'], defaultValue: '' },
    'full-width': { ...Attributes['full-width'], defaultValue: false },
    // padding: { ...Attributes.padding, defaultValue: '20px 0' },
    'padding-bottom': { ...Attributes['padding-bottom'], defaultValue: 0 },
    'padding-left': { ...Attributes['padding-left'], defaultValue: 0 },
    'padding-right': { ...Attributes['padding-right'], defaultValue: 0 },
    'padding-top': { ...Attributes['padding-top'], defaultValue: 0 },
    'text-align': { ...Attributes['text-align'], defaultValue: 'center' },
  },
  isEndingTag: false,
  allowedChildren: [MjSection],
}
