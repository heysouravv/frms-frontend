'use client'
import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { fetchData } from "@/app/utils/api";
// Consider extracting SVGs into separate components if they are reused across the application.
interface TableRowProps {
  product: {
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
}
const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <path d="M8 2v4"></path>
    <path d="M16 2v4"></path>
    <rect width="18" height="18" x="3" y="4" rx="2"></rect>
    <path d="M3 10h18"></path>
  </svg>
);

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.3-4.3"></path>
  </svg>
);






const TableRow = ({ product }: TableRowProps) => {
  
  return (

  <tr className="hover:bg-gray-100 border-t border-[#EAECF0] p-3" key={product.id}>
    <td className="px-4 py-4 font-medium flex items-center gap-x-3">
    <input type="checkbox" className="form-checkbox h-4 w-4 border border-[#D0D5DD] rounded-md  accent-[#FE4F00] "/>
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
)};

const TableHeader = ({ children }: { children: React.ReactNode }) => (
  <th className="h-12 px-4 text-[#475467]  text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
     
      <span className="">{children}</span>
    </th>
);

const Table = ({title,productListUpdated}: {title: string;productListUpdated:boolean}) => {
  const [products, setProducts] = useState<TableRowProps["product"][]>([]);
const [isLoading, setIsLoading] = useState(true);
 
// For Pagination
const itemsPerPage = 5;
const [currentPage, setCurrentPage] = useState(1);
const data: string | any[] = []; // Define the 'data' variable and provide it with a value
const totalPages = Math.ceil(data.length / itemsPerPage);

const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const currentData = data.slice(startIndex, endIndex);

const goToNextPage = () => setCurrentPage((page) => Math.min(page + 1, totalPages));
const goToPreviousPage = () => setCurrentPage((page) => Math.max(page - 1, 1));
const goToFirstPage = () => setCurrentPage(1);
const goToLastPage = () => setCurrentPage(totalPages);

useEffect(() => {
    fetchData(setProducts, setIsLoading).then(() => {
    }).catch((error) => {
      console.error('Error fetching data:', error);
    });
  }, [productListUpdated]);  


  return(
  <div className="w-full  bg-white shadow-lg border-t border-r border-l border-b border-[#D0D5DD] rounded-lg">
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
          {products.map((product) => (
            <TableRow key={product.id} product={product} />
          ))}
        </tbody>
      </table>
    </div>
        <div className="w-full  flex justify-between items-center p-4">
<p>  Page {currentPage} of {totalPages}</p>
<div className="flex items-center gap-x-4">
<p className="px-4 py-2 border border-[#D0D5DD] text-[#344054] rounded-md" onClick={goToNextPage}>Previous</p>
<p className="px-4 py-2 border border-[#D0D5DD] text-[#344054]  rounded-md" onClick={goToLastPage} >Next</p>
</div>
        </div>
  </div>
)};

export default Table;
