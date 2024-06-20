import React from 'react'

const Errormodal = ({label}: {label: string}) => {
  return (
<div  className="flex rounded-l-md absolute right-0 top-5 items-center w-full max-w-xs  bg-[#FFF1EB] font-primaryOrange" role="alert">
<div className="p-4  rounded-md text-sm " role="alert">
  <span className="font-medium text-lg">{label}</span> 
</div>
</div>
  )
}

export default Errormodal