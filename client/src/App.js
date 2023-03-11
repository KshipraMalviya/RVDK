import React from 'react'
import "./App.css"
import 'bootstrap/dist/css/bootstrap.css'
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import About from "./components/About"
import Contact from "./components/Contact"
import Login from "./components/Login"
import Signup from "./components/Signup"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Errorpage from './components/Errorpage'


const App = () => {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
    <Route exact path='/' element={<Home/>}></Route>
      <Route exact path='/about' element={<About/>}></Route>
      <Route exact path='/login' element={<Login/>}></Route>
      <Route exact path='/contact' element={<Contact/>}></Route>
      <Route exact path='/signup' element={<Signup/>}></Route>
      <Route exact path='*' element={<Errorpage/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App