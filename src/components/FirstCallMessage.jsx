import React, { useEffect, useState } from 'react';
import { IoCloseSharp } from "react-icons/io5";
import { FaInfoCircle } from "react-icons/fa";

const FirstCallMessage = () => {
    const [firstCallMessage, setFirstCallMessage] = useState('');

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        const lastShownDate = localStorage.getItem('lastFirstCallMessageDate');
        const messageClosed = localStorage.getItem('lastFirstCallMessageClosed');

        if (lastShownDate !== today || messageClosed !== today) {
            setFirstCallMessage('Server might take some time to respond initially.');
            localStorage.setItem('lastFirstCallMessageDate', today);
        }
    }, []);

    const handleClose = () => {
        setFirstCallMessage('');
        const today = new Date().toISOString().split('T')[0];
        localStorage.setItem('lastFirstCallMessageClosed', today);
    };

    return (
        <div className='max-w-[95%] fixed bottom-4'>
            {firstCallMessage && (
                <div className="first-call-message flex items-center gap-1 justify-center">
                    <p className='flex items-center gap-1 text-[12px]'><FaInfoCircle /> {firstCallMessage}</p>
                    <button onClick={handleClose} className='hover:bg-white rounded text-lg'><IoCloseSharp /></button>
                </div>
            )}
        </div>
    );
};

export default FirstCallMessage;
