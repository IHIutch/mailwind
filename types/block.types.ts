import { type Language } from 'prism-react-renderer'

export interface CodeBlockAttributeProps {
  language: Language | undefined
  theme:
    | 'dracula'
    | 'duotoneDark'
    | 'duotoneLight'
    | 'github'
    | 'jettwaveDark'
    | 'jettwaveLight'
    | 'nightOwl'
    | 'nightOwlLight'
    | 'oceanicNext'
    | 'okaidia'
    | 'palenight'
    | 'shadesOfPurple'
    | 'synthwave84'
    | 'ultramin'
    | 'vsDark'
    | 'vsLight'
    | undefined
}
