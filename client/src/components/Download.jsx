import React from 'react'

const Download = ({two,three}) => {

      
    return (
      <div className="flex flex-wrap gap-3">
        <p>Download</p>
        <CustomButton 
          type="filled"
          title="Download 3D"
          handleClick={three}
          customStyles="w-fit px-4 py-2.5 font-bold text-sm mr-4 "
        />
        <CustomButton 
          type="filled"
          title="Download 2D"
          handleClick={two}
          customStyles="w-fit px-4 py-2.5 font-bold text-sm mr-4 "
        />
      </div>
    )
  }

export default Download
