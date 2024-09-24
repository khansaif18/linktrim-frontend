import React from 'react'
import { useShortnerContext } from '../context/ContextProvider'
import Loader from './Loader'


export default function DeleteModal({ handleCancel, handelDelete }) {

    const { loading } = useShortnerContext()

    return (
        <div className='fixed mt-[-10rem] z-50 w-full h-screen flex items-center justify-center backdrop-blur-[2px]'>
            <div
                className=" bg-gradient-to-br from-gray-900 via-gray-800 to-gray-600  rounded-lg overflow-hidden shadow-xl w-[300px] "
            >
                <div className="p-4">
                    <h2 className="text-3xl font-extrabold mb-1 text-white opacity-70 tracking-wide">DELETE URL?</h2>
                    <p className="text-md mb-4 opacity-40 text-white">
                        This can not be undone.
                    </p>
                    <div className="flex justify-end space-x-4">
                        <button onClick={handleCancel}
                            className="duration-300 tracking-wider bg-black/20 hover:bg-black/45 text-white font-bold py-2 px-4 rounded">
                            Cancel
                        </button>
                        <button onClick={handelDelete}
                            className="duration-300 tracking-wider bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded flex items-center justify-around ">
                            Delete  {loading ? <Loader relative /> : ''}
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}
