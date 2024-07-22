import React, { useState } from 'react';
import { MdCampaign } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [visible, setVisible] = useState(false);

    return (
        <div
            className={`bg-[#0D0F0F] p-5 h-screen transition-width duration-300 ease-in-out ${visible ? 'w-[18%]' : 'w-[7%]'}`}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
        >
            <ul className="list-none m-1 mt-5">
                <li className='flex gap-3 items-center cursor-pointer rounded-md text-sm hover:bg-[#35393B] duration-200 p-2 mt-5 text-white uppercase font-semibold'>
                    <FaFileAlt />
                    <Link to="/knowledge-base">
                        <p className={`${visible ? 'block' : 'hidden'} text-sm`}>Knowledge Base</p>
                    </Link>
                </li>
                <li className='flex gap-3 items-center cursor-pointer rounded-md text-sm hover:bg-[#35393B] duration-200 p-2 mt-5 text-white uppercase font-semibold'>
                    <MdCampaign />
                    <Link to="/create">
                        <p className={`${visible ? 'block' : 'hidden'} text-sm`}>Campaigns</p>
                    </Link>
                </li>
                <li className='flex gap-3 items-center cursor-pointer rounded-md text-sm hover:bg-[#35393B] duration-200 p-2 mt-5 text-white uppercase font-semibold'>
                    <IoMdCall />
                    <Link to="/call-handling">
                        <p className={`${visible ? 'block' : 'hidden'} text-sm`}>Call Handling</p>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
