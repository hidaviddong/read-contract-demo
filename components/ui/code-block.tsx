import type { BundledLanguage } from 'shiki'
import { codeToHtml } from 'shiki'

interface Props {
  children: string
  lang: BundledLanguage
}

export async function CodeBlock(props: Props) {
  const out = await codeToHtml(props.children, {
    lang: props.lang,
    theme: 'github-light',
    decorations: [ 
      {
        start: 21,
        end: 24,
        properties: { class: 'highlighted-word' }
      }
    ]
  })

  return <div dangerouslySetInnerHTML={{ __html: out }} />
} 