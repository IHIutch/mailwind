import CodeBlock from '@tiptap/extension-code-block'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Document from '@tiptap/extension-document'
import Text from '@tiptap/extension-text'
import { EditorContent, mergeAttributes, useEditor } from '@tiptap/react'
import hljs from 'highlight.js'
import { useEffect, useMemo, useRef, useState } from 'react'
import { getHighlighter, setCDN } from 'shiki'

// setCDN('https://unpkg.com/shiki/')

function htmlEntities(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
export default function CodeblockEditor({ onChange, value, highlighter }) {
  // const [highlighter, setHighlighter] = useState({})
  // const highlighterRef = useRef(highlighter)

  // useEffect(() => {

  // }, [])

  CodeBlockLowlight

  const CodeBlockShiki = CodeBlock.extend({
    name: 'codeBlockShiki',
    addOptions() {
      return {
        languageClassPrefix: 'language-',
        HTMLAttributes: [],
        defaultLanguage: 'html',
        theme: 'nord',
        guessLanguage: true,
      }
    },
    renderHTML({ node, HTMLAttributes }) {
      let language = ''
      const code = node?.content?.content?.[0]?.text || ''

      // Language is set
      if (node.attrs.language) {
        language = node.attrs.language
      }

      // Auto-detect the language
      else if (this.options.guessLanguage) {
        try {
          const result = hljs.highlightAuto(code)
          language = result.language
        } catch (error) {
          console.log('hljs', error)
        }
      }

      // Use the default language
      if (!language) {
        language = this.options.defaultLanguage
      }

      var content = ''
      try {
        content = highlighter.codeToHtml(code, { lang: 'js' })
      } catch (error) {
        console.log({ error })

        //   console.log(mergeAttributes)

        //   // const renderedAttributes = renderAttributes(mergedAttributes)

        //   // content +=
        //   //   '<pre><code' +
        //   //   // renderedAttributes +
        //   //   '>' +
        //   //   htmlEntities(code) +
        //   //   '</code></pre>'

        //   content = ['pre', 'code', [mergedAttributes], [htmlEntities(code)]]
      }

      const mergedAttributes = mergeAttributes(
        this.options['HTMLAttributes'],
        HTMLAttributes
      )

      console.log({ content, code })
      return ['pre', ['code', mergedAttributes, 0]]
    },
    // parseHTML() {
    //   return [
    //     {
    //       tag: 'code',
    //       getAttrs: (element) => {
    //         console.log({ element })
    //         // Check if the element has an attribute
    //         element.hasAttribute('style')
    //         // Get an inline style
    //         // element.style.color
    //         // Get a specific attribute
    //         element.getAttribute('data-color')
    //       },
    //     },
    //   ]
    // },
    addAttributes() {
      return {
        language: {
          default: null,
          parseHTML: (el) => {
            console.log({ el })
            return el
          },
        },
      }
    },
  })

  const editor = useEditor({
    editorProps: {
      handleDrop: () => true,
    },
    extensions: [
      Document, // Required
      Text, // Required
      CodeBlockShiki,
    ],
    onUpdate: (value) => {
      onChange(value.editor?.getHTML().replaceAll(/<br.*?>/g, ''))
    },
    content: value,
  })

  return (
    <EditorContent
      editor={editor}
      spellCheck={false}
      onKeyUp={(e) => {
        if (e.key === 'Enter') e.preventDefault()
      }}
    />
  )
}
