import React, { useState } from "react";
import Createdpopup from "./CreatedPopup";

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
        onClick={() => setIsOpen(!isOpen)}
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
        <div className="absolute mt-2 top-16 w-48 bg-white shadow-lg rounded-lg">
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
  next:()=>void
};

const Popup = ({ close,next }: PopupProps) => {
  const [selectedOption1, setSelectedOption1] = useState("Select");
  const [selectedOption2, setSelectedOption2] = useState("Select");
  const [selectedOption3, setSelectedOption3] = useState("Select");
  const [selectedOption4, setSelectedOption4] = useState("Select");

  const options1 = ["Option 1-1", "Option 1-2", "Option 1-3"];
  const options2 = ["Option 2-1", "Option 2-2", "Option 2-3"];
  const options3 = ["Option 3-1", "Option 3-2", "Option 3-3"];
  const options4 = ["Option 3-1", "Option 3-2", "Option 3-3"];


  return (
    <div
      id="crud-modal"
      tabIndex={-1}
      aria-hidden="true"
      className={` overflow-hidden absolute translate-x-[20%] translate-y-[5%] z-40 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full `}
    >
      
      <div className={`relative  p-4 w-full max-w-2xl max-h-full `}>
        <div className="relative bg-white rounded-lg shadow ">
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
          <div className="w-full flex justify-start items-start flex-col gap-y-4 px-5">
            <div className="w-full flex justify-start gap-x-4 items-center flex-row">
              <div className="flex flex-col justify-start gap-2">
                <label className="font-medium text-black  text-sm">
                  Product Id<span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
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
                  className="p-2 placeholder:text-[#667085] font-medium w-full text-black  rounded-md bg-white border border-[#D0D5DD]"
                />
              </div>
              <div className="flex flex-col w-full justify-start gap-2">
                <label className="font-medium text-black  text-sm">
                  Max. Order Level
                </label>
                <input
                  type="text"
                  className="placeholder:text-[#667085] font-medium w-full text-black p-2 rounded-md bg-white border border-[#D0D5DD]"
                />
              </div>
              <div className="flex flex-col w-full justify-start gap-2">
                <label className="font-medium text-black  text-sm">
                  Re-Order Level
                </label>
                <input
                  type="text"
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
                  className="p-2 placeholder:text-[#667085] font-medium w-full text-black  rounded-md bg-white border border-[#D0D5DD]"
                />
              </div>
              <div className="flex flex-col w-full justify-start gap-2">
                <label className="font-medium text-black  text-sm">
                  Sale Rate
                </label>
                <input
                  type="text"
                  className="placeholder:text-[#667085] font-medium w-full text-black p-2 rounded-md bg-white border border-[#D0D5DD]"
                />
              </div>
              <div className="flex flex-col w-full justify-start gap-2">
                <label className="font-medium text-black  text-sm">Tax %</label>
                <input
                  type="text"
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
                  className="p-2 placeholder:text-[#667085] font-medium w-full text-black  rounded-md bg-white border border-[#D0D5DD]"
                />
              </div>
              <div className="flex flex-col w-full justify-start gap-2">
                <label className="font-medium text-black  text-sm">
                  IGST %
                </label>
                <input
                  type="text"
                  className="placeholder:text-[#667085] font-medium w-full text-black p-2 rounded-md bg-white border border-[#D0D5DD]"
                />
              </div>
              <div className="flex flex-col w-full justify-start gap-2">
                <label className="font-medium text-black  text-sm">
                  SGST %
                </label>
                <input
                  type="text"
                  className="placeholder:text-[#667085] font-medium w-full text-black p-2 rounded-md bg-white border border-[#D0D5DD]"
                />
              </div>
              <div className="flex flex-col w-full justify-start gap-2">
                <label className="font-medium text-black  text-sm">
                  CGST %
                </label>
                <input
                  type="text"
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
              <div className="flex flex-col w-full justify-start gap-2">
                <label className="font-medium text-black  text-sm">
                  Stockable Flag<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="placeholder:text-[#667085] font-medium w-full text-black p-2 rounded-md bg-white border border-[#D0D5DD]"
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
onClick={next}
              type="submit"
              className="font-semibold w-full  items-center   text-white   rounded-lg text-sm px-4 py-2.5 text-center bg-[#FE4F00]"
            >
              Next
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Popup;
