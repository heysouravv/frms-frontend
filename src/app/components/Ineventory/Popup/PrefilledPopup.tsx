import { makePostRequest, updateProduct } from "@/app/utils/api";
import React, { useEffect, useState } from "react";

import Successmodal from "../../Modal/Successmodal";
import Errormodal from "../../Modal/Errormodal";

const Dropdown = ({
  options,
  selectedOption = "",
  onSelect,
}: {
  options: Array<
    | string
    | number
    | bigint
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | Promise<React.AwaitedReactNode>
    | null
    | undefined
  >;
  selectedOption?: string;
  onSelect: (option: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col w-full justify-start gap-2">
      <button
        onClick={(e) => {e.preventDefault(),setIsOpen(!isOpen)}}
        className="px-4 py-2 w-full text-left relative border border-[#D0D5DD] text-black bg-white rounded"
      >
        {selectedOption}
        <img
          src="/assets/Icons/rightArrowGray.svg"
          className={`absolute top-4 ${
            isOpen
              ? "-rotate-90 transition-all duration-200 ease-in-out"
              : "rotate-90 transition-all duration-200 ease-in-out"
          } right-4 `}
        />
      </button>
      {isOpen && (
        <div className="absolute z-50 mt-2 top-12 w-48 bg-white shadow-lg rounded-lg">
          <ul className="py-1">
            {options.map(
              (
                option:
                  | string
                  | number
                  | bigint
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | Promise<React.AwaitedReactNode>
                  | null
                  | undefined,
                index: React.Key | null | undefined
              ) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    onSelect(option as string);
                    setIsOpen(false);
                  }}
                >
                  {option}
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
};


type SuccessPopup = {
  close: () => void;
};

export const SuccessPopup = ({ close }: SuccessPopup) => {
      return (
        <div className="flex bg-white max-w-sm shadow-md absolute w-full z-50 rounded-xl translate-x-full translate-y-1/2 px-5 py-5 justify-center flex-col gap-y-5 items-center">
        <div className='flex items-end justify-end w-full '>
        <img src='/assets/Icons/cross.svg' onClick={close} className='cursor-pointer' />
 
        </div>
          <div>
             <img src="/assets/Icons/sucess.svg" className="w-20" />
          </div>
             <p className='font-semibold text-[#101828] text-xl'>Product updated successfully</p>
             <p className='text-sm text-center text-[#475467] '>A product has been successfully updated and added to the product list.</p>
             <button type='submit' onClick={close} className="font-semibold w-full  items-center   text-white   rounded-lg text-sm px-4 py-2.5 text-center bg-[#FE4F00]">
                        Continue
                    </button>
             <button onClick={close} className='flex items-center justify-center gap-x-4  text-[#475467]'>
                        <img src="/assets/Icons/leftArrow.svg" />
                        Back to Inventory</button>     
             </div>
      );
      
  }

  type ErrorProps = {
    close: () => void;
  };
  
  export const ErrorModal = ({ close }: ErrorProps) => {
        return (
          <div className="flex bg-white max-w-sm shadow-md absolute w-full z-50 rounded-xl translate-x-full translate-y-1/2 px-5 py-5 justify-center flex-col gap-y-5 items-center">
          <div className='flex items-end justify-end w-full '>
          <img src='/assets/Icons/cross.svg' onClick={close} className='cursor-pointer' />
   
          </div>
            <div>
               <img src="/assets/Icons/error.svg" className="w-20" />
            </div>
               <p className='font-semibold text-[#101828] text-xl'>Some Error Occured</p>
               <p className='text-sm text-center text-[#475467] '>  Try to Relogin, or please try again later</p>
               <button type='submit' onClick={close} className="font-semibold w-full  items-center   text-white   rounded-lg text-sm px-4 py-2.5 text-center bg-[#FE4F00]">
                          Close
                      </button>
          
               </div>
        );
        
    }



type PopupProps = {
  product: 
    {
      id: string;
      name: string;
      hsn_code: string;
      min_order_level: string;
      max_order_level: string;
      tax_percent: string;
      re_order_level: string;
      purchase_rate: string;
      sale_rate: string;
      damage_stock: string;
      empty_stock: string;
      stokable_flag: boolean;
    }
  ; 
  close: () => void;
  productUpdate:()=>void
};

const PrefilledPopup = ({ product,close,productUpdate }: PopupProps) => {

  // Company
  const [selectedOption1, setSelectedOption1] = useState("Select");
  // HSN Code
  const [selectedOption2, setSelectedOption2] = useState(product?.hsn_code);
  // Product Type
  const [selectedOption3, setSelectedOption3] = useState("Select");
  // Rate Included Tax
  const [selectedOption4, setSelectedOption4] = useState("Select");
  // Stockable Flag
  const [selectedOption5, setSelectedOption5] = useState(product?.stokable_flag ? "True" : "False");
  // All the dropdown values
  const options1 = ["Option 1-1", "Option 1-2", "Option 1-3"];
  const options2 = ["123456", "3456", "78910"];
  const options3 = ["Option 3-1", "Option 3-2", "Option 3-3"];
  const options4 = ["Option 3-1", "Option 3-2", "Option 3-3"];
  const options5 = ["True", "False"];

  // Min Order Level, Max Order Level, ReOrder Level
  const [minOrderLevel, setMinOrderLevel] = useState(product?.max_order_level);
  const [maxOrderLevel, setMaxOrderLevel] = useState(product?.min_order_level);
  const [reOrderLevel, setReOrderLevel] = useState(product?.re_order_level);

  // For Product Id and Product name
  const [productId, setProductId] = useState(product?.id);
  const [productName, setProductName] = useState(product?.name);

  // For Damage Stock and Empty Stock
  const [damageStock, setDamageStock] = useState(product?.damage_stock);
  const [emptyStock, setEmptyStock] = useState(product?.empty_stock);

  const [purchaseRate, setPurchaseRate] = useState(product?.purchase_rate);
  const [saleRate, setSaleRate] = useState(product?.sale_rate);
  const [taxPercent, setTaxPercent] = useState(product?.tax_percent);
  const [igstFlag, setIgstFlag] = useState("");
  const [igstPercent, setIgstPercent] = useState("");
  const [sgstPercent, setSgstPercent] = useState("");
  const [cgstPercent, setCgstPercent] = useState("");

  // Check error
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  const [productUpdateStatus,setProductUpdateStatus]=useState<boolean>(false)
 
  const handleUpdateStatus = (isSuccessful: any) => {
    if (isSuccessful) {
      console.log("Product update was successful.");
    } else {
      console.error("Product update failed.");
    }
  };

  
  const handleNextClick = async (e: { preventDefault: () => void; }) => {
    e.preventDefault(); // Prevent the default form submit behavior

    // Prepare the body for the POST request
    const body = {
      name: productName,
      hsn_code: selectedOption2,
      min_order_level: minOrderLevel,
      max_order_level: maxOrderLevel,
      re_order_level: reOrderLevel,
      tax_percent: taxPercent,
      purchase_rate: purchaseRate,
      sale_rate: saleRate,
      damage_stock: damageStock,
      empty_stock: emptyStock,
      stokable_flag: selectedOption5,
      price: 120.0, // Assuming static for the example
      quantity: 50, // Assuming static for the example
    };

    try {
      // Attempt to update the product
      const response: Response = await updateProduct(productId, body, handleUpdateStatus);
    
      // Check if the update was successful
    
      if (response.status === 200) {
        close() //Close the modal
        // Handle success scenario
    setShowSuccess(true);
    console.log("Product update was successful.")
        // For example, update UI or state to reflect the successful update
        setProductUpdateStatus(true); // Assuming a state setter function exists
        // Optionally, you might want to navigate the user to a different page or show a success message
      } else {
        setShowError(true);
        console.log("Product update failed.")
        setErrorMessage("Product update failed. Please try again."); // Assuming a state setter function exists
        close() //Close the modal
        // Handle error scenario
        // This could involve setting an error state, displaying an error message, etc.
        setProductUpdateStatus(false); // Assuming a state setter function exists
      }
    } catch (error) {
      // Handle any errors that occurred during the update process
      setShowError(true);
      setErrorMessage("Product update failed. Please try again."); // Assuming a state setter function exists
      close() //Close the modal
      setProductUpdateStatus(false); // Assuming a state setter function exists
      console.error(error); // Log the error
    }
  };



  useEffect(() => {
    console.log(productUpdateStatus,"this is product update status")
  },[productUpdateStatus])
  return (

    
    <div
    tabIndex={-1}
    aria-hidden="true"
    className={` overflow-hidden z-50 absolute   justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full `}
    >


      <div className={`${productUpdateStatus ? "hidden" :""} relative right-64`}>
      </div>
      {showSuccess ? <SuccessPopup close={() => setShowSuccess(false)} /> : showError ? <ErrorModal close={()=>setShowError(false)} />  
      :   

        <form className="relative lg:translate-x-1/3 xl:translate-x-11/12 xl:max-w-xl 2xl:max-w-lg w-full lg:translate-y-5  xl:translate-y-5 bg-white rounded-lg shadow "  onSubmit={handleNextClick}>
          <div className="flex items-center justify-between p-4 md:p-5  ">
            <h3 className="text-lg font-semibold text-[#101828]">
              Create New Product
            </h3>

            <button
              type="button"
              onClick={close}
              className="text-gray-400 bg-transparent   rounded-lg text-sm  ms-auto inline-flex justify-center items-center "
              data-modal-toggle="crud-modal"
            >
              <img src="/assets/Icons/cross.svg" className="w-4 h-4" />
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="w-full flex justify-start items-start flex-col gap-y-2 px-5">
            <div className="w-full flex justify-start gap-x-4 items-center flex-row">
              <div className="flex flex-col justify-start gap-2">
                <label className="font-medium text-black  text-sm">
                  Product Id<span className="text-red-600">*</span>
                </label>
              
                <input
                  type="text"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  placeholder="PRD0001"
                  className="p-2 placeholder:text-[#667085] font-medium text-black w-40 rounded-md bg-white border border-[#D0D5DD]"
                />
              
              </div>
              <div className="flex flex-col w-full justify-start gap-2">
                <label className="font-medium text-black  text-sm">
                  Product Name<span className="text-red-600">*</span>
                </label>
              
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Enter Name here"
                  className="placeholder:text-[#667085] font-medium text-black p-2 rounded-md bg-white border border-[#D0D5DD]"
                />
             
              </div>
            </div>

            <div className="flex flex-row items-center w-full gap-x-3 justify-between relative">
              <div className="flex flex-col justify-start w-full gap-2">
                <label className="font-medium text-sm">Company</label>
                <Dropdown
                  options={options1}
                  selectedOption={selectedOption1}
                  onSelect={setSelectedOption1}
                />
              </div>

              <div className="flex flex-col w-full justify-start gap-2">
                <label className="font-medium text-sm">HSN Code</label>

                <Dropdown
                  options={options2}
                  selectedOption={selectedOption2}
                  onSelect={setSelectedOption2}
                />
              </div>

              <div className="flex flex-col w-full justify-start gap-2">
                <label className="font-medium  text-sm">Product Type</label>
                <Dropdown
                  options={options3}
                  selectedOption={selectedOption3}
                  onSelect={setSelectedOption3}
                />
              </div>
            </div>

            <div className="w-full grid grid-cols-3 gap-x-4 items-center flex-row">
              <div className="flex flex-col justify-start gap-2">
                <label className="font-medium text-black  text-sm">
                  Min. Order Level
                </label>
                <input
                  type="text"
                  value={minOrderLevel}
                  required
                  onChange={(e) => setMinOrderLevel(e.target.value)}
                  className="p-2 placeholder:text-[#667085] font-medium w-full text-black  rounded-md bg-white border border-[#D0D5DD]"
                />
              </div>
              <div className="flex flex-col w-full justify-start gap-2">
                <label className="font-medium text-black  text-sm">
                  Max. Order Level
                </label>
                <input
                  type="text"
                  required
                  value={maxOrderLevel}
                  onChange={(e) => setMaxOrderLevel(e.target.value)}
                  className="placeholder:text-[#667085] font-medium w-full text-black p-2 rounded-md bg-white border border-[#D0D5DD]"
                />
              </div>
              <div className="flex flex-col w-full justify-start gap-2">
                <label className="font-medium text-black  text-sm">
                  Re-Order Level
                </label>
                <input
                  type="text"
                  value={reOrderLevel}
                  required
                  onChange={(e) => setReOrderLevel(e.target.value)}
                  className="placeholder:text-[#667085] font-medium w-full text-black p-2 rounded-md bg-white border border-[#D0D5DD]"
                />
              </div>
            </div>

            <div className="w-full grid grid-cols-3 gap-x-4 items-center flex-row">
              <div className="flex flex-col justify-start gap-2">
                <label className="font-medium text-black  text-sm">
                  Purchase Rate
                </label>
                <input
                  type="text"
                  value={purchaseRate}
                  required
                  onChange={(e) => setPurchaseRate(e.target.value)}
                  className="p-2 placeholder:text-[#667085] font-medium w-full text-black  rounded-md bg-white border border-[#D0D5DD]"
                />
              </div>
              <div className="flex flex-col w-full justify-start gap-2">
                <label className="font-medium text-black  text-sm">
                  Sale Rate
                </label>
                <input
                  type="text"
                  value={saleRate}
                  required
                  onChange={(e) => setSaleRate(e.target.value)}
                  className="placeholder:text-[#667085] font-medium w-full text-black p-2 rounded-md bg-white border border-[#D0D5DD]"
                />
              </div>
              <div className="flex flex-col w-full justify-start gap-2">
                <label className="font-medium text-black  text-sm">Tax %</label>
                <input
                  type="text"
                  value={taxPercent}
                  required
                  onChange={(e) => setTaxPercent(e.target.value)}
                  className="placeholder:text-[#667085] font-medium w-full text-black p-2 rounded-md bg-white border border-[#D0D5DD]"
                />
              </div>
            </div>

            <div className="w-full grid grid-cols-4 gap-x-4 items-center flex-row">
              <div className="flex flex-col justify-start gap-2">
                <label className="font-medium text-black  text-sm">
                  IGST Flag
                </label>
                <input
                  type="text"
                  value={igstFlag}
                  onChange={(e) => setIgstFlag(e.target.value)}
                  className="p-2 placeholder:text-[#667085] font-medium w-full text-black  rounded-md bg-white border border-[#D0D5DD]"
                />
              </div>
              <div className="flex flex-col w-full justify-start gap-2">
                <label className="font-medium text-black  text-sm">
                  IGST %
                </label>
                <input
                  type="text"
                  value={igstPercent}
                  onChange={(e) => setIgstPercent(e.target.value)}
                  className="placeholder:text-[#667085] font-medium w-full text-black p-2 rounded-md bg-white border border-[#D0D5DD]"
                />
              </div>
              <div className="flex flex-col w-full justify-start gap-2">
                <label className="font-medium text-black  text-sm">
                  SGST %
                </label>
                <input
                  type="text"
                  value={sgstPercent}
                  onChange={(e) => setSgstPercent(e.target.value)}
                  className="placeholder:text-[#667085] font-medium w-full text-black p-2 rounded-md bg-white border border-[#D0D5DD]"
                />
              </div>
              <div className="flex flex-col w-full justify-start gap-2">
                <label className="font-medium text-black  text-sm">
                  CGST %
                </label>
                <input
                  type="text"
                  value={cgstPercent}
                  onChange={(e) => setCgstPercent(e.target.value)}
                  className="placeholder:text-[#667085] font-medium w-full text-black p-2 rounded-md bg-white border border-[#D0D5DD]"
                />
              </div>
            </div>

            <div className="w-full grid grid-cols-3 gap-x-4 items-center flex-row">
              <div className="flex flex-col relative justify-start gap-2">
                <label className="font-medium text-black relative text-sm">
                  Rate Included Tax
                </label>
                <Dropdown
                  options={options4}
                  selectedOption={selectedOption4}
                  onSelect={setSelectedOption4}
                />
              </div>
              <div className="flex flex-col w-full justify-start gap-2">
                <label className="font-medium text-black  text-sm">
                  Damage Stock
                </label>
                <input
                  value={product.damage_stock}
                  onChange={(e) => setDamageStock(e.target.value)}
                  type="text"
                  className="placeholder:text-[#667085] font-medium w-full text-black p-2 rounded-md bg-white border border-[#D0D5DD]"
                />
              </div>
              <div className="flex flex-col w-full justify-start gap-2">
                <label className="font-medium text-black  text-sm">
                  Empty Stock
                </label>
                <input
                  type="text"
                  value={product.empty_stock}
                  onChange={(e) => setEmptyStock(e.target.value)}
                  className="placeholder:text-[#667085] font-medium w-full text-black p-2 rounded-md bg-white border border-[#D0D5DD]"
                />
              </div>
            </div>

            <div className="w-full grid grid-cols-2 gap-x-4 items-center flex-row">
              <div className="flex flex-col relative justify-start gap-2">
                <label className="font-medium text-black relative text-sm">
                  Empty Flag
                </label>
                <Dropdown
                  options={options4}
                  selectedOption={selectedOption4}
                  onSelect={setSelectedOption4}
                />
              </div>
              <div className="flex flex-col relative w-full justify-start gap-2">
                <label className="font-medium text-black  text-sm">
                  Stockable Flag<span className="text-red-500">*</span>
                </label>
                <Dropdown
                  options={options5}
                  selectedOption={selectedOption5}
                  onSelect={setSelectedOption5}
                />
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between items-center gap-x-4 px-5 py-6">
            <button
              onClick={close}
              className="font-semibold w-full  items-center  border border-[#D0D5DD] text-[#667085]    rounded-lg text-sm px-4 py-2.5 text-center bg-white"
            >
              Cancel
            </button>
            <button
        
              type="submit"
              className="font-semibold w-full  items-center   text-white   rounded-lg text-sm px-4 py-2.5 text-center bg-[#FE4F00]"
            >
              Next
            </button>
          </div>
        </form>

      }
    </div>
  );
};

export default PrefilledPopup;
