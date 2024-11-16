import React from 'react'

const NotificationModal = () => {

  

  const toggleNotificationModal = ({ toggleNotificationModal } ) => {
    
  };


  return (
    <div className="text-primary fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-gray-100 p-6 rounded-lg w-80 text-center">
              <label className="block text-lg font-semibold mb-4">Are you sure?</label>
              
              <div className="flex justify-around">
                <button className="px-4 py-2 bg-red-500 text-white rounded-lg" onClick={toggleNotificationModal}>
                  Cancel
                </button>
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg">
                  Confirm
                </button>
              </div>
            </div>
          </div>
  )
}

export default NotificationModal