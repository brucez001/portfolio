import React from 'react'

import { Home, About, Skills, Projects, Contact } from './container'
import { Navbar, Footer } from './components';
import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div className='app'>
      <Navbar />
      <Home />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  )
};

export default App;