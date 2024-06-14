import React from 'react'
  
type PopupProps = {
    close: () => void;
  };
  
 const Createdpopup = ({ close }: PopupProps) => {
        return (
            <div className="flex bg-white max-w-sm shadow-md absolute w-full z-50 rounded-xl translate-x-full translate-y-[20%] px-5 py-5 justify-center flex-col gap-y-5 items-center">
       <div className='flex items-end justify-end w-full '>
       <img src='/assets/Icons/cross.svg' onClick={close} className='cursor-pointer' />

       </div>
         <div>
            <img src="/assets/Icons/ProductCreated.svg" />
         </div>
            <p className='font-semibold text-[#101828] text-xl'>New Product Created</p>
            <p className='text-sm text-center text-[#475467] '>A new product has been successfully created and added to the product list.</p>
            <button type='submit' className="font-semibold w-full  items-center   text-white   rounded-lg text-sm px-4 py-2.5 text-center bg-[#FE4F00]">
                        Continue
                    </button>
    
                    <button onClick={close} className='flex items-center justify-center gap-x-4  text-[#475467]'>
                        <img src="/assets/Icons/leftArrow.svg" />
                        Back to Inventory</button>
            </div>
        );
        
    }

export default Createdpopup