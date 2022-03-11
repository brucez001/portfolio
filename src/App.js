import React from 'react'

import { Home, About, Skills, Projects, Contact } from './container'
import { Navbar } from './components';
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


    </div>
  )
};

export default App;