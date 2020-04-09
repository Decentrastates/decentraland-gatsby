import React from "react"
import TokenList from "../../utils/TokenList"
import { StyleNamespace } from "../../variables"

import "./Link.css"

export type LinkProps = React.Props<HTMLAnchorElement> &
  React.HTMLProps<HTMLAnchorElement> & {
    secondary?: boolean
  }

export default function Link({ secondary, href, rel, target, ...props }: LinkProps) {

  const external = href && (
    href.startsWith('https://') ||
    href.startsWith('http://') ||
    href.startsWith('//')
  )

  if (!target && external) {
    target = '_blank'
  }

  if (external) {
    rel = new TokenList(rel).add('noopener', 'noreferrer').value
  }

  return (
    <a
      {...props}
      className={TokenList.join([StyleNamespace, "Link", (props.onClick || href) && 'Link--actionable', props.className])}
      href={href}
      target={target}
      rel={rel}
    />
  )
}
