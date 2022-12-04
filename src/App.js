import React, { useState } from 'react'
import './App.css';
import Card from './components/Card/Card';
import Vector from "./images/Vector.png"

const App = () => {
  const [state, setstate] = useState(false);
  const handleShareClick=()=>{
    setstate(!state)
  }
  return (
    <div  className='App'>
      <div className='share-text'>Click On Share Button</div>
      <button onClick={handleShareClick} className='share-btn'>Share <img src={Vector} alt="share-icon"/></button>
      {state && <Card/>}
    </div>
  )
}

export default App