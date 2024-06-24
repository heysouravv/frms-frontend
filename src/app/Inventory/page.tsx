'use client'
import React, { useState } from "react";
import Table from "../components/Ineventory/Table/Table";
import Popup from "../components/Ineventory/Popup/Popup";
import Createdpopup from "../components/Ineventory/Popup/CreatedPopup";
import InventoryHeader from "../components/Header/InventoryHeader";



const page = () => {
  const [showProductPopup, setShowProductPopup] = useState(false);
  const [showCreatedPopup, setShowCreatedPopup] = useState(false);
  const [productListUpdated, setProductListUpdated] = useState(false);


  const productDetails = [
    {
      title: "Product Rate Details",
      description: "Gain insights into your product rates",
    },
    {
      title: "Product Stock",
      description: "Gain insights into your Stock",
    },
    {
      title: "Product Discount",
      description: "Gain insights into the discount offered",
    },
  ];

  // Header Buttons
  const buttons = [
    {
      iconPath: "/assets/Icons/importFileIcon.svg",
      text: "Import Products",
      onClick:()=>console.log("Button Cicked"),
      className: "bg-white border border-[#D0D5DD] rounded-lg px-4 py-3 text-[#344054]",
    },
    {
      iconPath: "/assets/Icons/plusWhite.svg",
      text: "New Add Products",
      onClick: () => setShowProductPopup(!showProductPopup),
      className: "bg-primaryOrange rounded-lg px-4 py-3 text-white",
    },
  ];


  const handleProductUpdate = () => {
    setProductListUpdated(prev => !prev); // Toggle to trigger useEffect in Table
  };

  const handleCancel = () => {
    setShowProductPopup(false);
  };

  const handleNext = () => {
    setShowProductPopup(false);
    setShowCreatedPopup(true);
  };
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

  return (

// Main DIv
    <div className={` no-scrollbar   p-4 flex justify-start relative flex-col gap-y-3 items-start w-full`}>
      {/* Breadcrumb */}
      <div className="flex justify-start items-center gap-x-5">
        <img src="/assets/Icons/HomeGray.svg" className="w-5" />
        <img src="/assets/Icons/rightArrowLightGray.svg" className="w-2" />
        <p className="text-sm font-medium text-[#475467]">Dashboard</p>
        <img src="/assets/Icons/rightArrowLightGray.svg" className="w-2" />
        <p className="font-primaryOrange px-2 text-sm py-2 font-medium rounded-md bg-[#FFF1EB]">
          Inventory
        </p>
      </div>
      {(showProductPopup || showCreatedPopup) && <Overlay />}
       {/* Inventory Management  */}
        <InventoryHeader titleLabel="Inventory and Stock Management" showProductPopup={showProductPopup} setShowProductPopup={setShowProductPopup} buttons={buttons} />
   
   
      {showProductPopup && <Popup close={handleCancel} next={handleNext} onProductCreated={handleProductUpdate} />}
      {showCreatedPopup && <Createdpopup close={() => setShowCreatedPopup(false)} />}
      {/* Quick Access */}

      <div className="flex justify-start items-start gap-y-3 flex-col w-full">
        <div className="flex justify-between items-center w-full py-3">
          <div>
            <p className="font-[#101828] font-semibold text-lg">Quick Access</p>
          </div>
          <div className="flex justify-center items-center gap-x-3">
            <p className="font-primaryOrange font-medium text-sm">See all</p>
            <img src="/assets/Icons/rightArrowOrange.svg" className="w-2" />
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 place-content-start w-full">
          {productDetails.map((detail) => (
            <div className="flex justify-between bg-white border border-[#DADBDF] rounded-md px-5 py-5 w-full items-center flex-row">
              <div className="flex justify-start gap-1 items-start flex-col">
                <p className="text-base font-semibold font-primaryOrange">
                  {detail.title}
                </p>
                <p className="text-sm font-medium">{detail.description}</p>
              </div>
              <div>
                <img src="/assets/Icons/rightArrowOrange.svg" className="w-2" />
              </div>
            </div>
          ))}
        </div>
        <Table title="All Products" productListUpdated={productListUpdated} productUpdate={handleProductUpdate} />
      </div>
    </div>
  );
};

export default page;
