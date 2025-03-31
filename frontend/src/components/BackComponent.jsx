import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";

const BackComponent = ({ destination='/' }) => {
    const navigate = useNavigate();

    return (
        <div onClick={() => navigate(destination)} className='flex items-center gap-1 mb-2 cursor-pointer hover:underline'><FaArrowLeft /> Go back</div>
    );
};

export default BackComponent;
