import React from 'react'
import Home from '../Components/Home'
import Topics from '../Components/Topics'
import About from '../Components/About'
import Contact from '../Components/Contact'
import Footer from '../Components/Footer'
import { Element } from 'react-scroll'
import {motion, useScroll} from 'framer-motion'

function HomePage() {
  const {scrollYProgress  } = useScroll();
  return (
    <div className="overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed  w-full h-1 bg-gradient-to-r from-blue-600 to-blue-800 z-50"
        style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
      />

      {/* Page Content */}
      <Element name='home'>
        <Home />
      </Element>
      <Element name='topics'>
        <Topics />
      </Element>
      <Element name='about'>
        <About />
      </Element>
      <Element name='contact'>
        <Contact />
      </Element>
      <Footer />
    </div>
  );
}

export default HomePage
