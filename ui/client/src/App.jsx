
import { useEffect, useContext, useState } from 'react';
import './App.css'
import NavBar from './components/NavBar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Landing from "./components/Landing"


function App() {

  return (
    <>
      <Landing></Landing>
    </>
  )
}

export default App
