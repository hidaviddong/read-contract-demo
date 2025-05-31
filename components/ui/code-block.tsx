import type { BundledLanguage } from 'shiki'
import { codeToHtml } from 'shiki'

interface Props {
  children: string
  lang: BundledLanguage
  decorations?: {
    start: { line: number; character: number }
    end: { line: number; character: number }
    properties: { class?: string; [key: string]: any }
  }[]
}

export async function CodeBlock(props: Props) {
  const out = await codeToHtml(props.children, {
    lang: props.lang,
    theme: 'github-light',
    decorations: props.decorations || []
  })

  return <div dangerouslySetInnerHTML={{ __html: out }} />
} 