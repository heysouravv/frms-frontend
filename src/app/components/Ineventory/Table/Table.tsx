// @ts-nocheck
"use client";
import React, { Key, useEffect, useState } from "react";
import { fetchData, fetchTrackChangeData } from "@/app/utils/api";
import PrefilledPopup from "../Popup/PrefilledPopup";

// Consider extracting SVGs into separate components if they are reused across the application.
const SuccessPopup: React.FC<{ close: () => void }> = ({ close }) => {
  return (
    <div className="flex bg-white max-w-sm shadow-md absolute w-full z-50 rounded-xl translate-x-full translate-y-1/2 px-5 py-5 justify-center flex-col gap-y-5 items-center">
      <div className="flex items-end justify-end w-full">
        <img
          src="/assets/Icons/cross.svg"
          onClick={close}
          className="cursor-pointer"
        />
      </div>
      <div>
        <img src="/assets/Icons/sucess.svg" className="w-20" />
      </div>
      <p className="font-semibold text-[#101828] text-xl">
        Product updated successfully
      </p>
      <p className="text-sm text-center text-[#475467] ">
        A product has been successfully updated and added to the product list.
      </p>
      <button
        type="submit"
        className="font-semibold w-full  items-center   text-white   rounded-lg text-sm px-4 py-2.5 text-center bg-[#FE4F00]"
      >
        Continue
      </button>
      <button
        onClick={close}
        className="flex items-center justify-center gap-x-4  text-[#475467]"
      >
        <img src="/assets/Icons/leftArrow.svg" />
        Back to Inventory
      </button>
    </div>
  );
};

type ErrorProps = {
  close: () => void;
};

const ErrorModal = ({ close }: ErrorProps) => {
  return (
    <div className="flex bg-white max-w-sm shadow-md absolute w-full z-50 rounded-xl translate-x-full translate-y-1/2 px-5 py-5 justify-center flex-col gap-y-5 items-center">
      <div className="flex items-end justify-end w-full ">
        <img
          src="/assets/Icons/cross.svg"
          onClick={close}
          className="cursor-pointer"
        />
      </div>
      <div>
        <img src="/assets/Icons/error.svg" className="w-20" />
      </div>
      <p className="font-semibold text-[#101828] text-xl">Some Error Occured</p>
      <p className="text-sm text-center text-[#475467] ">
        {" "}
        Try to Relogin, or please try again later
      </p>
      <button
        type="submit"
        onClick={close}
        className="font-semibold w-full  items-center   text-white   rounded-lg text-sm px-4 py-2.5 text-center bg-[#FE4F00]"
      >
        Close
      </button>
    </div>
  );
};

interface TableRowProps {
  product: {
    damage_stock: string;
    empty_stock: string;
    stokable_flag: boolean;
    effective_date: string;
    price: string;
    product: Key;
    min_order_level: number;
    max_order_level: number;
    re_order_level: number;
    purchase_rate: string;
    sale_rate: string;
    hsn_code: string;
    name: string;
    id: number;
    hsnCode: string;
    type: string;
    taxPerc: string;
  };
  onClick: React.MouseEventHandler<HTMLTableRowElement> | undefined;
}

const TableRow = ({ product, onClick }: TableRowProps) => {
  return (
    <tr
      className="hover:bg-gray-100 border-t border-[#EAECF0] p-3"
      onClick={onClick}
      key={product.id}
    >
      <td className="px-4 py-4 font-medium flex items-center gap-x-3">
        <input
          type="checkbox"
          className="form-checkbox h-4 w-4 border border-[#D0D5DD] rounded-md  accent-[#FE4F00] "
        />
        {product.name}
      </td>
      <td className="px-4 py-4 text-[#475467]">{product.id}</td>
      <td className="px-4 py-4 text-[#475467]">{product.hsn_code}</td>
      <td className="px-4 py-4 text-[#475467]">{product.name}</td>
      <td className="px-4 py-4 text-[#475467]">{product.min_order_level}</td>
      <td className="px-4 py-4 text-[#475467]">{product.max_order_level}</td>
      <td className="px-4 py-4 text-[#475467]">{product.re_order_level}</td>
      <td className="px-4 py-4 text-[#475467]">{product.purchase_rate}</td>
      <td className="px-4 py-4 text-[#475467]">{product.sale_rate}</td>
      {/* Dummy For Now */}
      <td className="px-4 py-4 text-[#475467]">10%</td>
    </tr>
  );
};

