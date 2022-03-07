import React from 'react'

import { Home, About, Skills, Projects, Contact } from './container'
import { Navbar } from './components';
import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div className='app'>
      <Navbar />
      <div className="edge">
        <Home />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </div>
      
    </div>
  )
};

export default App;