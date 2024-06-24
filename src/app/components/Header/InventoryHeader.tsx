// InventoryHeader.tsx
import React from 'react';

interface ButtonProps {
  iconPath: string;
  text: string;
  onClick?: () => void;
  className: string;
}

interface InventoryHeaderProps {
  setShowProductPopup: (value: boolean) => void;
  showProductPopup: boolean;
  buttons: ButtonProps[];
  titleLabel?: string;
}

const InventoryHeader: React.FC<InventoryHeaderProps> = ({ titleLabel,setShowProductPopup, showProductPopup, buttons }) => {
  return (
    <div className="flex justify-between items-center w-full">
      <div>
        <p className="font-semibold lg:text-2xl text-[#101828]">
          {titleLabel}
        </p>
      </div>

      <div className="flex items-center gap-x-4">
        {buttons.map((button, index) => (
          <button key={index} onClick={button.onClick ? button.onClick : () => setShowProductPopup(!showProductPopup)} className={`flex items-center gap-x-4 ${button.className}`}>
            <img src={button.iconPath} className="w-5" />
            <p className="font-semibold">{button.text}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default InventoryHeader;