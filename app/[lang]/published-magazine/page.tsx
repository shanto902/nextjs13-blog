import PaddingContainer from '@/components/layout/PaddingContainer'
import Image from 'next/image'
import React from 'react'
import image from "@/assets/number1.png"

const page = () => {
  return (
    <div className=' min-h-[50vh]'>
        <PaddingContainer>
           <div className=' flex flex-row gap-10 items-center'>
            <Image className='flex-1 max-w-[360px]' src={image} alt='image'/>
            <div className='flex-1'>
                <h2>Volume 1</h2>
                <h2>Title</h2>
                <h3>Sub title</h3>
                <p>Description</p>
                <p>আর্কাইভটি সংগ্রহ করতে চাইলে আমাদের সাথে যোগাযোগ করুন</p>
               <form className=' flex flex-col gap-5' action="">
               <input type="text" placeholder="Name" className="input input-bordered w-full max-w-xs" />
                <input type="text" placeholder="Email" className="input input-bordered w-full max-w-xs" />
                <input className=' btn w-fit' type="submit" value="Submit" />
               </form>
            </div>
           </div>
        </PaddingContainer>
    </div>
  )
}

export default page