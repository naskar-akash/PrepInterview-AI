import React from 'react'

const Footer = () => {
  return (
    <div className="bg-gray-800 text-gray-300 py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center">
          <img src="./prepinterview_logo.png" alt="" className="h-20 w-20 " />
          <h4 className="text-xl font-bold">PrepInterview-AI</h4>
        </div>
        <p className="text-center">
          &copy; {new Date().getFullYear()} PrepInterview-AI. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer
