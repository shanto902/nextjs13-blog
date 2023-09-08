import Link from 'next/link'
import React from 'react'

const SiteLinks = ({platform, link}:{
    platform: string,
    link:string
}) => {
  return (
    <Link href={link}>SiteLinks</Link>
  )
}

export default SiteLinks