const TableRowTrack = ({ product }: TableRowProps) => {
  return (
    <tr
      className="hover:bg-gray-100 border-t border-[#EAECF0] p-3"
      key={product.id}
    >
      <td className="px-4 py-4 font-medium flex items-center gap-x-3">
        <input
          type="checkbox"
          className="form-checkbox h-4 w-4 border border-[#D0D5DD] rounded-md  accent-[#FE4F00] "
        />
        {product.id}
      </td>
      <td className="px-4 py-4 text-[#475467]">{product.id}</td>
      <td className="px-4 py-4 text-[#475467]">{product.price}</td>
      <td className="px-4 py-4 text-[#475467]">{product.effective_date}</td>
    </tr>
  );
};

const TableHeader = ({ children }: { children: React.ReactNode }) => (
  <th className="h-12 px-4 text-[#475467]  text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
    <span className="">{children}</span>
  </th>
);

const Table = ({
  title,
  productListUpdated,
  productUpdate,
}: {
  title: string;
  productListUpdated: boolean;
  productUpdate: () => void;
}) => {
  const [products, setProducts] = useState<TableRowProps["product"][]>([]);
  const [trackRateProducts, setTrackRateProducts] = useState<
    TableRowProps["product"][]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  // For Pagination
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const data: string | any[] = []; // Define the 'data' variable and provide it with a value
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const goToNextPage = () =>
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  const goToLastPage = () => setCurrentPage(totalPages);

  useEffect(() => {
    fetchData(setProducts, setIsLoading)
      .then(() => {})
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    fetchTrackChangeData(setTrackRateProducts, setIsLoading).then(
      (response) => {
        console.log(response);
      }
    );
    console.log("Product List Updated", trackRateProducts);
  }, [productListUpdated]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<TableRowProps>(
    {} as TableRowProps
  );

  const handleRowClick = (product1: TableRowProps) => {
    setSelectedProduct(product1);
    setIsModalOpen(true);
  };

  // For overlay
  const Overlay = () => {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          overflowY: "hidden",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          zIndex: 10, // Ensure this is below your popup z-index but above everything else
        }}
      ></div>
    );
  };

  console.log("selected Products", selectedProduct);
  // Basic Pop in animation
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(true);

  const handleShowSuccessModal = (isSuccess: boolean) => {
    setShowSuccessModal(isSuccess);
    setShowErrorModal(isSuccess);
  };

  return (
    <div className="w-full  bg-white shadow-lg border-t border-r border-l border-b border-[#D0D5DD] rounded-lg">
      {showSuccessModal && (
        <SuccessPopup close={() => setShowSuccessModal(false)} />
      )}
      {(showSuccessModal || !showErrorModal) && <Overlay />}
      
      {!showErrorModal && <ErrorModal close={() => setShowErrorModal(true)} />}
      <div className="flex justify-between bg-white  px-5 py-5 rounded-lg rounded-b-none  border-b border-b-[#D0D5DD]  items-center w-full ">
        {/* All products */}
        <div>
          <p className="text-black font-semibold text-lg">{title}</p>
        </div>

        {/* Filter, dates and search */}
        <div className="flex flex-row justify-center items-center gap-x-4">
          <button className=" flex items-center gap-x-2 bg-white border py-[10px] px-4  rounded-md border-[#D0D5DD] font-semibold text-[#344054]">
            <img src="/assets/Icons/filter.svg" />
            Filters
          </button>
          <button className=" flex items-center gap-x-2 bg-white border py-[10px] px-4  rounded-md border-[#D0D5DD] font-semibold text-[#344054]">
            <img src="/assets/Icons/calendar.svg" />
            Select Dates
          </button>

          <div className="">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.5 16.5L13.5834 13.5833M15.6667 8.58333C15.6667 12.4954 12.4954 15.6667 8.58333 15.6667C4.67132 15.6667 1.5 12.4954 1.5 8.58333C1.5 4.67132 4.67132 1.5 8.58333 1.5C12.4954 1.5 15.6667 4.67132 15.6667 8.58333Z"
                    stroke="#667085"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full  py-[10px] px-4 ps-10 text-sm text-gray-900 border border-[#D0D5DD] rounded-md bg-white focus:ring-transparent placeholder:text-[#667085] placeholder:font-normal "
                placeholder="Search for Products"
                required
              />
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-full overflow-auto bg-white custom-scrollbar ">
        {title === "All Products" && (
          <table className="caption-bottom text-sm overflow-scroll h-[calc(100%-200px)] lg:w-[calc(100%+100px)] custom-scrollbar">
            <thead className="[&_tr]:border-b w-full">
              <tr className="border-b bg-[#F9FAFB] transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <TableHeader>
                  <span className="flex items-center gap-x-3">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 border border-[#D0D5DD] rounded-md accent-[#FE4F00]"
                    />
                    Product Name
                  </span>
                </TableHeader>
                <TableHeader>Product ID</TableHeader>
                <TableHeader>HSN Code</TableHeader>
                <TableHeader>Product type</TableHeader>
                <TableHeader>Min Order Lvl</TableHeader>
                <TableHeader>Max Order Lvl</TableHeader>
                <TableHeader>Reorder Lvl</TableHeader>
                <TableHeader>Purch Rate</TableHeader>
                <TableHeader>Sale Rate</TableHeader>
                <TableHeader>Tax Perc</TableHeader>
              </tr>
            </thead>
            <tbody>
              {products.map((product1) => (
                <TableRow
                  key={product1.id}
                  product={product1}
                  onClick={() => handleRowClick(product1)}
                />
              ))}
            </tbody>
          </table>
        )}
        {title === "All Products Rate Details" && (
          <table className="caption-bottom text-sm overflow-scroll h-[calc(100%-200px)] lg:w-full custom-scrollbar">
            <thead className="[&_tr]:border-b w-full">
              <tr className="border-b bg-[#F9FAFB]  w-full">
                <TableHeader>
                  <span className="flex items-center gap-x-3">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 border border-[#D0D5DD] rounded-md accent-[#FE4F00]"
                    />
                    Product Id
                  </span>
                </TableHeader>
                <TableHeader>Price</TableHeader>
                <TableHeader>Product type</TableHeader>
                <TableHeader>Date</TableHeader>
              </tr>
            </thead>
            <tbody>
              {trackRateProducts.map((product) => (
                <TableRowTrack
                  key={product.id}
                  product={product}
                  onClick={undefined}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
      {isModalOpen && <Overlay />}
      {isModalOpen && (
        <PrefilledPopup
          isOpen={isModalOpen}
          close={() => setIsModalOpen(false)}
          setIsOpen={setIsModalOpen}
          updateProduct={productUpdate}
          product={selectedProduct}
          handleShowSuccessModal={handleShowSuccessModal}
        />
      )}
      <div className="w-full  flex justify-between items-center p-4">
        <p>
          Page {currentPage} of {totalPages}
        </p>
        <div className="flex items-center gap-x-4">
          <p
            className="px-4 py-2 border border-[#D0D5DD] text-[#344054] rounded-md"
            onClick={goToNextPage}
          >
            Previous
          </p>
          <p
            className="px-4 py-2 border border-[#D0D5DD] text-[#344054]  rounded-md"
            onClick={goToLastPage}
          >
            Next
          </p>
        </div>
      </div>
    </div>
  );
};

export default Table;
