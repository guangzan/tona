/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: <explanation> */

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  html: string
}

export function RichText({ html, ...rest }: Props) {
  return <div {...rest} dangerouslySetInnerHTML={{ __html: html }} />
}
