import Image from 'next/image';
import React from 'react';

const CampaignCard = ({ title, buttonText, imageSrc, onButtonClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-md sm:max-w-[11.5rem] max-w-[10rem]">
      <Image src={imageSrc} width={100} height={100} alt="Campaign" className="sm:w-[11rem] w-[9.5rem] pt-1 object-cover h-32 mx-auto rounded-md" />
      <div className="sm:p-3 p-2">
      <h2 className="text-sm text-center font-bold text-gray-800">{title}</h2> 
      <button
        className="mt-3 bg-[#341266] text-white font-medium py-2 px-4 text-sm w-full hover:bg-purple-900"
        onClick={onButtonClick}
      >
        {buttonText}
      </button>
      </div>
    </div>
  );
};

export default CampaignCard;
