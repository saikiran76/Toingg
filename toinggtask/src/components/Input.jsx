import React from 'react'

const Input = ({title, handleChange, placeholder="Title"}) => {
  return (
    <div>
        <input
          className='bg-black text-white border-gray-600 border-[1px] p-[0.6rem] rounded-[0.5rem] mt-3 w-[19rem]'
          type="text"
          value={title}
          onChange={handleChange}
          placeholder={placeholder}
          required
        />
      
    </div>
  )
}

export default Input
