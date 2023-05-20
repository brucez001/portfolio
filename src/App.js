import React from 'react'
import { Route, Switch } from "react-router-dom";

import { Home, About, Skills, Projects, Contact, AIChat } from './container'
import { Navbar, Footer } from './components';
import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css';


const MainSite = () => {
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
}




const App = () => {
  return (
    <Switch>
      <Route exact path="/"><MainSite /></Route>
      <Route path="/playground/ai-chat"><AIChat /></Route>     	
      <Route path="*"><MainSite /></Route>
    </Switch>
  )
};

export default App;