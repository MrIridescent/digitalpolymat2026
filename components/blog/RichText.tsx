import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'
import type { BlogCover, RichTextNode } from '@/lib/contentful'
import { slugifyHeading } from '@/lib/contentful'

type RichTextProps = {
  document: RichTextNode
}

function nodeText(node: RichTextNode): string {
  return (node.content ?? [])
    .map((child) => child.value ?? nodeText(child))
    .join('')
}

function renderMarks(
  value: string | undefined,
  marks: RichTextNode['marks'],
  key: string
): ReactNode {
  let node: ReactNode = value ?? ''
  if (!marks || marks.length === 0) return <span key={key}>{node}</span>

  for (const mark of marks) {
    switch (mark.type) {
      case 'bold':
        node = <strong>{node}</strong>
        break
      case 'italic':
        node = <em>{node}</em>
        break
      case 'underline':
        node = <u>{node}</u>
        break
      case 'code':
        node = <code>{node}</code>
        break
      case 'superscript':
        node = <sup>{node}</sup>
        break
      case 'subscript':
        node = <sub>{node}</sub>
        break
      default:
        break
    }
  }

  return <span key={key}>{node}</span>
}

function assetData(node: RichTextNode): BlogCover | undefined {
  const asset = node.data?.asset as BlogCover | undefined
  return asset?.url ? asset : undefined
}

function renderNode(node: RichTextNode, key: string): ReactNode {
  switch (node.nodeType) {
    case 'document':
      return <div key={key}>{node.content?.map((child, index) => renderNode(child, `${key}-${index}`))}</div>

    case 'text':
      return renderMarks(node.value, node.marks, key)

    case 'paragraph':
      return <p key={key}>{node.content?.map((child, index) => renderNode(child, `${key}-${index}`))}</p>

    case 'heading-1':
    case 'heading-2':
      return (
        <h2 key={key} id={slugifyHeading(nodeText(node))}>
          {node.content?.map((child, index) => renderNode(child, `${key}-${index}`))}
        </h2>
      )

    case 'heading-3':
    case 'heading-4':
    case 'heading-5':
    case 'heading-6':
      return (
        <h3 key={key} id={slugifyHeading(nodeText(node))}>
          {node.content?.map((child, index) => renderNode(child, `${key}-${index}`))}
        </h3>
      )

    case 'unordered-list':
    case 'ordered-list': {
      const Tag = node.nodeType === 'ordered-list' ? 'ol' : 'ul'
      return (
        <Tag key={key}>
          {node.content?.map((child, index) => renderNode(child, `${key}-${index}`))}
        </Tag>
      )
    }

    case 'list-item':
      return <li key={key}>{node.content?.map((child, index) => renderNode(child, `${key}-${index}`))}</li>

    case 'blockquote':
      return <blockquote key={key}>{node.content?.map((child, index) => renderNode(child, `${key}-${index}`))}</blockquote>

    case 'hr':
      return <hr key={key} />

    case 'hyperlink':
    case 'entry-hyperlink': {
      const uri = typeof node.data?.uri === 'string' ? node.data.uri : undefined
      const children = node.content?.map((child, index) => renderNode(child, `${key}-${index}`))
      if (!uri) return <span key={key}>{children}</span>
      if (uri.startsWith('/'))
        return (
          <Link key={key} href={uri}>
            {children}
          </Link>
        )
      return (
        <a key={key} href={uri} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      )
    }

    case 'asset-hyperlink': {
      const asset = assetData(node)
      const children = node.content?.map((child, index) => renderNode(child, `${key}-${index}`))
      if (!asset) return <span key={key}>{children}</span>
      return (
        <a key={key} href={asset.url} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      )
    }

    case 'embedded-asset-block': {
      const asset = assetData(node)
      if (!asset) return null
      return (
        <figure key={key} className="my-10 overflow-hidden rounded-2xl border border-white/10">
          <Image
            src={asset.url}
            alt={asset.title}
            width={asset.width ?? 1200}
            height={asset.height ?? 675}
            sizes="(max-width: 1024px) 100vw, 760px"
            className="h-auto w-full object-cover"
          />
          {asset.title ? (
            <figcaption className="border-t border-white/10 px-4 py-3 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-white/35">
              {asset.title}
            </figcaption>
          ) : null}
        </figure>
      )
    }

    default:
      if (node.content) {
        return <span key={key}>{node.content.map((child, index) => renderNode(child, `${key}-${index}`))}</span>
      }
      return null
  }
}

export function RichText({ document }: RichTextProps) {
  return <div className="k-prose">{renderNode(document, 'rt')}</div>
}
