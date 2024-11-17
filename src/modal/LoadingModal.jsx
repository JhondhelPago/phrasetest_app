import React from 'react'
import { ClipLoader } from "react-spinners";

const LoadingModal = ({message}) => {

  

  // const toggleNotificationModal = ({ toggleNotificationModal } ) => {
    
  // };

  const CancelHadler = () => {
    setShowNotificationModal(false);
  }


  return (
    <div className="text-primary fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-gray-100 p-6 rounded-lg w-80 text-center">
              <label className="block text-lg font-semibold mb-4">{message}</label>
              
              <div className="flex justify-around">
              <ClipLoader color="#4A90E2" size={50} /> {/* Circular Spinner */}
              </div>
            </div>
          </div>
  )
}

export default LoadingModal