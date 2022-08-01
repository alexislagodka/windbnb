import React from 'react'
import { Link } from 'react-router-dom'
import { BsFillArrowLeftCircleFill } from 'react-icons/bs'

export default function NotFound () {
  return (
    <main className='flex flex-col justify-center items-center'>
      <h1>Sorry, this page doesn't exist.</h1>
      <div className='pt-8'>
        <Link to='/'>
          <BsFillArrowLeftCircleFill size={35} className='text-salmon' />
        </Link>
      </div>
    </main>
  )
}
