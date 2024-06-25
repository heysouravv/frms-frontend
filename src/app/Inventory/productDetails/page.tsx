'use client'
import InventoryHeader from '@/app/components/Header/InventoryHeader';
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

const buttons = [
  {
    iconPath: "/assets/Icons/importFileIcon.svg",
    text: "Export CSV",
    onClick:()=>console.log("Button Cicked"),
    className: "bg-white border border-[#D0D5DD] rounded-lg px-4 py-3 text-[#344054]",
  },
  {
    iconPath: "/assets/Icons/plusWhite.svg",
    text: "Add New",
    onClick:()=>setShowProductRatePopup(!showProductRatePopup),
    className: "bg-primaryOrange rounded-lg px-4 py-3 text-white",
  },
];



    return (
    <div className={` no-scrollbar h-screen  p-4 flex justify-start relative flex-col gap-y-3 items-start w-full`}>
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

<InventoryHeader titleLabel="   Product Rate Details" showProductPopup={showProductRatePopup} setShowProductPopup={setShowProductRatePopup} buttons={buttons} />

      {showProductRatePopup && <NewProductRates close={()=>setShowProductRatePopup(false)} />}
        <Table title="All Products Rate Details" productUpdate={()=>undefined}  productListUpdated={true} />
        
    </div>
  )
}

export default page