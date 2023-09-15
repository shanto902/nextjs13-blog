import Link from 'next/link'
import React from 'react'
import PaddingContainer from '../layout/PaddingContainer'


import { Lightbulb, MenuIcon, MoonIcon } from 'lucide-react'
import SearchComponent from './SearchComponent'
import Image from 'next/image'
import logo from '@/assets/logo-nav.png'
import MobileDrawer from './MobileDrawer'

const Navigation = () => {
  return (

      <div className=' sticky z-40 top-0 left-0 right-0 bg-white'>
         <PaddingContainer>
   <div className=' xl:block hidden'>
    
         <hr className=' border-neutral-400 mt-4' />
      <div className=' flex items-center justify-between py-5'>

    {/* Category Links */}
    <nav>
    <ul className='flex items-center gap-2 text-black text-[13px] flex-nowrap whitespace-nowrap uppercase font-semibold overflow-hidden w-auto mr-2'>
        <li className=' hover:text-red-800 flex-shrink-0'><Link href='/cities'>News</Link></li>
        <li className=' hover:text-red-800 flex-shrink-0'><Link href='/experiences'>Concepts</Link></li>
        <li className=' hover:text-red-800 flex-shrink-0'><Link href='/experiences'>Arts</Link></li>
        <li className=' hover:text-red-800 flex-shrink-0'><Link href='/experiences'>Heritages</Link></li>
        <li className=' hover:text-red-800 flex-shrink-0'><Link href='/experiences'>Personality</Link></li>
        <li className=' hover:text-red-800 flex-shrink-0'><Link href='/experiences'>Dialogue</Link></li>
        <li className=' hover:text-red-800 flex-shrink-0'><Link href='/experiences'>Projects</Link></li>
        <li className=' hover:text-red-800 flex-shrink-0'><Link href='/experiences'>Student Projects</Link></li>
        <li className=' hover:text-red-800 flex-shrink-0'><Link href='/experiences'>Technology</Link></li>
        <li className=' hover:text-red-800 flex-shrink-0'><Link href='/experiences'>Archive</Link></li>
        <li className=' hover:text-red-800 flex-shrink-0'><Link href='/experiences'>Environment & Planning</Link></li>
    </ul>
</nav>

    {/* Search  */}
    <SearchComponent/>
   </div> 
   <hr className=' border-2 border-black' />
   </div>
   </PaddingContainer>
  
   <div>
    <MobileDrawer />
   </div>

      </div>
  )
}

export default Navigation