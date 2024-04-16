import Image from 'next/image'
import React from 'react'


const Bottom = () => {
    return (
        <div className="container w-full mx-auto  ">
            <div className="border-b-3 border-dotted border-gray-500 pb-30 " id="top">
                <div className="container-fluid">
                    <div className="flex flex-wrap">
                        <div className="lg:w-1/2">
                            <div className="left-content">
                                <div className="thumb">
                                    <div className="absolute p-10 xl:p-20  ">
                                        <h4 className='text-white mt-[-10px]
                                        text-lg xl:text-4xl font-bold mb-20 p-5 bg-black'></h4>
                                        
                                    </div>
                        <Image src="/foto4.png" 
                        alt="banner" 
                        width={700} height={600}
                        className='overflow-hidden w-full'
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"      
                        />
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/2">
                            <div className="right-content">
                                <div className="flex flex-wrap">
                                    <div className="lg:w-1/2">
                           <div className="right-first-image">
                     <div className="relative m-1  cursor-pointer hover:visible">
         
             <Image src="/foto3.jpg" alt='banner1' width={500} height={250} 
             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
             className='min-h-[250px] max-h-[250px]'/>
                                                <div className="absolute inset-0 p-6">
                  <h3 className=" text-lg xl:text-2xl capitalize font-bold text-black">{/* text here */}</h3>
                                 
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="lg:w-1/2">
                                        <div className="right-first-image">
                                            <div className="relative m-1">
       <Image src="/foto2.jpg" alt='banner2'width={500} height={250}
       className='min-h-[250px] max-h-[250px] 
       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"'/>
                                                <div className="absolute inset-0 p-6 ">
         <h3 className="text-lg xl:text-2xl capitalize font-bold text-black"></h3>
                                 
                                                </div>
                                            </div>
                                        </div>
                                    </div>
      <div className="lg:w-full">
          <div className="right-first-image">
                  <div className="relative m-1">
        <Image src="/foto6.jpg" 
          alt='banner' width={768} height={200}
          className='max-h-[200px] xl:min-h-[200px] xl:max-h-[200px]'
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
                     <div className="absolute inset-0 p-6">
                  {/* some text here */}
                     
                           </div>
                           </div>
                           </div>
                         </div>
                       </div>
                </div>
           </div>
        </div>
     </div>
    </div>
  </div >
    )
}

export default Bottom
