import React from 'react'
import Banner from '../componets/Home/Banner'
import Hero from '../componets/Home/Hero'
import Feature from '../componets/Home/Feature'
import Testimonial from '../componets/Home/Testimonial'
import CallToaction from '../componets/Home/CallToaction'
import Footer from '../componets/Home/Footer'

const Home = () => {
  return (
    <div>
      <Banner/>
      <Hero/>
      <Feature/>
      <Testimonial/>
      <CallToaction/>
      <Footer/>
    </div>
  )
}

export default Home