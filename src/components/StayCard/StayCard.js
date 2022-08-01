import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiFillStar } from 'react-icons/ai'

export default function StayCard ({ stay }) {
  const [didLoad, setDidLoad] = useState(false)

  const onLoad = () => {
    setDidLoad(true)
  }

  return (
    <div className='grid gap-2' key={stay.id}>
      <div className='photoContainer'>
        <Link to={`/stays/${stay.id}`}>
          <img className={`photo ${!didLoad && 'animate-pulse'}`} src={stay.photo} alt={stay.title} onLoad={onLoad} />
        </Link>
      </div>
      <div
        className={`grid ${
          stay.superHost ? 'grid-cols-[auto_1fr_auto]' : 'grid-cols-[1fr_auto]'
        }`}
      >
        {stay.superHost && (
          <span className='mr-2 text-gray-500 font-bold border-2 border-gray-500 px-2 rounded-lg'>
            SUPERHOST
          </span>
        )}
        <div className='flex items-center text-gray-500 font-medium'>
          {stay.type} {stay.beds && `. ${stay.beds} beds`}
        </div>
        <div className='flex items-center'>
          <AiFillStar className='text-salmon h-full' />
          {stay.rating}
        </div>
      </div>
      <div className='font-bold'>
        <Link to={`/stays/${stay.id}`}>{stay.title}</Link>
      </div>
    </div>
  )
}
