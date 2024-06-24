import { makePostRequest } from "@/app/utils/api";
import React, { useState } from "react";
import Errormodal from "../../Modal/Errormodal";
import { motion, AnimatePresence } from 'framer-motion';
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
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };
  return (
    <div 
    
    className="flex flex-col w-full justify-start gap-2">
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

type PopupProps = {
  close: () => void;
  next: () => void;
  onProductCreated: ()=>void;

};

const Popup = ({ close, next,onProductCreated }: PopupProps) => {
  // Company
  const [selectedOption1, setSelectedOption1] = useState("Select");
  // HSN Code
  const [selectedOption2, setSelectedOption2] = useState("Select");
  // Product Type
  const [selectedOption3, setSelectedOption3] = useState("Select");
  // Rate Included Tax
  const [selectedOption4, setSelectedOption4] = useState("Select");
  // Stockable Flag
  const [selectedOption5, setSelectedOption5] = useState("Select");
  // All the dropdown values
  const options1 = ["Option 1-1", "Option 1-2", "Option 1-3"];
  const options2 = ["123456", "3456", "78910"];
  const options3 = ["Option 3-1", "Option 3-2", "Option 3-3"];
  const options4 = ["Option 3-1", "Option 3-2", "Option 3-3"];
  const options5 = ["True", "False"];

  // Min Order Level, Max Order Level, ReOrder Level
  const [minOrderLevel, setMinOrderLevel] = useState("");
  const [maxOrderLevel, setMaxOrderLevel] = useState("");
  const [reOrderLevel, setReOrderLevel] = useState("");

  // For Product Id and Product name
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");

  // For Damage Stock and Empty Stock
  const [damageStock, setDamageStock] = useState("");
  const [emptyStock, setEmptyStock] = useState("");

  const [purchaseRate, setPurchaseRate] = useState("");
  const [saleRate, setSaleRate] = useState("");
  const [taxPercent, setTaxPercent] = useState("");
  const [igstFlag, setIgstFlag] = useState("");
  const [igstPercent, setIgstPercent] = useState("");
  const [sgstPercent, setSgstPercent] = useState("");
  const [cgstPercent, setCgstPercent] = useState("");
const [checkError,setCheckError]=useState(false);

  const handleNextClick = async (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    const body = {
      name: productName,
      hsn_code: selectedOption2,
      min_order_level: minOrderLevel,
      max_order_level: maxOrderLevel,
      re_order_level: reOrderLevel,
      purchase_rate: purchaseRate,
      sale_rate: saleRate,
      damage_stock: damageStock,
      empty_stock: emptyStock,
      stokable_flag: selectedOption5,
      price: 120.0,
      quantity: 50,
    };

    try {
      const response = await makePostRequest(body);
        console.log(response); // Handle the response as needed
        next();
        console.log('Product Created',onProductCreated);
        onProductCreated();
      if(response.status !== 200){
        setCheckError(true);
      }
        
    } catch (error) {
      setCheckError(true);
      console.error(error); // Handle the error as needed
    }
  };

  setTimeout(() => {
    setCheckError(false);
  }, 3000);
  // For the basic fade in animation
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };
  return (
    <div
      tabIndex={-1}
      aria-hidden="true"
      className={` overflow-hidden  absolute translate-x-[20%] translate-y-[0%] z-40 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full `}
    >
      <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={modalVariants}
      transition={{ duration: 0.3 }}
      className="relative right-64">
{checkError && <Errormodal label="Some Error Occured, please try again later" />}
      </motion.div>
      <div className={`relative  p-4 w-full max-w-xl max-h-full `}>
        <form className="relative bg-white rounded-lg shadow " onSubmit={handleNextClick}>
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
                  value={damageStock}
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
                  value={emptyStock}
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
      </div>
    </div>
  );
};

export default Popup;
