import React, { useState } from 'react'

interface NewProductRatesProps {
  close: () => void;
}


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
          <div className="absolute mt-2 top-36 w-11/12 bg-white shadow-lg rounded-lg">
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
  

const NewProductRates = ({ close }: NewProductRatesProps) => {
    const [selectedOption4, setSelectedOption4] = useState("Select");
    const options4 = ["Option 3-1", "Option 3-2", "Option 3-3"];
  return (
    <div className='flex bg-white max-w-lg shadow-md absolute w-full z-50 rounded-xl left-[45%] -translate-x-1/2 translate-y-1/4  px-5 py-5 justify-center flex-col gap-y-5 items-center'>
      <div className="flex items-center justify-between   w-full">
        <h3 className="text-lg font-semibold text-[#101828]">
          Add New Product Rates
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
      <div className="flex flex-col w-full justify-start gap-3">
                <div className='flex flex-col justify-start gap-y-2 w-full'>
                <label className="font-medium text-black  text-sm">
                  Product Name<span className="text-red-600">*</span>
                </label>
                  <Dropdown
                  options={options4}
                  selectedOption={selectedOption4}
                  onSelect={setSelectedOption4}
                />

</div>
              <div className='flex w-full justify-between gap-x-3'>
              <div className="flex flex-col justify-start gap-2">
              <label className="font-inter font-medium  text-black  text-sm">
              W. e.f Date<span className=" text-red-600">*</span>
                </label>
                <input
                  type="text"
                  placeholder='27/11/1990'
                  className="p-2 placeholder:text-[#667085] font-medium w-full text-black  rounded-md bg-white border border-[#D0D5DD]"
                />
              </div>

              <div className="flex flex-col justify-start gap-2">
              <label className="font-medium text-black  text-sm">
                  Product Id<span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  placeholder='PRD001'
                  className="p-2 ps-2 placeholder:text-[#667085] font-medium w-full text-black  rounded-md bg-white border border-[#D0D5DD]"
                />
              </div>
              </div>

              <div className='flex w-full justify-between gap-x-3'>
              <div className="flex flex-col justify-start gap-2">
              <label className="font-inter font-medium  text-black  text-sm">
              HSN Code<span className=" text-red-600">*</span>
                </label>
                <input
                  type="text"

                  className="p-2 placeholder:text-[#667085] font-medium w-full text-black  rounded-md bg-white border border-[#D0D5DD]"
                />
              </div>

              <div className="flex flex-col justify-start gap-2">
              <label className="font-medium text-black  text-sm">
              Purch Rate
                </label>
                <input
                  type="text"

                  className="p-2 ps-2 placeholder:text-[#667085] font-medium w-full text-black  rounded-md bg-white border border-[#D0D5DD]"
                />
              </div>
              </div>
              <div className='flex w-full justify-between gap-x-3'>
              <div className="flex flex-col justify-start gap-2">
              <label className="font-inter font-medium  text-black  text-sm">
              Sale Rate
                </label>
                <input
                  type="text"

                  className="p-2 placeholder:text-[#667085] font-medium w-full text-black  rounded-md bg-white border border-[#D0D5DD]"
                />
              </div>

              <div className="flex flex-col justify-start gap-2">
              <label className="font-medium text-black  text-sm">
              IGST Flag
                </label>
                <input
                  type="text"

                  className="p-2 ps-2 placeholder:text-[#667085] font-medium w-full text-black  rounded-md bg-white border border-[#D0D5DD]"
                />
              </div>
              <div className="flex flex-col justify-start gap-2">
              <label className="font-medium text-black  text-sm">
              IGST %
                </label>
                <input
                  type="text"

                  className="p-2 ps-2 placeholder:text-[#667085] font-medium w-full text-black  rounded-md bg-white border border-[#D0D5DD]"
                />
              </div>
              </div>
              <div className='flex w-full justify-between gap-x-3'>
              <div className="flex flex-col justify-start gap-2">
              <label className="font-inter font-medium  text-black  text-sm">
              HSN Code<span className=" text-red-600">*</span>
                </label>
                <input
                  type="text"

                  className="p-2 placeholder:text-[#667085] font-medium w-full text-black  rounded-md bg-white border border-[#D0D5DD]"
                />
              </div>

              <div className="flex flex-col justify-start gap-2">
              <label className="font-medium text-black  text-sm">
              Purch Rate
                </label>
                <input
                  type="text"

                  className="p-2 ps-2 placeholder:text-[#667085] font-medium w-full text-black  rounded-md bg-white border border-[#D0D5DD]"
                />
              </div>
              </div>
              <div className="w-full flex justify-between items-center gap-x-4 px-0 py-2">
            <button
              onClick={close}
              className="font-semibold w-full  items-center  border border-[#D0D5DD] text-[#667085]    rounded-lg text-sm px-4 py-2.5 text-center bg-white"
            >
              Cancel
            </button>
            <button
onClick={close}
              type="submit"
              className="font-semibold w-full  items-center   text-white   rounded-lg text-sm px-4 py-2.5 text-center bg-[#FE4F00]"
            >
              Next
            </button>
          </div>
              </div>
    </div>
  )
}

export default NewProductRates