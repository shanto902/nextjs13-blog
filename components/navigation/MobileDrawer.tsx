import Image from 'next/image'
import React from 'react'
import logo from '@/assets/logo-nav.png'
import { MenuIcon } from 'lucide-react'

const MobileDrawer = () => {
  return (
    <div className=' xl:hidden flex justify-center items-center  bg-[#F2F2F2] py-2 w-full relative h-20'>

    <Image  src={logo} alt='logo' width={60} height={60} />
     <div className='absolute top-4 right-5'>
     <div className="drawer drawer-end w-full ">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content  px-2 py-2 ">
        {/* Page content here */}
        <label htmlFor="my-drawer" className=" drawer-button cursor-pointer hover:text-red-700 "><MenuIcon height={40} width={40}/></label>
      </div> 
      <div className="drawer-side drawer-end">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
      
        <div className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
        <Image  src={logo} alt='logo' width={60} height={60} />
          {/* Sidebar content here */}
          <li><a>Sidebar Item 1</a></li>
          <li><a>Sidebar Item 2</a></li>
          
        </div>
      </div>
    </div>
     </div>
       </div>
  )
}

export default MobileDrawer;