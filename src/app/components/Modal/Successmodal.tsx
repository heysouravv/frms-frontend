import React from 'react'

interface SuccessmodalProps {
  label: string;
}

const Successmodal = ({label}: SuccessmodalProps) => {
  return (
    <div  className="flex rounded-l-md absolute right-0 top-5 items-center w-11/12 max-w-xs  bg-[#7cd587] font-primaryOrange" role="alert">
    <div className="p-4  rounded-md text-sm " >
      <span className="font-medium text-lg text-white">{label}</span> 
    </div>

    </div>
  )
}

export default Successmodal