import React from 'react'

function Loading({className}) {
  return (
    <div className={`w-12 aspect-square rounded-full animate-spin
    border-2 border-dashed border-indigo-500 border-t-transparent ${className}`}></div>
  )
}

export default Loading