import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";

const BackComponent = ({ destination='/' }) => {
    const navigate = useNavigate();

    return (
        <>
            <div onClick={() => navigate(destination)} className='inline-flex items-center w-auto gap-1 px-3 py-1 mb-2 rounded cursor-pointer hover:underline'><FaArrowLeft /> Go back</div>
            <div className='w-full bg-black border-gray border-b-1 mb-[20px]'></div>
        </>        
    );
};

export default BackComponent;
