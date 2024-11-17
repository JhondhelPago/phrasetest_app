import React from 'react'

const AlertModal = ({message, alter_boolean_state}) => {

  

  // const toggleNotificationModal = ({ toggleNotificationModal } ) => {
    
  // };

  const OK_close_modal = () => {
    alter_boolean_state(false);
  }


  return (
    <div className="text-primary fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-gray-100 p-6 rounded-lg w-80 text-center">
              <label className="block text-lg font-semibold mb-4">{message}</label>
              
              <div className="flex justify-around">
                <button className="px-6 py-2 bg-blue-500 text-white rounded-lg" onClick={OK_close_modal}>
                  OK
                </button>
              </div>
            </div>
          </div>
  )
}

export default AlertModal