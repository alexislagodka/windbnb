import React from 'react'
import Slider from '../Slider/Slider'
import { Link } from 'react-router-dom'
import { BsFillTriangleFill } from 'react-icons/bs'

export default function Home () {
  return (
    <main>
      <section className='w-full h-full relative'>
        <div className='grid h-screen'>
          <Slider />
        </div>
      </section>
    </main>
  )
}
