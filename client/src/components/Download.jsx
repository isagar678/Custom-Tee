import React from 'react';
import CustomButton from './CustomButton'; // Assuming you have this component for buttons

const Download = ({ two, three }) => {
  return (
    <div className="download-container glassmorphism p-3 w-[195px] h-[120px] flex flex-col rounded-md">
      <p className="text-center text-gray-700 text-sm">Download Options</p>
      <div className="mt-4 flex flex-wrap gap-3 justify-center">
        <CustomButton
          type="filled"
          title="2D"
          handleClick={two}
          customStyles="w-fit px-4 py-2.5 font-bold text-xs"
        />
        <CustomButton 
          type="filled"
          title="3D"
          handleClick={three}
          customStyles="w-fit px-4 py-2.5 font-bold text-xs"
        />
      </div>
    </div>
  );
};

export default Download;
