import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RxCross1 } from "react-icons/rx";
import Auth from '../pages/Auth';

const AuthModel = ({onClose}) => {
    const { userData } = useSelector((state)=>state.user)

    useEffect(() => {
      if(userData){
        onClose()
      }
    }, [userData, onClose])
    



  return (
    <div className='fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-999 px-4'>
      <div className="relative w-full max-w-md">
        <button onClick={onClose} className='absolute top-8 right-5 text-gray-800 hover:text-black text-xl'>
          <RxCross1 size={18}/>
        </button>
        <Auth isModel={true}/>
      </div>
    </div>
  )
}

export default AuthModel
