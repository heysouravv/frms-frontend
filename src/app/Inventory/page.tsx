import React from "react";
import Table from "../components/Ineventory/Table/Table";

const page = () => {
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

  return (
    // Main Div
    <div className="p-8 flex justify-start flex-col gap-y-3 items-start w-full">
      {/* Breadcrumb */}
      <div className="flex justify-start items-center gap-x-5">
        <img src="/assets/Icons/HomeGray.svg" className="w-5" />
        <img src="/assets/Icons/rightArrowLightGray.svg" className="w-2" />
        <p className="text-sm font-medium text-[#475467]">Dashboard</p>
        <img src="/assets/Icons/rightArrowLightGray.svg" className="w-2" />
        <p className="font-primaryOrange px-2 py-2 font-medium rounded-md bg-[#FFF1EB]">
          Inventory
        </p>
      </div>

      {/* Inventory Management */}
      <div className="flex justify-between  items-center w-full">
        <div>
          <p className="font-semibold lg:text-2xl text-[#101828]">
            Inventory and Stock Management
          </p>
        </div>

        <div className="flex items-center gap-x-4">
          <button className="flex items-center gap-x-4 bg-white border border-[#D0D5DD] rounded-lg px-4 py-3">
            <img src="/assets/Icons/importFileIcon.svg" className="w-5" />
            <p className="text-[#344054] font-semibold">Import Products</p>
          </button>

          <button className="flex items-center gap-x-4 bg-primaryOrange  rounded-lg px-4 py-3">
            <img src="/assets/Icons/plusWhite.svg" className="w-5" />
            <p className="text-white font-semibold">New Add Products</p>
          </button>
        </div>
      </div>

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
        <Table />
      </div>
    </div>
  );
};

export default page;
