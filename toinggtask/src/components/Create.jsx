import React, { useState } from 'react';
import { IoIosAddCircle } from "react-icons/io";
import CreateCampaign from '../pages/CreateCampaign';

const Create = () => {
  const [showForm, setShowForm] = useState(false);

  const handleCreateClick = () => {
    setShowForm(true);
  };

  const handleOutsideClick = (event) => {
    if (!event.target.closest('.assistant-form')) {
      setShowForm(false);
    }
  };

  const Token = 'tg_79b559e3-58cb-439e-87b5-3f1a7f8255c9-e2wMpo-qnpyBiKAeVcYCSg'

  return (
    <div className='bg-[#181A1B] w-full rounded-md h-screen text-white'>
      <div className='w-[21em] ml-[28em] mt-[10em] '>
        <h1 className='font-semibold text-lg'>Create Campaign</h1>
        <p className='text-gray-500 mt-2'>Assistants are voice AI chat bots used for integrations into your applications.</p>

        <p className='text-gray-500 mt-2'>Assistants are voice AI chat bots used for integrations into your applications.</p>

        <div className='flex justify-between w-[19em] mt-4'>
          <button className='p-2 text-sm rounded-[0.4rem] w-[10em] border-gray-500 border-[1px] bg-[#2e615b] hover:bg-[#1c3a37] duration-300 flex justify-between items-center' onClick={handleCreateClick}>
            Create<IoIosAddCircle style={{color:"#1D2826"}}/>
          </button>
          <button className='p-2 text-sm rounded-[0.4rem] w-[10em] border-gray-500 border-[1px] bg-[#2e615b] hover:bg-[#1c3a37] duration-300 flex justify-center items-center'>Documentation</button>
        </div>

        {showForm && (
          <div>
            <div className='background-blur'></div>
            <CreateCampaign authToken={Token}/>
          </div>
        )}
      </div>

      {showForm && (
        <div className='overlay' onClick={handleOutsideClick}></div>
      )}
    </div>
  );
};

export default Create;