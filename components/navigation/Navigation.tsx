import Link from 'next/link'
import React from 'react'
import PaddingContainer from '../layout/PaddingContainer'
import siteConfig from '@/config/site'

const Navigation = () => {
  return (

      <div className='sticky top-0 left-0 right-0 border-b bg-white bg-opacity-50 backdrop-blur-md'>
         <PaddingContainer>
      <div className=' flex items-center justify-between py-5'>
    <Link className=' font-bold text-lg' href="/">{siteConfig.siteName}</Link>
    {/* Category Links */}
    <nav >
        <ul className=' flex items-center gap-4 text-neutral-600 '>
            <li><Link href='cities'>Cities</Link></li>
            <li><Link href='experiences'>Experiences</Link></li>
        </ul>
    </nav>

   </div> 
   </PaddingContainer>
      </div>
  )
}

export default Navigation