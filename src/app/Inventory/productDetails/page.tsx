'use client'
import NewProductRates from '@/app/components/Ineventory/Popup/NewProductRates';

import Table from '@/app/components/Ineventory/Table/Table';
import Link from 'next/link';
import React, { useState } from 'react'

const page = () => {

  const Overlay = () => {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
overflow:"hidden",
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        zIndex: 10 // Ensure this is below your popup z-index but above everything else
      }}></div>
    );
  };

const [showProductRatePopup, setShowProductRatePopup] = useState(false);


    return (
    <div className={`no-scrollbar p-4 flex justify-start relative flex-col gap-y-3 items-start w-full`}>
{/* Breadcrumb */}
<Link href={'/Inventory'} className='cursor-pointer flex items-center gap-x-3 justify-start w-full'>
<img src='/assets/Icons/leftOrange.svg' />
<p className='font-primaryOrange font-semibold text-sm'>Back to Inventory</p>
</Link>

         <div className="flex justify-start items-center gap-x-5">
        <img src="/assets/Icons/HomeGray.svg" className="w-5" />
        <img src="/assets/Icons/rightArrowLightGray.svg" className="w-2" />
        <p className="text-sm font-medium font-inter text-[#475467]">Dashboard</p>
        <img src="/assets/Icons/rightArrowLightGray.svg" className="w-2" />
        <p className="font-primaryOrange text-sm  font-inter px-2 py-2 font-medium rounded-md bg-[#FFF1EB]">
          Inventory
        </p>
        <img src="/assets/Icons/rightArrowLightGray.svg" className="w-2" />
        <p className="text-black  text-sm font-inter px-2 py-2 font-medium rounded-md ">
        Product Rate Details
        </p>
      </div>
{(showProductRatePopup) && <Overlay />}
             {/* Inventory Management  */}
             <div className="flex justify-between  items-center w-full">
        <div>
          <p className="font-semibold lg:text-2xl text-[#101828]">
          Product Rate Details
          </p>
        </div>

        <div className="flex items-center gap-x-4">
          <button className="flex items-center gap-x-4 bg-white border border-[#D0D5DD] rounded-lg px-4 py-3">
            <img src="/assets/Icons/importFileIcon.svg" className="w-5" />
            <p className="text-[#344054] font-semibold">Export CSV</p>
          </button>

          <button onClick={()=>setShowProductRatePopup(!showProductRatePopup)} className="flex items-center gap-x-4 bg-primaryOrange  rounded-lg px-4 py-3">
            <img src="/assets/Icons/plusWhite.svg" className="w-5" />
            <p className="text-white font-semibold">Add New</p>
          </button>
        </div>
      </div>
      {showProductRatePopup && <NewProductRates close={()=>setShowProductRatePopup(false)} />}
        <Table title="All Products Rate Details"/>
        
    </div>
  )
}

export default page